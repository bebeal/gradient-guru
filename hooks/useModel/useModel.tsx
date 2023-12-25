'use client'

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { useContentExtractor } from '@/hooks';
import { BaseModelClient, DefaultModelConfig, ModelConfig, OpenAIModelClient } from '@/clients';
import { useEditor } from '@tldraw/tldraw';
import { useMutation } from '@tanstack/react-query';

export type ModelState = {
  modelClient: BaseModelClient<ModelConfig, any, any>;
  setModelClient: (client: BaseModelClient<ModelConfig, any, any>) => void;
  systemPrompt: string;
  setSystemPrompt: (newSystemPrompt: string) => void;
};

export const useModelClientStore = create<ModelState>((set) => ({
  modelClient: new OpenAIModelClient(DefaultModelConfig),
  setModelClient: (newModelClient: BaseModelClient<ModelConfig, any, any>) => set({ modelClient: newModelClient }),
  systemPrompt: 'make_real',
  setSystemPrompt: (newSystemPrompt: string) => set({ systemPrompt: newSystemPrompt }),
}));

export const useModel = () => {
  const systemPrompt = useModelClientStore(useShallow((state) => state.systemPrompt));
  const setSystemPrompt = useModelClientStore(useShallow((state) => state.setSystemPrompt));
  const modelClient = useModelClientStore(useShallow((state) => state.modelClient));
  const setModelClient = useModelClientStore(useShallow((state) => state.setModelClient));
  const editor = useEditor();
  const contentExtractor = useContentExtractor();

  const queryModel = useMutation({
    mutationKey: ['model-query'], 
    mutationFn: async () => {
      return await contentExtractor.extractAll().then(async (flows) => {
        console.log('flows', flows);
        const text = (flows?.text || []).join('\n');
        
        return {};
      });
    },
    onSuccess: (response: any) => {
      console.log('onSuccess Response:', response);
    },
    onError: (error: any) => {
      console.log('onError Response:', error);
    },
    retry: false,
  });

  return {
    modelClient,
    setModelClient,
    queryModel,
    systemPrompt,
    setSystemPrompt,
  };
};
