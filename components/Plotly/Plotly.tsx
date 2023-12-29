'use client'

import { usePlotly } from '@/hooks';
import { Erroring } from '@/components';
import dynamic from 'next/dynamic';
import { PlotParams } from 'react-plotly.js';

const DynamicPlotly = dynamic(() => import('react-plotly.js'), { ssr: false });


export interface PlotlyProps extends Omit<PlotParams, 'data' | 'layout'> {
  data: Plotly.Data[] | string | File;
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
}
export const Plotly = (props: PlotlyProps) => {
  const {
    data,
    isLoading,
    error,
    layout,
    frames,
    config,
    isMounted,
    setIsMounted,
    ...rest
  } = usePlotly(props);

  if (error) return <Erroring error={error} />;
  return (
    <DynamicPlotly
      data={data}
      layout={layout}
      frames={frames}
      config={config}
      {...rest}
    />
  );
};

