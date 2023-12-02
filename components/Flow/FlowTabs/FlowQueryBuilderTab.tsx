import { Accordion, Button, FakeForm, Switch } from '@/components';
import { useFlowExtractor } from '@/hooks';
import { cn } from '@/utils';
import { FlowTab, UnderlinedTitle } from './shared';

export type FlowQueryBuilderTabProps = {};
export const FlowQueryBuilderTab = (props: FlowQueryBuilderTabProps) => {
  const { ...rest } = props;
  const flowExtractor = useFlowExtractor();

  const onToggleConfig = (pressed: boolean, config: any, setConfig: any) => {
    setConfig({ ...config, enabled: pressed });
  };

  const QueryBuilderBox = (config: any, setConfig: any, title: string) => {
    return (
      <Accordion
        radius={'xlarge'}
        triggerClassName="w-full flex justify-center items-center"
        items={[
          {
            name: (
              <UnderlinedTitle className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-1`)}>
                <Switch
                  asChild
                  pressed={config.enabled}
                  onPressedChange={(pressed: boolean) => onToggleConfig(pressed, config, setConfig)}
                  className="absolute left-0"
                >
                  <div />
                </Switch>
                {title}
              </UnderlinedTitle>
            ),
            content: (
              <div className={cn(`flex h-full w-full`)}>
                <FakeForm object={config} />
              </div>
            ),
            open: config.enabled,
          },
        ]}
      />
    );
  };

  return (
    <FlowTab title="Query Builder" className="h-full">
      {/* <div className="flex flex-col gap-4 w-full h-auto justify-center items-center">
          {QueryBuilderBox(flowExtractor.canvasEventConfig, flowExtractor.setCanvasEventConfig, 'Canvas Event')}
          {QueryBuilderBox(flowExtractor.uiEventConfig, flowExtractor.setUiEventConfig, 'UI Event')}
          {QueryBuilderBox(flowExtractor.historyRecordsConfig, flowExtractor.setHistoryRecordsConfig, 'History Records')}
        </div> */}
      <div className="h-full w-full flex-1" />
      <Button variant="gradient" onClick={() => console.log('query builder')}>
        Build Query
      </Button>
    </FlowTab>
  );
};
FlowQueryBuilderTab.displayName = 'FlowQueryBuilderTab';
