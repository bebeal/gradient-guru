'use client'

import OpenAI from 'openai';
import { BaseModelClient } from './ModelClient';
import { filterObjectByKeys, isDevEnv, OpenAIModelConfig, OpenAIModelInput, OpenAIModelOutput, ValidApiKeys , ApiKeyError } from '@/utils';
import { InvalidIdFallbackHtml } from '@/components';

export const getApiKey = () => {
  return process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
};

export class OpenAIModelClient extends BaseModelClient<OpenAIModelConfig, OpenAIModelInput, OpenAIModelOutput> {
  apiKey?: string;

  constructor(config: OpenAIModelConfig, apiKey?: string) {
    super(config);
    this.apiKey = apiKey || isDevEnv ? getApiKey() : '';
  }

  async forwardPrecondition(input: any) {
    if (!this.apiKey || !this.apiKey.length) {
      throw ApiKeyError(this.apiKey);
    }
    super.forwardPrecondition(input);
  }

  async callApi(input: OpenAIModelInput): Promise<OpenAIModelOutput> {
    // filter modelInput for only allowed keys, cause openai api is picky
    const modelInput = filterObjectByKeys({ ...this.config, messages: input }, ValidApiKeys);
    return await this.chatCompletion(modelInput);
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

  override async mockApi(input: OpenAIModelInput): Promise<OpenAIModelOutput> {
    // mock response ChatCompletion
    return await new Promise((resolve, reject) => {
      resolve({
        choices: [
          {
            finish_reason: 'stop',
            index: 0,
            logprobs: null,
            message: {
              content: InvalidIdFallbackHtml('Mocked OpenAIModelClient Response', ''),
            },
          },
        ],
      } as any);
    });
  }
}
