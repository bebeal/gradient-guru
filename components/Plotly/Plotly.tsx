'use client'

import { usePlotly } from './usePlotly';
import { Erroring, Loading } from '@/components';
import { PlotParams } from 'react-plotly.js';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// TODO: look to use updated branch with typescript support: https://github.com/plotly/react-plotly.js/pull/333

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
    <Suspense fallback={<Loading />}>
      <DynamicPlotly
        data={data}
        layout={layout}
        frames={frames}
        config={config}
        {...rest}
      />
    </Suspense>
  );
};
