import API from 'openai';

// Lightweight generic client for interacting with models
// Using classes to leverage inheritance for making it extensible/modular

export type DataModality = 'text' | 'image' | 'audio' | 'video';
export type ModelState = 'idle' | 'inference' | 'error';

export type Message = {
  role: API.ChatCompletionRole;
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
    this.config.messages?.push({ role: 'assistant' as API.ChatCompletionRole, content });
  }

  updateConfig(configOverride: Partial<Config>): void {
    this.config = { ...this.config, ...configOverride };
  }

  // Identity function for mocking, override in subclasses
  callApi(input: Input): Promise<Output> {
    return new Promise((resolve, reject) => {
      resolve(input as unknown as Output);
    });
  }
}
