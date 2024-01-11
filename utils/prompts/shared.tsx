import { ExtractedState } from '@/hooks';
import { getMakeRealPrompt } from './MakeReal';
import { getNodeControlPrompt } from './NodeControl';
import { ModelConfig } from '../models';

export const getCurrentState = (screenBounds: any, nodes: any[], selectedNodeIds: any[]): string => {
  return `Current state:
- Screen bounds: ${JSON.stringify(screenBounds, null, 2)}
- Nodes: ${JSON.stringify(nodes, null, 2)}
- Selected node ids: ${JSON.stringify(selectedNodeIds, null, 2)}`;
};

// output should be "Make Real" or "Node Based Agent"
export const transformPromptName = (name: string): string => {
  // Inserting underscores before uppercase letters in camel case strings
  const processedName = name.replace(/([A-Z])/g, '_$1').toLowerCase();
  return processedName
    .split('_')
    .map((word, i) => {
      if (i === 0 || word) {
        // Checking if the word is not empty
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
};

export const getPrettyPrintedPrompt = (promptName: PromptName, systemPrompt: string): string => {
  const prettyPrinter = PrettyPrintPrompts[promptName];
  if (prettyPrinter) {
    return prettyPrinter(systemPrompt);
  }
  return systemPrompt;
};

export const promptNames = ['makeReal', 'nodeControl'] as const;
export type PromptName = (typeof promptNames)[number];
export const formattedPromptNames: Record<PromptName, string> = promptNames.reduce(
  (acc, name) => {
    acc[name] = transformPromptName(name);
    return acc;
  },
  {} as Record<PromptName, string>
);

export type PromptOptions = {
  [key: string]: any;
};
export type Prompt = {
  name: PromptName;
  options: PromptOptions;
  getPrompt: (...args: any[]) => any;
  prettyPrintSystemPrompt: (systemPrompt: string) => string;
};

export type PromptInputProps = {
  extracted: ExtractedState;
  config: ModelConfig;
};

// vends arbitrary prompt generators
export const Prompts: Record<PromptName, (opts: PromptInputProps) => any> = {
  makeReal: (opts: PromptInputProps) => getMakeRealPrompt(opts),
  nodeControl: (opts: PromptInputProps) => getNodeControlPrompt(opts),
};

export const PrettyPrintPrompts: Partial<Record<PromptName, (prompt?: string) => string>> = {};
