'use client';

import * as yup from 'yup';
import { DataModality, OpenAIModelConfig, OpenAIModelInput } from '@/clients/Models';
import { HoverCard } from '@/components';

export const ApiKeyError = (apiKey?: string): Error => new Error(`No OpenAI API key provided\napiKey: ${apiKey}`);

export const mockInput: OpenAIModelConfig & OpenAIModelInput = {
  model: 'gpt-4-vision-preview',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: 'https://images.unsplash.com/photo-1620838379695-9a6b1b4c0c2b',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'This is a picture of a dog.',
        },
      ],
    },
  ],
  functions: [
    {
      name: 'classify_image',
      args: {
        image: 'https://images.unsplash.com/photo-1620838379695-9a6b1b4c0c2b',
      },
    },
  ],
  function_call: 'classify_image',
  stream: false,
  temperature: 0.6,
  top_p: 1,
  max_tokens: 16,
  n: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export const GPT_4_TURBO_WITH_VISION = {
  model: 'gpt-4-vision-preview',
  max_tokens: 4096,
  modalities: ['text', 'image'] as DataModality[],
  // context_window: 128000,
  // training_data_end_date: '2023-04-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_TURBO = {
  model: 'gpt-4-1106-preview',
  max_tokens: 4096,
  modalities: ['text'] as DataModality[],
  // context_window: 128000,
  // training_data_end_date: '2023-04-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4 = {
  model: 'gpt-4',
  max_tokens: 4096,
  modalities: ['text'] as DataModality[],
  // context_window: 8192,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_32K = {
  model: 'gpt-4-32k',
  max_tokens: 32768,
  modalities: ['text'] as DataModality[],
  // context_window: 32768,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO_1106 = {
  model: 'gpt-3.5-turbo-1106',
  max_tokens: 4096,
  modalities: ['text'] as DataModality[],
  // context_window: 16384,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO = {
  model: 'gpt-3.5-turbo',
  max_tokens: 4096,
  modalities: ['text'] as DataModality[],
  // context_window: 4096,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const Models: Record<string, any> = {
  'gpt-4-vision-preview': GPT_4_TURBO_WITH_VISION,
  'gpt-4-1106-preview': GPT_4_TURBO,
  'gpt-4': GPT_4,
  'gpt-4-32k': GPT_4_32K,
  'gpt-3.5-turbo-1106': GPT_3_TURBO_1106,
  'gpt-3.5-turbo': GPT_3_TURBO,
};
export const OpenAiModelNames = Object.keys(Models);
export type OpenAiModelName = keyof typeof Models;

export const DefaultModelConfig: OpenAIModelConfig = {
  ...GPT_4_TURBO_WITH_VISION,
  temperature: 0,
  max_tokens: 4096,
  top_p: 1,
  n: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  client_name: 'Open AI',
};

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
  client_name: 'Client',
  modalities: (props: any) => ModelConfigHoverableExplanations.modalities({ ...props, label: 'Modalities' }),
  model: 'Model',
  temperature: (props: any) => ModelConfigHoverableExplanations.temperature({ ...props, label: 'Temperature' }),
  top_p: (props: any) => ModelConfigHoverableExplanations.top_p({ ...props, label: 'Top P' }),
  max_tokens: (props: any) => ModelConfigHoverableExplanations.max_tokens({ ...props, label: 'Max Tokens' }),
  frequency_penalty: (props: any) => ModelConfigHoverableExplanations.frequency_penalty({ ...props, label: 'Frequency Penalty' }),
  presence_penalty: (props: any) => ModelConfigHoverableExplanations.presence_penalty({ ...props, label: 'Presence Penalty' }),
};

export const ModelConfigSchemas: Record<string, any> = {
  client_name: yup.string().required().oneOf(['Open AI', 'Backend']).meta({ item: 'client' }),
  modalities: yup
    .array()
    .of(yup.string().oneOf(['text', 'image', 'audio', 'video']))
    .meta({ item: 'modality' }),
  model: yup
    .string()
    .required()
    .oneOf([...OpenAiModelNames, 'identity'])
    .meta({ item: 'model' }),
  temperature: yup.number().min(0).max(1).default(0.6).meta({ item: 'slider', step: 0.01 }),
  top_p: yup.number().min(0).max(1).default(1).meta({ item: 'slider', step: 0.01 }),
  max_tokens: yup.number().min(1).max(4096).default(4096).meta({ item: 'slider', step: 1 }),
  frequency_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
  presence_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
};
