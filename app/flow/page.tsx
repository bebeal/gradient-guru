'use client'

import { Flow } from "@/components";
import { TLShape, createShapeId } from "@tldraw/tldraw";

const box_1: any = {
  id: createShapeId(`box-1`),
  type: 'geo',
  x: 100,
  y: 100,
  props: {
    w: 100,
    h: 100,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'draw',
    size: 'm',
    font: 'draw',
    text: '',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: '',
  }
};

const box_2: any = {
  id: createShapeId(`box-2`),
  type: 'geo',
  x: 200,
  y: 200,
  props: {
    w: 100,
    h: 100,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'draw',
    size: 'm',
    font: 'draw',
    text: '',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: '',
  }
};

const initialShapes: TLShape[] = [
  box_1,
  box_2,
];

const FlowPage = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Flow initialShapes={initialShapes} />
    </div>
  )
};
export default FlowPage;
