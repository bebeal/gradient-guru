import { App } from "aws-cdk-lib";
import { NextStack } from "./next-stack";

export const makeStacks = (app: App) => {
  const stacks = [
    new NextStack(app, "NextStack", {
      env: {region: "us-west-2"},
    }),
  ];
  return stacks;
};
