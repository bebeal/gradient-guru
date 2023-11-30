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

  // const onToggleConfig = (pressed: boolean, config: any, setConfig: any) => {
  //   setConfig({...config, enabled: pressed})
  // };

  // const QueryBuilderBox = (config: any, setConfig: any, title: string, schema?: any) => {
  //   const {enabled, ...configNoEnabled} = config;
  //   return (
  //     <Accordion
  //       triggerClassName={cn(`flex w-full h-auto text-center justify-center items-center`)}
  //       items={[
  //          {
  //           name: (
  //             <UnderlinedTitle className="flex w-full justify-center h-auto text-center items-center">
  //                 {/* <Switch pressed={enabled} onPressedChange={(pressed: boolean) => onToggleConfig(pressed, config, setConfig)} className={cn(``)} /> */}
  //               {title}
  //             </UnderlinedTitle>
  //           ),
  //           content: (
  //             <div className="w-[100px] h-[100px] flex justify-center items-center">
  //               Test Content
  //             </div>
  //           )
  //          }
  //       ]}
  //     />
  //   );
  // };

  return (
    <FlowTab title="Query Builder" className='h-full'>
        {/* {QueryBuilderBox(flowExtractor.canvasEventConfig, flowExtractor.setCanvasEventConfig, 'Canvas Event')} */}
        <div className="flex-1 h-full w-full" />
        <Button variant='gradient' onClick={() => console.log('query builder')}>Build Query</Button>
    </FlowTab>
  )
};
FlowQueryBuilderTab.displayName = 'FlowQueryBuilderTab';
