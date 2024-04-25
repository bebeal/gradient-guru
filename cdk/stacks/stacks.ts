import { ViteStack } from './vite-stack';
import { App } from 'aws-cdk-lib';

export const makeStacks = (app: App) => {
  const stacks = [
    new ViteStack(app, 'ViteStack', {
      env: { region: 'us-west-2' },
    }),
  ];
  return stacks;
};
