'use client'

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { useContentExtractor } from '@/hooks';
import { BaseModelClient, DefaultModelConfig, ModelConfig, OpenAIModelClient } from '@/clients';
import { createShapeId, useEditor } from '@tldraw/tldraw';
import { useQuery } from 'react-query';
import { PROMPT_LIBRARY, encodeBlobAsBase64, getSvgAsImage, isSafari } from '@/utils';
import { PreviewNode, makeEmptyResponseShape } from '@/components';

export function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		reader.readAsDataURL(blob)
	})
}

export type ModelState = {
  modelClient: BaseModelClient<ModelConfig, any, any>;
  setModelClient: (client: BaseModelClient<ModelConfig, any, any>) => void;
};

export const useModelClientStore = create<ModelState>((set) => ({
  modelClient: new OpenAIModelClient(DefaultModelConfig),
  setModelClient: (newModelClient: BaseModelClient<ModelConfig, any, any>) => set({ modelClient: newModelClient }),
}));

export const useModel = () => {
  const modelClient = useModelClientStore(useShallow((state) => state.modelClient));
  const setModelClient = useModelClientStore(useShallow((state) => state.setModelClient));
  const editor = useEditor();
  const contentExtractor = useContentExtractor();

  const queryModel = useQuery('model-query', async () => {
    return await contentExtractor.extractAll().then(async (flows) => {
      console.log('flows', flows);
      const text = (flows?.text || []).join('\n');
      
      return {};
    });
  },
  {
    enabled: false,
    onSuccess: (response) => {
      console.log('onSuccess Response:', response);
    },
    onError: (error) => {
      console.log('onError Response:', error);
    },
    retry: false,
  }
);

  return {
    modelClient,
    setModelClient,
    queryModel,
  };
};
