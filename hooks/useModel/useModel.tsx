
import { createContext, useCallback, useContext, useState } from 'react';
import API from "openai";
import { getContentFromChatCompletion, Message, ModelConfig, mockResponse, ModelInput, DefaultModelConfig } from './shared';
import { useFlowExtractor } from '@/hooks';
import { useOpenAI } from './useOpenAI';
import { useQuery } from 'react-query';

export const ModelContext = createContext(
  {} as {
    config: Partial<ModelConfig>;
    setConfig: (configOverride: Partial<ModelConfig>) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    runningInference: boolean;
    setRunningInference: (running: boolean) => void;
    error?: Error;
    setError: (error?: Error) => void;
    resetMessages: () => void;
    updateConfig: (configOverride: Partial<ModelConfig>) => void;
    updateMessages: (response: any) => void;
});

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<Partial<ModelConfig>>(DefaultModelConfig);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [runningInference, setRunningInference] = useState<boolean>(false);

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Update messages with response from model forward pass
  const updateMessages = useCallback((response: any) => {
      const content: string = getContentFromChatCompletion(response) || '';
      messages.push({ role: 'assistant' as API.ChatCompletionRole, content: content });
    },
    [messages]
  );

  const updateConfig = useCallback(
    (configOverride: Partial<ModelConfig>) => {
      setConfig({ ...config, ...configOverride });
    },
    [config]
  );

  return (
    <ModelContext.Provider value={{ config, setConfig, messages, setMessages, runningInference, setRunningInference, error, setError, resetMessages, updateConfig, updateMessages }}>
      {children}
    </ModelContext.Provider>
  );
};


export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error('useModel must be used within a ModelProvider');
  const {
    config,
    setConfig,
    messages,
    setMessages,
    runningInference,
    setRunningInference,
    error,
    setError,
    resetMessages,
    updateConfig,
    updateMessages,
  } = context;
  // const backendApi = useBackendApi();
  const openAI = useOpenAI();
  const flowExtractor = useFlowExtractor();

  // Perform inference on model with input
  const predict = useCallback(async (input: ModelInput, configOverride: Partial<ModelConfig> = {}) => {
      setRunningInference(true);
      const prompt = [...messages, { role: 'user' as API.ChatCompletionRole, content: input }];
      const requestBody = { ...config, ...configOverride, messages: prompt };
      let response = undefined;
      try {
        response = mockResponse(requestBody);
        // response = openAi.useChatCompletion(JSON.stringify(requestBody));
        updateMessages(response);
      } catch (error) {
        setError(error as Error);
      }
      setRunningInference(false);
      return response;
    },
    [config, messages, setError, setRunningInference, updateMessages]
  );

  const queryModel = useQuery('model-query', async () => {
    const input = flowExtractor.extractAll();
    return await predict(input);
  }, {
    enabled: false,
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return {
    ...context,
    predict, runInference: predict, forward: predict,
    queryModel,
  };
};
