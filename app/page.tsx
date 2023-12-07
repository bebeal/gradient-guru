'use client'

import { Flow, IconSetCache } from "@/components";
import { TLShape, createShapeId } from "@tldraw/tldraw";
import ReactDOMServer from "react-dom/server";

const box_1: any = {
  id: createShapeId(`box-1`),
  type: 'geo',
  x: 0,
  y: 0,
  props: {
    w: 300,
    h: 300,
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
  y: 225,
  props: {
    w: 100,
    h: 35,
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
  y: 25,
  props: {
    w: 36,
    h: 36,
    iconSet: 'Carbon',
    icon: 'MachineLearningModel',
  }
};

const text_node: any = {
  id: createShapeId(`text-node`),
  type: 'text',
  x: 60,
  y: 25,
  props: {
    color: 'black',
    size: 's',
    w: 150,
    text: 'Gradient Guru',
    font: 'mono',
    align: 'middle',
    scale: 1.5,
  }
};

const initialShapes: TLShape[] = [
  box_1,
  box_2,
  icon_node,
  text_node
];

const ApplicationWeb = <IconSetCache.Carbon.ApplicationWeb stroke="white" fill="white" width="32" height="32" />;

const FlowPage = () => {
  const customIcons = {
    icons: {
      'ApplicationWeb': `data:image/svg+xml,${encodeURIComponent(ReactDOMServer.renderToStaticMarkup(ApplicationWeb))}`,
    }
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <Flow initialShapes={initialShapes} />
    </div>
  )
};
export default FlowPage;
