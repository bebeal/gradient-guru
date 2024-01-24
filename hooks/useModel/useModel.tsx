'use client'

import { BaseModelClient, OpenAIModelClient } from '@/clients/Models';
import { formatNodeId, makeEmptyResponseNode, PreviewNode } from '@/components';
import { ExtractedState, useApi, useContentExtractor } from '@/hooks';
import { DefaultModelConfig, getHTMLFromOpenAIResponse, ModelConfig, PromptName, Prompts } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

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
    const previousPreviews = extracted?.previousPreviews;
    let responseNodeId: TLShapeId;
    let version = 0;
    if (previousPreviews?.length !== 1) {
      // make a new node if 0 or more than 1 previews exist
      responseNodeId = makeEmptyResponseNode(editor);
    } else {
      // version on existing preview if only 1 exists
      responseNodeId = previousPreviews[0].id;
      if (!responseNodeId.includes('shape:')) {
        responseNodeId = `shape:${responseNodeId}` as TLShapeId;
      }
      if (previousPreviews[0].props.version) {
        version = previousPreviews[0].props.version + 1;
      }
      console.log('Updating existing preview node:', responseNodeId);
      modelClient.updateConfig({ seed: 501 } as any);
      editor.updateShape<PreviewNode>({
        id: responseNodeId,
        type: 'preview',
        props: {
          html: '',
          version: undefined,
        },
      });
    }
    try {
      // use extracted content to make prompt
      // messages object
      const prompt = getPrompt(extracted, systemPromptName);
      // query model
      // return await modelClient.mockApi(prompt).then((response: any) => {
      return await modelClient.forward(prompt).then((response: any) => {
        const html = getHTMLFromOpenAIResponse(response);
        // No HTML? Something went wrong
        if (html.length < 100) {
          console.warn(response.choices[0].message.content);
          throw Error('Could not generate a design from those wireframes.');
        }
        // Upload the HTML to S3
        const body = { id: formatNodeId(responseNodeId), html, source: extracted?.dataUrl as string, dateCreated: Date.now() };
        api.putS3(body);
        // Update the shape with the new props
        editor.updateShape<PreviewNode>({
          id: responseNodeId,
          type: 'preview',
          props: {
            html,
            source: extracted?.dataUrl as string,
            version,
            dateCreated: body.dateCreated,
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
    systemPromptName,
    setSystemPromptName,
    getPrompt,
  };
};