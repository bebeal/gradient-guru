import { Button } from '@/components';
import { useFlowExtractor } from '@/hooks';
import { FlowTab } from './shared';

export type FlowQueryBuilderTabProps = {};
export const FlowQueryBuilderTab = (props: FlowQueryBuilderTabProps) => {
  const { ...rest } = props;
  const flowExtractor = useFlowExtractor();



  return (
    <FlowTab title="Query Builder" className="h-full">
      <div className="h-full w-full flex-1" />
      <Button variant="gradient" onClick={() => console.log('query builder')}>
        Build Query
      </Button>
    </FlowTab>
  );
};
FlowQueryBuilderTab.displayName = 'FlowQueryBuilderTab';
