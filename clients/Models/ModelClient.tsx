'use client'

import { InvalidLinkHtml } from '@/components';
import OpenAI from 'openai';

// Lightweight generic client for interacting with models

export type DataModality = 'text' | 'image' | 'audio' | 'video';
export type ModelState = 'idle' | 'inference' | 'error';

export type Message = {
  role: OpenAI.ChatCompletionRole;
  content: any;
  name?: string;
};

export interface ModelConfig {
  model: string;
  modalities?: DataModality[];
  messages?: Message[];
  context_window?: string | number;
  training_data_end_date?: string | Date;
  api_endpoint?: string;
  client_name: 'Open AI' | 'Backend'
}

export type ModelInput<T = any> = T;
export type ModelOutput<T = any> = T;

export interface IModelClient<Config extends ModelConfig, Input = ModelInput, Output = ModelOutput> {
  config: Config;
  error: Error | undefined;
  state: ModelState;

  forward(input: Input): Promise<Output>;
  forwardPrecondition(input: Input): void;
  resetMessages(): void;
  updateMessages(response: any): void;
  updateConfig(configOverride: Partial<Config>): void;
}

export class BaseModelClient<Config extends ModelConfig, Input = ModelInput, Output = ModelOutput> implements IModelClient<Config, Input, Output> {
  config: Config;
  error: Error | undefined;
  state: ModelState;

  constructor(config: Config) {
    this.config = config || {};
    this.error = undefined;
    this.state = 'idle';
  }

  async forward(input: Input): Promise<Output> {
    this.forwardPrecondition(input);
    this.state = 'inference';
    try {
      const response = await this.callApi(input);
      this.updateMessages(response);
      this.state = 'idle';
      return response;
    } catch (error) {
      this.error = error as Error;
      this.state = 'error';
      throw error;
    }
  }

  forwardPrecondition(input: Input) {
    if (this.state !== 'idle') {
      this.error = new Error('Model is not in idle state');
    }

    if (this.error) {
      throw this.error;
    }
  }

  resetMessages(): void {
    this.config.messages = [];
  }

  updateMessages(content: any): void {
    this.config.messages?.push({ role: 'assistant' as OpenAI.ChatCompletionRole, content });
  }

  updateConfig(configOverride: Partial<Config> = {}): void {
    this.config = { ...this?.config, ...configOverride };
  }

  // Identity function for mocking, override in subclasses
  async callApi(input: Input): Promise<Output> {
    return await new Promise((resolve, reject) => {
      resolve(input as unknown as Output);
    });
  }

  async mockApi(input: Input): Promise<Output> {
    // mock response ChatCompletion 
    return await new Promise((resolve, reject) => {
      resolve({
        choices: [
          {
            finish_reason: 'stop',
            index: 0,
            logprobs: null,
            message: {
              content: InvalidLinkHtml,
            },
          },
        ],
      } as any);
    });
  }
}

