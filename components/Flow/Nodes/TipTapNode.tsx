'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import { HTMLContainer, SvgExportContext, TLBaseShape, useIsEditing } from '@tldraw/tldraw';
import * as yup from 'yup';
import { EditingIndicator, IconSetCache, TipTap } from '@/components';
import { filterObjectByKeys } from '@/utils';
import { FlowNodeUtil } from './FlowNode';


export type TipTapNode = TLBaseShape<
  'tiptap',
  {
    w: number;
    h: number;
    text: string;
  }
>;

export class TipTapNodeUtil extends FlowNodeUtil<TipTapNode> {
  static override type = 'tiptap' as const;
  override canScroll = () => true;

  getDefaultProps(): TipTapNode['props'] {
    return {
      w: 385,
      h: 300,
      text: '',
    };
  }

  component(node: TipTapNode) {
    const isEditing = useIsEditing(node.id);
    return (
      <HTMLContainer id={node.id} className="relative tl-embed-container flex justify-center items-center w-auto h-auto overflow-hidden text-xs cursor-auto" >
        <TipTap content={node.props.text} />
        <EditingIndicator isEditing={isEditing} />
      </HTMLContainer>
    );
  }

  override toSvg = (node: TipTapNode, ctx: SvgExportContext): SVGElement => {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', `${node.props.w}`);
    svgElement.setAttribute('height', `${node.props.h}`);
    return svgElement;
  }

  indicator(node: TipTapNode) {
    return <rect width={node.props.w} height={node.props.h} />;
  }


  panelPreview(node: TipTapNode) {
    return (
      <div className='relative p-1 flex flex-col gap-1 w-full h-full justify-center items-center text-primary text-base overflow-hidden'>
        <IconSetCache.Logos.TipTap className="w-full h-auto px-2" />
      </div>
    );
  }

  getSchema(node: TipTapNode) {
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