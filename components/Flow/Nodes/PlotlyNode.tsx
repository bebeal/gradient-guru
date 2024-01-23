'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import { HTMLContainer, TLBaseShape, useIsEditing } from '@tldraw/tldraw';
import { PlotType } from 'plotly.js-dist-min';
import * as yup from 'yup';
import { EditingIndicator, IconSetCache, Plotly } from '@/components';
import { filterObjectByKeys } from '@/utils';
import { FlowNodeUtil } from './FlowNode';


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
	override canScroll = () => true;

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
    // - Isn't responsive to width/height changes, so we need to re-render it when the node is resized, which is done hackily right now by setting those properties as the key
    // - Doesn't respect pointer-events: none of the container, so we need to change the plot to static when not editing
    return (
      <HTMLContainer id={node.id} className="relative tl-embed-container flex justify-center items-center w-auto h-auto overflow-hidden text-xs cursor-auto">
        <Plotly key={`${node.props.w}-${node.props.h}-${isEditing ? 'editable' : 'static'}`} data={linePlotData} config={{ staticPlot: !isEditing }} style={{width: node.props.w, height: node.props.h}} />
        <EditingIndicator isEditing={isEditing} />
      </HTMLContainer>
    );
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
        ...baseSchemaProps,
      }).meta({ item: 'object' }),
    }
  }
}