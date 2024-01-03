'use client'

import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useEditor } from '@tldraw/editor';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { BaseModelClient, DefaultModelConfig, ModelConfig, OpenAIModelClient } from '@/clients/Models';
import { formatNodeId, makeEmptyResponseShape, PreviewNode } from '@/components';
import { ExtractedState, useApi, useContentExtractor } from '@/hooks';
import { PromptName, Prompts } from '@/utils';
import { getHTMLFromOpenAIResponse } from './shared';

const LinkUploadVersion = 1;

export type ModelState = {
  modelClient: BaseModelClient<ModelConfig, any, any>;
  setModelClient: (client: BaseModelClient<ModelConfig, any, any>) => void;
  systemPromptName: PromptName;
  setSystemPromptName: (newSystemPromptName: PromptName) => void;
};

export const useModelClientStore = create<ModelState>((set) => ({
  modelClient: new OpenAIModelClient(DefaultModelConfig),
  setModelClient: (newModelClient: BaseModelClient<ModelConfig, any, any>) => set({ modelClient: newModelClient }),
  systemPromptName: 'makeReal',
  setSystemPromptName: (newSystemPromptName: PromptName) => set({ systemPromptName: newSystemPromptName }),
}));

export const useModel = () => {
  const modelClient = useModelClientStore(useShallow((state) => state.modelClient));
  const setModelClient = useModelClientStore(useShallow((state) => state.setModelClient));
  const systemPromptName = useModelClientStore(useShallow((state) => state.systemPromptName));
  const setSystemPromptName = useModelClientStore(useShallow((state) => state.setSystemPromptName));
  const editor = useEditor();
  const api = useApi();
  const { imageExtractorConfig, extractAll, getNodeIds } = useContentExtractor();

  const getPrompt = useCallback((extracted: ExtractedState, key: PromptName) => {
    const prompt = Prompts[key]({ extracted, config: modelClient.config });
    return prompt;
  }, [modelClient.config]);

  const handleMakeRealPrompt = async (extracted: ExtractedState) => {
    // make response preview shape to hold the response html
    const responseNodeId = makeEmptyResponseShape(editor);
    try {
      // use extracted content to make prompt
      // messages object
      const prompt = getPrompt(extracted, systemPromptName);
      // query model
      // return await modelClient.mockApi(prompt).then((response: any) => {
      return await modelClient.callApi(prompt).then((response: any) => {
        const html = getHTMLFromOpenAIResponse(response);
        // No HTML? Something went wrong
        if (html.length < 100) {
          console.warn(response.choices[0].message.content);
          throw Error('Could not generate a design from those wireframes.');
        }
        // Upload the HTML to S3
        const body = { id: formatNodeId(responseNodeId), html, source: extracted?.dataUrl as string, linkUploadVersion: LinkUploadVersion };
        api.putS3(body);
        // Update the shape with the new props
        editor.updateShape<PreviewNode>({
          id: responseNodeId,
          type: 'preview',
          props: {
            html,
            source: extracted?.dataUrl as string,
            linkUploadVersion: LinkUploadVersion,
            uploadedNodeId: responseNodeId,
          },
        });
        return response;
      });
    } catch (error) {
      // If anything went wrong, delete the shape.
      editor.deleteShape(responseNodeId);
      throw error;
    }
  };

  const handleNodeControlPrompt = async (extracted: ExtractedState) => {
    return Prompts['nodeControl']({ extracted, config: modelClient.config });
  };

  const modelQueryMutation = useMutation({
    mutationKey: ['model-query'],
    mutationFn: async (): Promise<any> => {
      return await extractAll().then(async (extracted: ExtractedState) => {
        if (systemPromptName === 'makeReal') {
          return await handleMakeRealPrompt(extracted);
        } else {
          return await handleNodeControlPrompt(extracted);
        }
      });
    },
    retry: false,
  });

  return {
    modelClient,
    setModelClient,
    modelQueryMutation,
    handleMakeRealPrompt,
    systemPromptName,
    setSystemPromptName,
    getPrompt,
  };
};