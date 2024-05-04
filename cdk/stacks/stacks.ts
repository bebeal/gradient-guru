import { App } from 'aws-cdk-lib';
import pico from 'picocolors';
import { ViteStack } from './vite-stack';

export const makeStacks = (app: App) => {
  const stacks = [
    new ViteStack(app, 'ViteStack', {
      env: { region: 'us-west-2' },
    }),
  ];
  return stacks;
};
