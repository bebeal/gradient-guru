import { Button, Form } from '@/components';
import { ModelConfigSchema, useModel } from '@/hooks';
import { FlowTab } from './shared';
import { useEffect } from 'react';

export type ModelTabProps = {};
export const ModelTab = (props: ModelTabProps) => {
  const { ...rest } = props;
  const model = useModel();

  useEffect(() => {
    // console.log('model', model);
  }, [model]);

  return (
    <FlowTab title="Query Builder" className="h-full">
      <Form object={model.config} schema={ModelConfigSchema} onSubmit={model.updateConfig} />
      <div className="h-full w-full flex-1" />
      <Button variant="gradient" onClick={() => model.queryModel.refetch()}>
        Run Query
      </Button>
    </FlowTab>
  );
};
ModelTab.displayName = 'ModelTab';
