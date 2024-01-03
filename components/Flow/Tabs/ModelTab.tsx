'use client';

import { useCallback } from 'react';
import * as yup from 'yup';
import { ModelConfig, ModelConfigLabels, ModelConfigSchemas, Models } from '@/clients/Models';
import { FlipCard, FlowFormItem, FlowTab, Form } from '@/components';
import { useModel } from '@/hooks';

export const ModelTab = () => {
  const { modelClient, setModelClient, systemPromptName, setSystemPromptName, modelQueryMutation, getPrompt } = useModel();

  const onSubmit = useCallback(
    (newConfig: ModelConfig) => {
      // update data modalities
      const model = newConfig.model;
      const modelData = Models[model];
      const modalities = modelData.modalities;
      if (modalities) {
        newConfig.modalities = modalities;
      }
      modelClient.updateConfig(newConfig);
    },
    [modelClient]
  );

  return (
    <FlowTab title="Model" className="h-full flex flex-col justify-between">
      <FlipCard
        className="h-auto w-full"
        front={{
          title: 'Model Config',
          children: <Form object={modelClient.config} schema={yup.object().shape({ ...ModelConfigSchemas })} onSubmit={onSubmit} labels={ModelConfigLabels as any} ItemRenderer={FlowFormItem} />,
        }}
      />
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';