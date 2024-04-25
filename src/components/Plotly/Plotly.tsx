import { Suspense } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import { Loading } from '@/components/Primitives/Loading';
import { Erroring } from '@/components/Primitives/shared';
import { usePlotly } from './usePlotly';

// TODO: look to use updated branch with typescript support: https://github.com/plotly/react-plotly.js/pull/333

export interface PlotlyProps extends Omit<PlotParams, 'data' | 'layout'> {
  data: Plotly.Data[] | string | File;
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
}
export const Plotly = (props: PlotlyProps) => {
  const { data, isLoading, error, layout, frames, config, isMounted, setIsMounted, ...rest } = usePlotly(props);

  if (error) return <Erroring error={error} />;
  return (
    <Suspense fallback={<Loading />}>
      <Plot data={data} layout={layout} frames={frames} config={config} {...rest} />
    </Suspense>
  );
};
