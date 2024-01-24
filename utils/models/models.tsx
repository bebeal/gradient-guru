'use client'

import { forwardRef } from 'react';
import * as yup from 'yup';
import { DefaultFormItem, HoverCard, IconSetCache, Select } from '@/components';
import OpenAI from 'openai';
import { OpenAIModelConfig, OpenAiModels } from './openai-models';
import { Badge } from '@radix-ui/themes';
import { cn } from '../utils';
import { HiddenKeyInput } from '@/components';

export const dataModalities = ['text', 'image', 'audio', 'video'] as const;
export type DataModality = (typeof dataModalities)[number];

export const modelStates = ['idle', 'inference', 'error'] as const;
export type ModelState = (typeof modelStates)[number];

export type Message = {
  role: OpenAI.ChatCompletionRole;
  content: any;
  name?: string;
};

export const modelProviders = ['openai', 'default'] as const;
export type ModelProvider = (typeof modelProviders)[number];

export interface ModelConfig {
  model: string;
  modalities?: DataModality[];
  context_window?: number;
  training_end_date?: string | Date;
  provider: ModelProvider;
}

export const DefaultModelConfig: OpenAIModelConfig = {
  ...OpenAiModels['gpt-4-vision-preview'],
  temperature: 0,
  max_tokens: 4096,
  top_p: 1,
  n: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  provider: 'openai',
  seed: 500,
};

export const ModelProviders: Record<ModelProvider, Record<string, ModelConfig>> = {
  'openai': OpenAiModels,
  'default': {
    'identity': {
      model: 'identity',
      modalities: ['text'],
      context_window: 4096,
      training_end_date: '2021-09-01',
      provider: 'default',
    }
  }
};
export const ModelProviderNames = Object.keys(ModelProviders);

export const ModelConfigExplanations: Record<string, string> = {
  modalities: 'Types of data the model can accept as input',
  temperature: 'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.',
  top_p: 'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.',
  max_tokens: 'Controls the length of the completion returned.',
  frequency_penalty: 'Controls how much the model favors repeating existing words rather than generating new ones. Lowering results in less repetition.',
  presence_penalty: 'Controls how much the model favors generating words that are already present in the context. Lowering results in the model taking more risks.',
};

export const ModelConfigHoverableExplanations: Record<any, any> = Object.entries(ModelConfigExplanations).reduce((acc: any, [key, value]) => {
  acc[key] = ({ label, ...rest }: any) => (
    <div className="flex w-auto h-auto justify-start items-center">
      <HoverCard content={value} {...rest}>
        {label}
      </HoverCard>
    </div>
  );
  return acc;
}, {});

export const ModelConfigLabels = {
  provider: 'Provider',
  modalities: (props: any) => ModelConfigHoverableExplanations.modalities({ ...props, label: 'Modalities' }),
  model: 'Model',
  temperature: (props: any) => ModelConfigHoverableExplanations.temperature({ ...props, label: 'Temperature' }),
  top_p: (props: any) => ModelConfigHoverableExplanations.top_p({ ...props, label: 'Top P' }),
  max_tokens: (props: any) => ModelConfigHoverableExplanations.max_tokens({ ...props, label: 'Max Tokens' }),
  frequency_penalty: (props: any) => ModelConfigHoverableExplanations.frequency_penalty({ ...props, label: 'Frequency Penalty' }),
  presence_penalty: (props: any) => ModelConfigHoverableExplanations.presence_penalty({ ...props, label: 'Presence Penalty' }),
};

export const ModelConfigSchemas: Record<string, any> = {
  apiKey: yup.string().meta({ item: 'apiKey', noLabel: true }),
  provider: yup.string().oneOf(modelProviders).meta({ item: 'provider' }),
  modalities: yup
    .array()
    .of(yup.string().oneOf(dataModalities))
    .meta({ item: 'modality' }),
  model: yup
    .string()
    .oneOf(Array.from([...Object.keys(OpenAiModels), ...Object.keys(ModelProviders['default'])]))
    .meta({ item: 'model' }),
  temperature: yup.number().min(0).max(1).default(0.6).meta({ item: 'slider', step: 0.01 }),
  top_p: yup.number().min(0).max(1).default(1).meta({ item: 'slider', step: 0.01 }),
  max_tokens: yup.number().min(1).max(4096).default(4096).meta({ item: 'slider', step: 1 }),
  frequency_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
  presence_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
};

const ModalityColors: Record<DataModality, { variant: "solid" | "soft" | "surface" | "outline", color: "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "brown" | "orange" | "sky" | "mint" | "lime" | "yellow" | "amber" | "gold" | "bronze" | "gray" }> = {
  text: {
    variant: 'surface',
    color: 'sky',
  },
  image: {
    variant: 'surface',
    color: 'green',
  },
  audio: {
    variant: 'surface',
    color: 'red',
  },
  video: {
    variant: 'surface',
    color: 'yellow',
  },
};


const CompactBadge = ({ modality, className, animate=false }: { modality: DataModality; className?: string, animate?: boolean }) => {
  return (
    <div className={cn(`h-auto w-auto text-${ModalityColors[modality].color}`, "flex justify-center items-center relative rounded")}>
    <span className={cn(`block h-2.5 w-2.5 rounded-full bg-${ModalityColors[modality].color} text-${ModalityColors[modality].color} border-black border border-opacity-30`, 
          animate && `after:animate-ripple after:content-[""] after:rounded-full after:w-full after:h-full after:left-0 after:top-0 after:absolute after:text-${ModalityColors[modality].color} after:border-2 after:border-current after:translate-x-1/2 after:translate-y-1/2`,
          className
        )}
    />
    </div>
  )
}

export const DataModalityBadge = ({ modality, className, compact=false, animate=false }: { modality: DataModality; className?: string, compact?: boolean, animate?: boolean }) => {

  if (compact) {
    return (
      <CompactBadge modality={modality} animate={animate} className="p-1 after:p-0" />
    )
  }
  return (
    <Badge
      variant={ModalityColors[modality].variant}
      color={ModalityColors[modality].color}
      size={'1'}
      className={cn('!relative !text-[8px] text-center justify-center items-center flex gap-1 flex-row oveflow-hidden !h-full !w-auto', className)}
    >
      <CompactBadge modality={modality} />
      {modality}
    </Badge>
  )
};

export const ModelFormItem = forwardRef<any, any>((props, ref) => {
  const { field, schema, placeholder, readOnly, form, item, className='' } = props;

  if (item === 'apiKey') {
    return <HiddenKeyInput onChange={field.onChange} />;
  } else if (item === 'modality') {
    const values = form.getValues();
    const modalities = values?.modalities;
    // for the content I want compact versions for teh trigger I want the full version
    const compact = schema?.spec?.meta?.compact || false;
    if (compact) {
      // 4x4 GRID
      return (
        <div className={cn("grid grid-cols-2 gap-1 w-auto h-full px-1 justify-center items-center", modalities.length > 2 && `grid-rows-2` )}>
          {modalities?.map((modality: any) => {
            return (<DataModalityBadge key={modality} modality={modality as any} compact={true} />);
          })}
        </div>
      );
    } else {
      // 2x2 GRID
      return (
        <div className={cn("grid grid-cols-2 gap-1 w-auto h-full px-1 justify-center items-center", modalities.length > 2 && `grid-rows-2`)}>
          {modalities?.map((modality: any) => {
            return (<DataModalityBadge key={modality} modality={modality as any} />);
          })}
        </div>
      );
    }
  } else if (item === 'provider') {
    const values = form.getValues();
    const provider = values?.provider;
    let icon = <></>;
    if (provider === 'openai') {
      icon = <IconSetCache.Logos.OpenAI className={cn("flex rounded w-auto h-[16px] text-primary")}/>;
    }
    return (
      <div className="flex flex-row items-center justify-center text-primary gap-1 w-full h-auto px-2">
        {icon}
        <div className={cn(`flex w-auto leading-none h-full`)}>Open AI</div>
      </div>
    );
  } else if (item === 'model') {
    const values = form.getValues();
    const provider = values?.provider;
    let betterItems: any[] = Array.from(schema?._whitelist);
    if (provider === 'openai') {
      betterItems = betterItems.map((model: string) => {
        const modelFromMap = ModelProviders['openai'][model];
        const modalities = modelFromMap?.modalities || [];
        
        const DataModalitiesBadges = (
          <div className={cn(`grid grid-cols-2 gap-3 ml-2 w-auto h-auto`, modalities.length > 2 && `grid-rows-2`)}>
            {modalities.map((modality: DataModality) => (
              <DataModalityBadge key={modality} modality={modality} compact={true} />
            ))}
          </div>
        );
  
        return { 
          value: model,
          children: (
            <div className="flex flex-row justify-start items-center text-xs text-center text-primary gap-2 w-auto h-full p-2 py-1"><IconSetCache.Logos.OpenAI width={"100%"} className={cn("flex p-[3px] rounded w-[24px] h-[24px]", model.includes('gpt-3') && 'bg-[#19c37d]', model.includes('gpt-4') && 'bg-[#ab68ff]' )}/> <div className={cn(`flex h-full w-auto leading-none items-center`)}>{model}{DataModalitiesBadges}</div></div>
          ),
          className: 'justify-start'
        }
      });
    }
    return (<Select className={cn(`justify-start w-auto`, className)} items={betterItems} {...field} readOnly={readOnly} />);
  }
 return <DefaultFormItem ref={ref} {...props} />;
});
ModelFormItem.displayName = 'ModelFormItem';
