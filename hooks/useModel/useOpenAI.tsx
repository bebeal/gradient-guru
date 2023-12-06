
import { isDevEnv } from '@/utils';
import { useCallback, useState } from 'react';


export interface useOpenAiProps {
  apiKey?: string;
}
export const useOpenAi = (props: useOpenAiProps) => {
  const {
    apiKey: apiKeyFromProp,
  } = props;
  // if in dev mode, can use env variable
  const [apiKey, setApiKey] = useState(apiKeyFromProp || isDevEnv ? process.env.NEXT_PUBLIC_OPENAI_API_KEY : '');
  const noKeyError = useCallback(() => (apiKey ? undefined : new Error('No OpenAI API key provided')), [apiKey]);
  const [errors, setErrors] = useState<Error | undefined>(noKeyError);

  const useChatCompletion = useCallback(async (body: Record<string, any>) => {
      if (errors) {
        setErrors(noKeyError);
        return;
      }

      try {
        console.log('body', body)
        const repsonse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        });
        console.log('response', repsonse);
        return await repsonse.json();
      } catch (e) {
        console.error(e);
        throw new Error('Sorry, there was an error fetching from OpenAI');
      }
    },
    [apiKey, errors, noKeyError]
  );

  return {
    apiKey,
    setApiKey,
    errors,
    setErrors,
    useChatCompletion,
  };
};
