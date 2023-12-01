'use client'

import { Accordion, BulletedList, FakeForm, Form, Switch, Button } from '@/components';
import { FlowTab, Subtitle, UnderlinedTitle } from './shared';
import { useFlowExtractor } from '@/hooks';
import { cn } from '@/utils';

export type FlowQueryBuilderTabProps = {
};
export const FlowQueryBuilderTab = (props: FlowQueryBuilderTabProps) => {
  const {
    ...rest
  } = props;
  const flowExtractor = useFlowExtractor();

  const onToggleConfig = (pressed: boolean, config: any, setConfig: any) => {
    setConfig({...config, enabled: pressed})
  };

  const QueryBuilderBox = (config: any, setConfig: any, title: string) => {
    return (
      <Accordion
        radius={'xlarge'}
        triggerClassName='w-full flex justify-center items-center'
        items={[
           {
            name: (
              <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
                <Switch asChild pressed={config.enabled} onPressedChange={(pressed: boolean) => onToggleConfig(pressed, config, setConfig)} className='absolute left-0'><div/></Switch>
                {title}
              </UnderlinedTitle>
            ),
            content: (
              <div className={cn(`w-full h-full flex`)}>
                <FakeForm object={config} />
              </div>
            ),
            open: config.enabled, 
           }
        ]}
      />
    );
  };

  return (
    <FlowTab title="Query Builder" className='h-full'>
        {/* <div className="flex flex-col gap-4 w-full h-auto justify-center items-center">
          {QueryBuilderBox(flowExtractor.canvasEventConfig, flowExtractor.setCanvasEventConfig, 'Canvas Event')}
          {QueryBuilderBox(flowExtractor.uiEventConfig, flowExtractor.setUiEventConfig, 'UI Event')}
          {QueryBuilderBox(flowExtractor.historyRecordsConfig, flowExtractor.setHistoryRecordsConfig, 'History Records')}
        </div> */}
        <div className="flex-1 h-full w-full" />
        <Button variant='gradient' onClick={() => console.log('query builder')}>Build Query</Button>
    </FlowTab>
  )
};
FlowQueryBuilderTab.displayName = 'FlowQueryBuilderTab';
