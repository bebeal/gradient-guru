'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import {
  HTMLContainer,
  SvgExportContext,
  TLBaseShape,
  useIsEditing,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { CodeLanguage, IconSetCache, Terminal, codeLanguages } from '@/components';
import { FlowNodeUtil } from './FlowNodeUtil';

export type TerminalNode = TLBaseShape<
  'terminal',
  {
    w: number;
    h: number;
    language: CodeLanguage;
    text: string;
  }
>;

export class TerminalNodeUtil extends FlowNodeUtil<TerminalNode> {
  static override type = 'terminal' as const;
	override canEdit = () => true
	override isAspectRatioLocked = (node: TerminalNode) => false
	override canResize = (node: TerminalNode) => true
	override canBind = (node: TerminalNode) => false
	override canUnmount = () => false

  getDefaultProps(): TerminalNode['props'] {
    return {
      w: 500,
      h: 450,
      language: 'Python',
      text: 'print("Hello World!")',
    };
  }

  component(node: TerminalNode) {
    const isEditing = useIsEditing(node.id);
    // TODO: fix this shit plotly component
    // - Isn't responsive to width/height changes, so we need to re-render it when the node is resized, which is why those properties are included in the key
    // - Doesn't respect pointer-events: none of the container, so we need to change the plot to static when not editing
    return (
      <HTMLContainer id={node.id} className="w-auto h-auto overflow-hidden z-[500]" style={{pointerEvents: isEditing ? 'auto' : 'none'}}>
        <Terminal language={node?.props?.language} code={node.props.text} />
      </HTMLContainer>
    );
  }

  override toSvg = (node: TerminalNode, ctx: SvgExportContext): SVGElement => {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', `${node.props.w}`);
    svgElement.setAttribute('height', `${node.props.h}`);
    return svgElement;
  }

  indicator(node: TerminalNode) {
    return <rect width={node.props.w} height={node.props.h} />;
  }


  panelPreview(node: TerminalNode) {
    return (
      <HTMLContainer className='p-1 flex flex-col gap-1 w-full h-auto justify-center items-center text-primary text-lg'>
        <div>Terminal</div>
        <IconSetCache.Carbon.Terminal className="h-auto" />
      </HTMLContainer>
    );
  }

  getSchema(node: TerminalNode) {
    const baseSchema = super.getSchema(node);
    return {
      props: yup.object({
        ...baseSchema.props.fields,
        language: yup.string().oneOf(codeLanguages, 'Invalid Language').meta({ item: 'select' }),
      }).meta({ item: 'object' }),
    };
  }
}
