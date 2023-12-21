'use client'

import { useModel } from '@/hooks';
import { FlowTab } from './shared';
import { Button, FlipCard, Form, FlowFormItem } from '@/components';
import * as yup from 'yup';
import { ModelConfig, ModelConfigLabels, ModelConfigSchemas, Models } from '@/clients';
import { useCallback, useMemo, useState } from 'react';
import { PROMPT_LIBRARY, cn } from '@/utils';

export const ModelTab = () => {
  const {
    modelClient,
    setModelClient,
    queryModel,
  } = useModel();
  const [promptSelected, setPromptSelected] = useState<string>('make_real');

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
      <FlipCard
        title="Model Config"
        className="h-auto w-full"
        front={{
          children: <Form object={modelClient.config} schema={Schema} onSubmit={onSubmit} labels={ModelConfigLabels as any} ItemRenderer={FlowFormItem} />
        }}
      />
      <FlipCard
        title="System Prompt"
        front={{
          children: (
            <div className="flex flex-col items-center justify-center h-auto w-auto p-10">
        <div className="flex flex-row justify-around items-center">
          {Object.keys(PROMPT_LIBRARY).map((key, index) => {
            const color = ["red", "sky"]?.[index] as any;
            const prettierNameMap: any = {
              'make_real': 'Make Real',
              'nodeBasedAgent': 'Node Based Agent',
            }
            return (
              <Button
                variant="surface"
                color={color}
                key={key}
                onClick={() => {
                  setPromptSelected(key);
                }}
                className={cn(`p-2`, promptSelected === key ? `font-bold ring-${color}-500` : `ring-0 opacity-50`)}
              >{prettierNameMap[key]}
              </Button>
            )
          })}
        </div>
      </div>
          )
        }}
      />
      <FlipCard
        title="Run Model"
        front={{
          children: (
            <div className="relative w-auto h-auto px-20 py-4 overflow-hidden justify-center items-center">
            <Button variant="gradient" onClick={() => queryModel.refetch()} className="w-full">Run</Button>
            </div>
          )
        }}
      />
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';
