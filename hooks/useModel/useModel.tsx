import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useContentExtractor } from '@/hooks';
import { BaseModelClient, DefaultModelConfig, ModelConfig, OpenAIModelClient } from '@/clients';
import { PROMPT_LIBRARY, blobToBase64 } from '@/utils';
import { Editor, createShapeId, getSvgAsImage, useEditor } from '@tldraw/tldraw';
import { PreviewNode } from '@/components';

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
  // const [modelClient, setModelClient] = useState<BaseModelClient<ModelConfig, any, any>>(new BaseModelClient<ModelConfig, any, any>({model: 'identity'} as any));
  const [modelClient, setModelClient] = useState<BaseModelClient<ModelConfig, any, any>>(new OpenAIModelClient(DefaultModelConfig));

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
  const editor = useEditor();
  const contentExtractor = useContentExtractor();

  const queryModel = useQuery('model-query', async () => {
      return contentExtractor.extractAll().then(async (flows) => {
        const text = flows.text;
        const selectedShapes = editor.getSelectedShapes()
        const svg: any = await editor.getSvg(selectedShapes, {
          scale: 1,
          background: true,
        });
        const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

        const blob = await getSvgAsImage(svg, IS_SAFARI, {
          type: 'png',
          quality: 0.8,
          scale: 1,
        });
        const dataUrl = await blobToBase64(blob!)
        const userMessages = [
          {
            type: 'image_url',
            image_url: {
              // send an image of the current selection to gpt-4 so it can see what we're working with
              url: dataUrl,
              detail: 'high',
            },
          },
          {
            type: 'text',
            text: 'Here are the latest wireframes including some notes on your previous work. Could you make a new website based on these wireframes and notes and send back just the html file?',
          },
          {
            // send the text of all selected shapes, so that GPT can use it as a reference (if anything is hard to see)
            type: 'text',
            text:
              text !== ''
                ? text
                : 'Oh, it looks like there was not any text in this design!',
          },
        ]
      
        // combine the user prompt with the system prompt
        const prompt = [
          { role: 'system', content: PROMPT_LIBRARY['make_real'].system.content },
          { role: 'user', content: userMessages },
        ];
        const resposneShapeId = createShapeId();
        makeEmptyResponseShape(editor, resposneShapeId, dataUrl);
        // const message = 'dummy message';
        const json =  await modelClient?.forward(prompt);
        const message = json.choices[0].message.content
        const start = message.indexOf('<!DOCTYPE html>')
        const end = message.indexOf('</html>')
        const html = message.slice(start, end + '</html>'.length)
        editor.updateShape<PreviewNode>({
          id: resposneShapeId,
          type: 'preview',
          props: { html, source: dataUrl as string },
        })
        return message
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
      retry: false,
    }
  );

  return {
    modelClient,
    setModelClient,
    queryModel,
  };
};

function makeEmptyResponseShape(editor: Editor, resposneShapeId: any, dataUrl?: string) {
	const selectionBounds = editor.getSelectionPageBounds()
	if (!selectionBounds) throw new Error('No selection bounds')
  const { maxX, midY }: any = editor.getSelectionPageBounds()
  editor.createShape<PreviewNode>({
		id: resposneShapeId,
		type: 'preview',
		x: maxX + 60, // to the right of the selection
		y: midY - (540 * 2) / 3 / 2, // half the height of the preview's initial shape
		props: { html: '', source: dataUrl as string },
	})
}
