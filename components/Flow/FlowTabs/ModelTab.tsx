import { Button, Form, Separator, TextArea } from '@/components';
import { ModelConfigSchema, useModel } from '@/hooks';
import { FlowTab } from './shared';
import { cn } from '@/utils';
import { ChangeEvent, useState } from 'react';

export type ModelTabProps = {};
export const ModelTab = (props: ModelTabProps) => {
  const { ...rest } = props;
  const model = useModel();
  const [input, setInput] = useState<string>('');

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <FlowTab title="Query Builder" className="h-full flex flex-col justify-between">
      <Form object={model.config} schema={ModelConfigSchema} onSubmit={model.updateConfig} />
      <Separator />
      <div className="h-auto w-full">
        <TextArea
          value={input}
          onChange={onInputChange}
          className={cn(`min-h-[50px] w-full resize-none bg-transparent py-[1rem] focus-within:outline-none items-center justify-center flex flex-1 h-auto leading-none px-[8px] text-inherit placeholder:text-muted`)}
        />
      </div>
      <Separator />
      <Button variant="gradient" onClick={() => model.queryModel.refetch()}>
        Run Query
      </Button>
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';
