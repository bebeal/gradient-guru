'use client'

import { useModel } from '@/hooks';
import { FlowTab } from './shared';
import { Button, FlipCard, Form, FlowFormItem, HoverCard } from '@/components';
import * as yup from 'yup';
import { ModelConfig, ModelConfigLabels, ModelConfigSchemas, Models } from '@/clients';
import { useCallback, useMemo } from 'react';
import { Prompts, PromptName, getSystemPrompt, cn, formattedPromptNames } from '@/utils';

export const ModelTab = () => {
  const {
    modelClient,
    setModelClient,
    queryModel,
    systemPrompt,
    setSystemPrompt,
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
            <div className="flex flex-col items-center justify-center h-auto w-auto p-2">
        <div className="flex flex-col gap-2 justify-around items-center">
          {Object.keys(Prompts).map((key: string, index: number) => {
            const prompt: any = Prompts[key as PromptName];
            const systemPrompt = getSystemPrompt(key as PromptName);
            const color = ["red", "sky"]?.[index] as any;
            
            return (
              <HoverCard key={key} content={systemPrompt} className='leading-tight whitespace-pre-wrap w-full subpixel-antialiased' contentStyle={{
                  width: 'max(600px, var(--radix-hover-card-trigger-width))',
                  maxHeight: 'var(--radix-hover-card-content-available-height)',
                  wordSpacing: '0.5px',
                  textAlign: 'left',
                }}
                side="right"
              >
                <Button
                  variant="surface"
                  size={"4"}
                  radius={"medium"}
                  color={color}
                  key={key}
                  onClick={() => {
                    setSystemPrompt(key);
                  }}
                  className={cn(`!text-sm p-2 h-auto w-full`, systemPrompt === key ? `font-bold ring-${color}-500` : `ring-0 opacity-50`)}
                >{formattedPromptNames[key as PromptName]}</Button>
              </HoverCard>
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
            <Button variant="gradient" onClick={() => queryModel.mutate()} className="w-full">Run</Button>
            </div>
          )
        }}
      />
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';
