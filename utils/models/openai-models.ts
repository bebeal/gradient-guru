import { DataModality, ModelConfig } from "./models";
import OpenAI from "openai";
import PandaAdversarial from "@/assets/images/panda-adversarial.png";
import { ChatCompletion } from "openai/resources/index.mjs";

export const ValidApiKeys= [
  'model',
  'messages',
  'frequency_penalty',
  'logit_bias',
  'logprobs',
  'top_logprobs',
  'max_tokens',
  'n',
  'presence_penalty',
  'response_format',
  'seed',
  'stop',
  'stream',
  'temperature',
  'top_p',
  'tools',
  'tool_choice',
  'user',
];

export const ApiKeyError = (apiKey?: string): Error => new Error(`No OpenAI API key provided\napiKey: ${apiKey}`);

export const getContentFromChatCompletion = (response: OpenAI.ChatCompletion): string => response?.choices?.[0]?.message?.content || '';

export const getHTMLFromOpenAIResponse = (response: ChatCompletion) => {
  const message = response.choices[0].message.content || '';
  const start = message.indexOf('<!DOCTYPE html>');
  const end = message.indexOf('</html>');
  const html = message.slice(start, end + '</html>'.length);
  return html;
};

export type OpenAIModelInput =
  | any // hack for now until this abstraction is sorted out
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
export type OpenAIModelOutput = undefined | string | OpenAI.ChatCompletion;

export interface OpenAIModelConfig extends ModelConfig, Omit<OpenAI.Completions.CompletionCreateParamsNonStreaming, 'model' | 'prompt'> {
  modalities?: DataModality[];
}

export const OpenAiModels: Record<string, any> = {
  'gpt-4-vision-preview': {
    model: 'gpt-4-vision-preview',
    max_tokens: 4096,
    modalities: ['text', 'image'] as DataModality[],
    context_window: 128000,
    training_end_date: '2023-04-01',
  },
  'gpt-4-1106-preview': {
    model: 'gpt-4-1106-preview',
    max_tokens: 4096,
    modalities: ['text'] as DataModality[],
    context_window: 128000,
    training_end_date: '2023-04-01',
  },
  'gpt-4': {
    model: 'gpt-4',
    max_tokens: 4096,
    modalities: ['text'] as DataModality[],
    context_window: 8192,
    training_end_date: '2021-09-01',
  },
  'gpt-4-32k': {
    model: 'gpt-4-32k',
    max_tokens: 32768,
    modalities: ['text'] as DataModality[],
    context_window: 32768,
    training_end_date: '2021-09-01',
  },
  'gpt-3.5-turbo-1106': {
    model: 'gpt-3.5-turbo-1106',
    max_tokens: 4096,
    modalities: ['text'] as DataModality[],
    context_window: 16384,
    training_end_date: '2021-09-01',
  },
  'gpt-3.5-turbo': {
    model: 'gpt-3.5-turbo',
    max_tokens: 4096,
    modalities: ['text'] as DataModality[],
    context_window: 4096,
    training_end_date: '2021-09-01',
  },
};
export const OpenAiModelNames = Object.keys(OpenAiModels);

export const mockInput: OpenAIModelConfig & OpenAIModelInput = {
  model: 'gpt-4-vision-preview',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: PandaAdversarial.src,
        },
        {
          type: 'text',
          text: 'What do you see?',
        }
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'This is a picture of a gibbon.',
        },
      ],
    },
  ],
  stream: false,
  temperature: 0.6,
  top_p: 1,
  max_tokens: 16,
  n: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};
