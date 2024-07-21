#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { makeStacks } from './stacks/stacks';

const makeApp = () => {
  const app = new cdk.App();
  makeStacks(app);
  app.synth();
  return app;
};

try {
  makeApp();
  console.log('CDK template generation completed successfully');
} catch (error) {
  console.error('Error synthesizing CDK app:', error);
  process.exit(1);
}
