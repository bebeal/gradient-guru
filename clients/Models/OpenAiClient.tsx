'use client'

import OpenAI from 'openai';
import { ApiKeyError, BaseModelClient, DataModality, ModelConfig } from '@/clients/Models';
import { filterObjectByKeys, isDevEnv } from '@/utils';

export const getContentFromChatCompletion = (response: OpenAI.ChatCompletion): string => response?.choices?.[0]?.message?.content || '';

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

export class OpenAIModelClient extends BaseModelClient<OpenAIModelConfig, OpenAIModelInput, OpenAIModelOutput> {
  apiKey?: string;

  constructor(config: OpenAIModelConfig, apiKey?: string) {
    super(config);
    this.apiKey = apiKey || isDevEnv ? process.env.NEXT_PUBLIC_OPENAI_API_KEY : '';
  }

  async callApi(input: OpenAIModelInput): Promise<OpenAIModelOutput> {
    if (!this.apiKey) {
      throw ApiKeyError(this.apiKey);
    }
    // filter modelInput for only allowed keys, cause openai api is picky
    const modelInput = filterObjectByKeys({ ...this.config, messages: input }, [
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
    ]);
    return await this.chatCompletion(modelInput);
  }

  updateMessages(content: any): void {
    const extractedContent = getContentFromChatCompletion(content);
    super.updateMessages(extractedContent);
  }

  private async chatCompletion(body: Record<string, any>): Promise<OpenAI.ChatCompletion> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}
