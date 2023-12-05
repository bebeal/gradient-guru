import API from 'openai';
import * as yup from 'yup';

export const GPT_4_TURBO_WITH_VISION = {
  model: 'gpt-4-vision-preview',
  max_tokens: 4096,
  context_window: 128000,
  training_data_end_date: '2023-04-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_TURBO = {
  model: 'gpt-4-1106-preview',
  max_tokens: 4096,
  context_window: 128000,
  training_data_end_date: '2023-04-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4 = {
  model: 'gpt-4',
  max_tokens: 4096,
  context_window: 8192,
  training_data_end_date: '2021-09-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_4_32K = {
  model: 'gpt-4-32k',
  max_tokens: 32768,
  context_window: 32768,
  training_data_end_date: '2021-09-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO_1106 = {
  model: 'gpt-3.5-turbo-1106',
  max_tokens: 4096,
  context_window: 16384,
  training_data_end_date: '2021-09-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const GPT_3_TURBO = {
  model: 'gpt-3.5-turbo',
  max_tokens: 4096,
  context_window: 4096,
  training_data_end_date: '2021-09-01',
  api_endpoint: 'https://api.openai.com/v1/chat/completions',
};
export const Models: Record<string, ModelConfig> = {
  'gpt-4-vision-preview': GPT_4_TURBO_WITH_VISION,
  'gpt-4-1106-preview': GPT_4_TURBO,
  'gpt-4': GPT_4,
  'gpt-4-32k': GPT_4_32K,
  'gpt-3.5-turbo-1106': GPT_3_TURBO_1106,
  'gpt-3.5-turbo': GPT_3_TURBO,
};
export const ModelNames = Object.keys(Models);
export type ModelName = keyof typeof Models;

export const DefaultModelConfig: Partial<ModelConfig> = {
  ...GPT_4_TURBO_WITH_VISION,
  temperature: 0.6,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  n: 1,
};

export const ModelConfigSchema = yup.object().shape({
  model: yup.string().required().oneOf(['gpt-4-vision-preview', 'identity']).meta({ type: 'select' }),
  temperature: yup.number().min(0).max(1).meta({ type: 'slider', step: 0.01 }),
  top_p: yup.number().min(0).max(1).meta({ type: 'slider', step: 0.01 }),
  max_tokens: yup.number().min(1).max(4096).meta({ type: 'slider', step: 1 }),
  frequency_penalty: yup.number().min(0).max(1).meta({ type: 'slider', step: 0.01 }),
  presence_penalty: yup.number().min(0).max(1).meta({ type: 'slider', step: 0.01 }),
});

export const mockInput: ModelInput = {
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

export const mockResponse = (body: any): API.ChatCompletion => {
  return {
    id: 'cmpl-3QJQ5qZ5Z5Z5Z5Z5Z5Z5Z5Z5',
    choices: [
      {
        finish_reason: 'stop',
        index: 0,
        message: {
          content: 'Hello, how are you?',
          role: 'assistant',
        },
      },
    ],
    created: new Date().getTime(),
    model: 'davinci:2020-05-03',
    object: 'chat.completion',
    system_fingerprint: '3QJQ5qZ5Z5Z5Z5Z5Z5Z5Z5Z5',
    usage: {
      completion_tokens: 1,
      prompt_tokens: 1,
      total_tokens: 2,
    },
  };
};

export type MessageContent = string | ModelInput[];

export type Message = {
  role: API.ChatCompletionRole;
  content: MessageContent;
  name?: string | undefined;
};

export type ModelConfig = {
  model: ModelName;
  messages?: Message[];
  functions?: unknown[] | undefined;
  function_call?: unknown | undefined;
  stream?: boolean | undefined;
  // Between 0 and 2. Higher values means more random, lower means more deterministic.
  temperature?: number | undefined;
  // nucleus sampling where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
  top_p?: number | undefined;
  // The maximum number of tokens to generate in the completion. The token count of your prompt plus max_tokens cannot exceed the model's context length.
  max_tokens?: number | undefined;
  // How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.
  n?: number | undefined;
  // When used with n, best_of controls the number of candidate completions and n specifies how many to return – best_of must be greater than n.
  best_of?: number | undefined;
  // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim
  frequency_penalty?: number | undefined;
  // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
  presence_penalty?: number | undefined;
  // values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token
  logit_bias?: { [x: string]: number; } | undefined;
  // Up to 4 sequences where the API will stop generating further tokens.
  stop?: (string[] | string) | undefined;
  context_window?: string | number | undefined;
  training_data_end_date?: string | Date | undefined;
  api_endpoint?: string | undefined;
};

export const getContentFromChatCompletion = (response: API.ChatCompletion): string =>
  response?.choices?.[0]?.message?.content || '';
export type ModelInput = 
| any
  | string
  | {
      type: 'image_url';
      image_url:
        | string
        | {
            url: string;
            detail: 'low' | 'high' | 'auto';
          };
    }
  | {
      type: 'text';
      text: string;
    };
export type ModelOutput = undefined | string | API.ChatCompletion;
