
import { isDevEnv } from '@/utils';
import { useCallback, useEffect, useState } from 'react';


export const useOpenAI = () => {
  // const apiKey = useKeys().openAIKey;
  const apiKey = '';

  // apiKey takes priority
  // if in dev mode, can use env variable
  const [openAIKey, setOpenAIKey] = useState(apiKey || isDevEnv ? process.env.NEXT_PUBLIC_OPENAI_API_KEY : '');
  const noKeyError = useCallback(() => (openAIKey ? undefined : new Error('No OpenAI API key provided')), [openAIKey]);
  const [errors, setErrors] = useState<Error | undefined>(noKeyError);

  useEffect(() => {
    // console.log('openAIKey', openAIKey);
  }, [openAIKey]);

  const useChatCompletion = useCallback(async (body: string) => {
      if (errors) {
        setErrors(noKeyError);
        return;
      }

      try {
        const repsonse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        });

        return await repsonse.json();
      } catch (e) {
        console.error(e);
        throw new Error('Sorry, there was an error fetching from OpenAI');
      }
    },
    [apiKey, errors, noKeyError]
  );

  return {
    openAIKey,
    setOpenAIKey,
    errors,
    setErrors,
    useChatCompletion,
  };
};
