'use client'

import { Flow, IconSetCache } from "@/components";
import { TLShape, createShapeId } from "@tldraw/tldraw";
import ReactDOMServer from "react-dom/server";

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
    w: 110,
    h: 110,
    geo: 'rectangle',
    color: 'black',
    labelColor: 'black',
    fill: 'none',
    dash: 'draw',
    size: 'm',
    font: 'draw',
    text: 'GG',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: 'https://www.gradient-guru.org',
  }
};

const icon_node: any = {
  id: createShapeId(`icon-node`),
  type: 'icon',
  x: 300,
  y: 150,
  props: {
    w: 24,
    h: 24,
    iconSet: 'Carbon',
    icon: 'MachineLearningModel',
  }
};

const initialShapes: TLShape[] = [
  box_1,
  box_2,
  icon_node,
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
      <Flow assetUrls={customIcons} initialShapes={initialShapes} />
    </div>
  )
};
export default FlowPage;
