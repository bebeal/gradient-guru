'use client'

import { Plotly } from '@/components';

const linePlotData = [{
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 4, 8, 16] 
}];


const PlotlyPage = () => {
  return (
    <div className="w-full h-full bg-primary flex items-center justify-center">
      <Plotly data={linePlotData} />
    </div>
  );
};

export default PlotlyPage;
