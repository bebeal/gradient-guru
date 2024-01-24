import { ModelConfig, ModelState } from '@/utils';

// generic client for interacting with models
export type ModelInput<T = any> = T;
export type ModelOutput<T = any> = T;

export interface IModelClient<Config extends ModelConfig, Input = ModelInput, Output = ModelOutput> {
  config: Config;
  error: Error | undefined;
  state: ModelState;
  forward(input: Input): Promise<Output>;
  forwardPrecondition(input: Input): void;
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

  updateConfig(configOverride: Partial<Config> = {}): void {
    this.config = { ...this?.config, ...configOverride };
  }

  // Must pass this to be able to call forward()
  forwardPrecondition(input: Input) {
    if (this.state !== 'idle') {
      this.error = new Error('Model is not in idle state');
    }

    if (this.error) {
      throw this.error;
    }
  }

  // One forward pass of the model
  async forward(input: Input): Promise<Output> {
    this.forwardPrecondition(input);
    console.log('ModelClient.forward()', input);
    this.state = 'inference';
    try {
      const response = await this.callApi(input);
      this.state = 'idle';
      return response;
    } catch (error) {
      this.error = error as Error;
      this.state = 'error';
      throw error;
    }
  }

  // Identity function by default, override in subclasses
  async callApi(input: Input): Promise<Output> {
    return await new Promise((resolve, reject) => {
      resolve(input as unknown as Output);
    });
  }

  // For mocking purposes
  async mockApi(input: Input): Promise<Output> {
    return await new Promise((resolve, reject) => {
      resolve(input as unknown as Output);
    });
  }
}
