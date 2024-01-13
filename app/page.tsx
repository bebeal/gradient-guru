'use client'

import { Flow } from "@/components";
import { TLShape, createShapeId } from "@tldraw/tldraw";

const box_1: any = {
  id: createShapeId(`box-1`),
  type: 'geo',
  x: 0,
  y: 0,
  props: {
    w: 300,
    h: 200,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'draw',
    size: 's',
    font: 'mono',
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
  x: 100,
  y: 125,
  props: {
    w: 100,
    h: 25,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'solid',
    size: 's',
    font: 'mono',
    text: 'Button',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: '',
  }
};

const icon_node: any = {
  id: createShapeId(`icon-node`),
  type: 'icon',
  x: 18,
  y: 10,
  props: {
    w: 36,
    h: 36,
    iconSet: 'Custom',
    icon: 'GradientGuru',
  }
};

const text_node: any = {
  id: createShapeId(`text-node`),
  type: 'geo',
  x: 0,
  y: 0,
  props: {
    w: 300,
    h: 36,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'draw',
    size: 's',
    font: 'mono',
    text: 'gradient-guru',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: '',
  }
};

const initialShapes: TLShape[] = [
  box_1,
  box_2,
  icon_node,
  text_node
];

const FlowPage = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Flow initialShapes={initialShapes} />
    </div>
  )
};
export default FlowPage;
