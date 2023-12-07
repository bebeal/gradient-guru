import * as yup from 'yup';
import { OpenAIModelConfig, OpenAIModelInput } from "@/clients";

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
        }
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'This is a picture of a dog.',
        }
      ]
    }
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
}

export const GPT_4_TURBO_WITH_VISION = {
  model: 'gpt-4-vision-preview',
  max_tokens: 4096,
  // context_window: 128000,
  // training_data_end_date: '2023-04-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_TURBO = {
  model: 'gpt-4-1106-preview',
  max_tokens: 4096,
  // context_window: 128000,
  // training_data_end_date: '2023-04-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4 = {
  model: 'gpt-4',
  max_tokens: 4096,
  // context_window: 8192,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_32K = {
  model: 'gpt-4-32k',
  max_tokens: 32768,
  // context_window: 32768,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO_1106 = {
  model: 'gpt-3.5-turbo-1106',
  max_tokens: 4096,
  // context_window: 16384,
  // training_data_end_date: '2021-09-01',
  // api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO = {
  model: 'gpt-3.5-turbo',
  max_tokens: 4096,
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

export const DefaultModelConfig: Partial<OpenAIModelConfig> = {
  ...GPT_3_TURBO,
  temperature: 0.6,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  n: 1,
};

export const ModelConfigSchema = yup.object().shape({
  model: yup.string().required().oneOf([...OpenAiModelNames, 'identity']).meta({ item: 'select' }),
  temperature: yup.number().min(0).max(1).default(0.6).meta({ item: 'slider', step: 0.01 }),
  top_p: yup.number().min(0).max(1).default(1).meta({ item: 'slider', step: 0.01 }),
  max_tokens: yup.number().min(1).max(4096).default(4096).meta({ item: 'slider', step: 1 }),
  frequency_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
  presence_penalty: yup.number().min(0).max(1).default(0).meta({ item: 'slider', step: 0.01 }),
});
