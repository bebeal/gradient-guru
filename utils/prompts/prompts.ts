import { node_based_agent } from './node_based_agent';
import { make_real } from './make_real';

// name comes in either camelCase or snake_case
// output should be "Make Real" or "Node Based Agent"
export const transformPromptName = (name: PromptName): string => {
  return name
    .split('_')
    .map((word, i) => {
      if (i === 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
};

export const promptNames = ['make_real', 'node_based_agent'] as const;
export type PromptName = (typeof promptNames)[number];
export const formattedPromptNames: Record<PromptName, string> = promptNames.reduce((acc, name) => {
  acc[name] = transformPromptName(name);
  return acc;
}, {} as Record<PromptName, string>);

export const estimatePromptCost = (prompt: PromptName) => {
};

export const Prompts: Record<PromptName, any> = {
  make_real,
  node_based_agent,
};

const prettyPrintSystemPrompt: Partial<Record<PromptName, (systemPrompt: string) => string>> = {
  'make_real': (systemPrompt: string) => systemPrompt.split('\n').map((line: string) => `${line}`).join('\n\n'),
  // Other prompt names can be added here if needed
};

export const getSystemPrompt = (promptName: PromptName): string | any => {
  const prompt = Prompts[promptName];
  const systemPrompt = prompt?.system?.content || prompt?.system || prompt?.content || prompt;
  const prettyPrinter = prettyPrintSystemPrompt[promptName];
  if (prettyPrinter) {
    return prettyPrinter(systemPrompt);
  }
  return systemPrompt;
};
