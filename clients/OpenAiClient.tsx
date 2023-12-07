import API from 'openai';
import { ApiKeyError, BaseModelClient, ModelConfig } from '@/clients';

export const getContentFromChatCompletion = (response: API.ChatCompletion): string => response?.choices?.[0]?.message?.content || '';

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
export type OpenAIModelOutput = undefined | string | API.ChatCompletion;

export interface OpenAIModelConfig extends ModelConfig {
  functions?: unknown[]; // functions the model can leverage in JSON mode
  function_call?: unknown;
  stream?: boolean;
  temperature?: number; // Controls randomness: larger values = more randomness, smaller values = more deterministic
  top_p?: number; // Nucleus sampling: top percentage of probability mass to consider
  max_tokens?: number; // Max number of tokens to generate (limits output length)
  n?: number; // Number of completion choices to generate
  best_of?: number; // Used with n, controls number of candidate completions
  frequency_penalty?: number; // Penalizes new tokens based on frequency in the text
  presence_penalty?: number; // Penalizes new tokens based on their presence in the text
  logit_bias?: { [key: string]: number }; // Bias for or against specific tokens
  stop?: string[] | string; // Sequences where the API will stop generating tokens
}

export class OpenAIModelClient extends BaseModelClient<OpenAIModelConfig, OpenAIModelInput, OpenAIModelOutput> {
  apiKey: string;

  constructor(config: OpenAIModelConfig, apiKey: string) {
    super(config);
    this.apiKey = apiKey;
  }

  async callApi(input: OpenAIModelInput): Promise<OpenAIModelOutput> {
    if (!this.apiKey) {
      throw ApiKeyError(this.apiKey);
    }
    return await this.chatCompletion({ ...this.config, input });
  }

  updateMessages(content: any): void {
    const extractedContent = getContentFromChatCompletion(content);
    super.updateMessages(extractedContent);
  }

  private async chatCompletion(body: Record<string, any>): Promise<API.ChatCompletion> {
    const repsonse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    return await repsonse.json();
  }
}

