
'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import {
  HTMLContainer,
  SvgExportContext,
  TLBaseShape,
  useIsEditing,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { IconSetCache, TipTap } from '@/components';
import { FlowNodeUtil } from './FlowNodeUtil';
import { filterObjectByKeys } from '@/utils';

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
      w: 650,
      h: 550,
      text: '',
    };
  }

  component(node: TipTapNode) {
    const isEditing = useIsEditing(node.id);
    return (
      <HTMLContainer id={node.id} className="tl-embed-container flex justify-center items-center w-auto h-auto overflow-hidden z-[500] cursor-auto text-xs" style={{pointerEvents: isEditing ? 'auto' : 'none'}}>
        <TipTap autofocus={true} content={node.props.text} />
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: isEditing ? -40 : 0,
            padding: 4,
            fontFamily: 'inherit',
            fontSize: 12,
            left: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              background: 'var(--color-panel)',
              padding: '4px 12px',
              borderRadius: 99,
              border: '1px solid var(--color-muted-1)',
            }}
          >
            {isEditing ? 'Click the canvas to exit' : 'Double click to interact'}
          </span>
        </div>
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
