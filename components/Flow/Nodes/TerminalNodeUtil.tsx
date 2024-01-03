'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import {
  HTMLContainer,
  SvgExportContext,
  TLBaseShape,
  useIsEditing,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { CodeLanguage, EditingIndicator, IconSetCache, Terminal, codeLanguages } from '@/components';
import { FlowNodeUtil } from './FlowNodeUtil';
import { filterObjectByKeys } from '@/utils';

export type TerminalNode = TLBaseShape<
  'terminal',
  {
    w: number;
    h: number;
    language: CodeLanguage;
    text: string;
    wrapLongLines?: boolean;
    showLineNumbers?: boolean;
  }
>;

export class TerminalNodeUtil extends FlowNodeUtil<TerminalNode> {
  static override type = 'terminal' as const;
  override canScroll = () => true;

  getDefaultProps(): TerminalNode['props'] {
    return {
      w: 300,
      h: 200,
      language: 'python',
      text: 'print("Hello World!")',
      wrapLongLines: true,
      showLineNumbers: true,
    };
  }

  component(node: TerminalNode) {
    const isEditing = useIsEditing(node.id);
    return (
      <HTMLContainer id={node.id} className="tl-embed-container w-auto h-auto overflow-hidden cursor-pointer" style={{pointerEvents: isEditing ? 'auto' : 'none'}}>
        <Terminal editable showLineNumbers={node.props.showLineNumbers} wrapLongLines={node.props.wrapLongLines} language={node?.props?.language} code={node.props.text} className="h-full w-full" />
        <EditingIndicator isEditing={isEditing} />
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
      <div className='relative p-1 flex gap-1 w-full h-full justify-center items-center text-primary text-xs overflow-hidden'>
        <IconSetCache.Carbon.Terminal className="h-auto" /> Terminal
      </div>
    );
  }

  getSchema(node: TerminalNode) {
    const baseSchema = super.getSchema(node);
    const baseSchemaProps = filterObjectByKeys(baseSchema.props.fields, Object.keys(node.props));
    return {
      ...baseSchema,
      props: yup.object().shape({
        ...baseSchemaProps,
        language: yup.string().oneOf(codeLanguages, 'Invalid Language').meta({ item: 'select' }),
      }).meta({ item: 'object' }),
    }
  }
}
