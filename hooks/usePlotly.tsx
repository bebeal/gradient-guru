'use client'

import { PlotlyProps } from '@/components';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const defaultBg = 'rgb(22, 26, 29)';
const defaultFontColor = 'rgb(160, 170, 186)';

// For managing plotly visualizations
export const usePlotly = (props: PlotlyProps) => {
  const {
    data: initialData = [],
    layout: initialLayout = {},
    frames: initialFrames = [],
    config: initialConfig = {},
    ...rest
  } = props;

  const dataQuery = useQuery<Plotly.Data[], Error>({
    queryKey: ['plotlyData', initialData],
    queryFn: async () => { 
      if (typeof initialData === 'string') {
        const res = await fetch(initialData);
        const jsonData = await res.json();
        setLayout(jsonData.layout);
        return jsonData.data;
      } else if (initialData instanceof File) {
        return new Promise<Plotly.Data[]>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(JSON.parse(reader.result as string));
          reader.onerror = reject;
          reader.readAsText(initialData);
        });
      } else {
        return initialData;
      }
    },
    enabled: false,
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [bg, setBg] = useState(defaultBg);
  const [fontColor, setFontColor] = useState(defaultFontColor);
  const [data, setData] = useState<Plotly.Data[]>([]);
  const [layout, setLayout] = useState<Partial<Plotly.Layout>>({
    autosize: true,
    modebar: {
      orientation: 'v',
    },
    plot_bgcolor: bg,
    paper_bgcolor: bg,
    font: {
      color: fontColor,
    },
    xaxis: {
      color: fontColor,
    },
    yaxis: {
      color: fontColor,
    },
    ...initialLayout,
  });
  const [frames, setFrames] = useState<Plotly.Frame[]>(initialFrames);
  const [config, setConfig] = useState<Partial<Plotly.Config>>({
    responsive: true,
    scrollZoom: true,
    ...initialConfig,
  });

  useEffect(() => {
    if (!isMounted) {
      dataQuery.refetch().then((result) => {
        if (result.isSuccess) setData(result.data!);
        setIsMounted(true);
      });
    }
  }, [dataQuery, isMounted]);

  return {
    ...dataQuery,
    ...rest,
    isMounted,
    setIsMounted,
    data,
    setData,
    layout,
    setLayout,
    frames,
    setFrames,
    config,
    setConfig,
  };
};
