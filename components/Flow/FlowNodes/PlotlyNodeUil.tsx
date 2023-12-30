'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import {
  HTMLContainer,
  SvgExportContext,
  TLBaseShape,
  useIsEditing,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { IconSetCache, Plotly } from '@/components';
import { FlowNodeUtil } from './FlowNodeUtil';
import { PlotType } from 'plotly.js';
import { filterObjectByKeys } from '@/utils';

const linePlotData = [{
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 4, 8, 16] 
}];

export type PlotlyNode = TLBaseShape<
  'plotly',
  {
    w: number;
    h: number;
    type: PlotType;
  }
>;

export class PlotlyNodeUtil extends FlowNodeUtil<PlotlyNode> {
  static override type = 'plotly' as const;
	override canEdit = () => true
	override isAspectRatioLocked = (node: PlotlyNode) => false
	override canResize = (node: PlotlyNode) => true
	override canBind = (node: PlotlyNode) => false
	override canUnmount = () => false

  getDefaultProps(): PlotlyNode['props'] {
    return {
      w: 500,
      h: 450,
      type: 'scatter',
    };
  }

  component(node: PlotlyNode) {
    const isEditing = useIsEditing(node.id);
    // TODO: fix this shit plotly component
    // - Isn't responsive to width/height changes, so we need to re-render it when the node is resized, which is why those properties are included in the key
    // - Doesn't respect pointer-events: none of the container, so we need to change the plot to static when not editing
    return (
      <HTMLContainer id={node.id} className="w-auto h-auto overflow-hidden z-[500]" style={{pointerEvents: isEditing ? 'auto' : 'none'}}>
        <Plotly key={`${node.props.w}-${node.props.h}-${isEditing ? 'editable' : 'static'}`} data={linePlotData} config={{ staticPlot: !isEditing }} style={{width: node.props.w, height: node.props.h}} />
      </HTMLContainer>
    );
  }

  override toSvg = (node: PlotlyNode, ctx: SvgExportContext): SVGElement => {
    // Query for the SVG which has class 'main-svg'
    const svgNode = document.querySelector<SVGSVGElement>(`#${CSS.escape(node.id)} .main-svg`);
    if (!svgNode) {
      // Return a dummy SVG element if not found
      return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgNode);
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.innerHTML = svgString;
    return svgElement;
  }

  indicator(node: PlotlyNode) {
    return <rect width={node.props.w} height={node.props.h} />;
  }


  panelPreview(node: PlotlyNode) {
    return (
      <div className='relative p-1 flex gap-1 w-full h-full justify-center items-center text-primary text-base overflow-hidden'>
        <IconSetCache.Logos.Plotly className="h-auto" /> Plotly
      </div>
    );
  }

  getSchema(node: PlotlyNode) {
    const baseSchema = super.getSchema(node);
    const baseSchemaProps = filterObjectByKeys(baseSchema.props.fields, Object.keys(node.props));
    return {
      ...baseSchema,
      props: yup.object().shape({
        ...baseSchemaProps
      }).meta({ item: 'object' }),
    }
  }
}
