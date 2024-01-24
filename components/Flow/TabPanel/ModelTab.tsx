'use client';

import { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { ModelConfig, ModelConfigLabels, ModelConfigSchemas, ModelProviders, ModelFormItem } from '@/utils';
import { FlowTab, Form } from '@/components';
import { useModel } from '@/hooks';
import { OpenAIModelClient } from '@/clients';

export const ModelTab = () => {
  const { modelClient, systemPromptName, setSystemPromptName, modelQueryMutation, getPrompt } = useModel();

  useEffect(() => {
    // check local system for api key
    const localApiKey = localStorage.getItem('gg_api_key');
    if (localApiKey) {
      (modelClient as OpenAIModelClient).updateConfig({ apiKey: localApiKey });
    }
  }, [modelClient]);

  const onSubmit = useCallback((newConfig: ModelConfig) => {
    // update data modalities
    const model = newConfig.model;
    const modelData = ModelProviders[newConfig.provider][model];
    const modalities = modelData.modalities;
    if (modalities) {
      newConfig.modalities = modalities;
    }
    modelClient.updateConfig(newConfig);
  }, [modelClient]);

  return (
    <FlowTab title="Model" className="h-full flex flex-col justify-between">
      <div className="flex flex-col h-auto w-full overflow-auto">
        <Form object={modelClient.config} schema={yup.object().shape(ModelConfigSchemas)} onSubmit={onSubmit} labels={ModelConfigLabels as any} ItemRenderer={ModelFormItem} />
      </div>
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';