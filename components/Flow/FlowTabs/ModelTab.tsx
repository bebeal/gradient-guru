'use client'

import { useModel } from '@/hooks';
import { FlowTab } from './shared';
import { Form } from '@/components';
import * as yup from 'yup';
import { ModelConfig, ModelConfigLabels, ModelConfigSchemas, Models } from '@/clients';
import { useCallback, useMemo } from 'react';

export const ModelTab = () => {
  const {
    modelClient,
    setModelClient,
  } = useModel();

  const onSubmit = useCallback((newConfig: ModelConfig) => {
    // update data modalities
    const model = newConfig.model;
    const modelData = Models[model];
    const modalities = modelData.modalities;
    if (modalities) {
      newConfig.modalities = modalities;
    }
    modelClient.updateConfig(newConfig);
  }, [modelClient]);

  const Schema = useMemo(() => {
    return yup.object().shape({...ModelConfigSchemas});
  }, []);

  return (
    <FlowTab title="Model" className="h-full flex flex-col justify-between">
      <Form object={modelClient.config} schema={Schema} onSubmit={onSubmit} labels={ModelConfigLabels as any} />
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';
