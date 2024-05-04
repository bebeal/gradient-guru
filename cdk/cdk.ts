#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import pico from 'picocolors';
import { makeStacks } from './stacks/stacks';

const makeApp = () => {
  const app = new cdk.App();
  makeStacks(app);
  return app;
};

try {
  console.log('Building CDK...');
  const app = makeApp();
  app.synth().stacks.forEach((stack) => console.log(` - ${stack.stackName}`));
  console.log(pico.green('✓ CDK build successful\n'));
} catch (error) {
  console.log(pico.red('✗ CDK build failed\n'), error);
  process.exit(1);
}
