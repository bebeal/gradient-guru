import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useFlowExtractor } from '@/hooks';
import { BaseModelClient, ModelConfig } from '@/clients';

export const ModelClientContext = createContext(
  {} as {
    modelClient: BaseModelClient<ModelConfig, any, any>;
    setModelClient: (client: BaseModelClient<ModelConfig, any, any>) => void;
  }
);

export interface ModelClientProviderProps {
  children: React.ReactNode;
}
export const ModelClientProvider: React.FC<ModelClientProviderProps> = ({ children }) => {
  const [modelClient, setModelClient] = useState<BaseModelClient<ModelConfig, any, any>>(new BaseModelClient<ModelConfig, any, any>({model: 'identity'} as any));

  return (
    <ModelClientContext.Provider value={{ modelClient, setModelClient }}>
      {children}
    </ModelClientContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelClientContext);
  if (!context) throw new Error('useModel must be used within a ModelProvider');
  const {
    modelClient,
    setModelClient,
  } = context;
  const flowExtractor = useFlowExtractor();

  const queryModel = useQuery('model-query', async () => {
      return flowExtractor.extractAll().then(async (flows) => {
        console.log('flows', flows);
        return await modelClient?.forward(flows);
      });
    },
    {
      enabled: false,
      onSuccess: (response) => {
        console.log('onSuccess Response:', response);
      },
      onError: (error) => {
        console.log('onError Response:', error);
      },
    }
  );

  return {
    modelClient,
    setModelClient,
    queryModel,
  };
};