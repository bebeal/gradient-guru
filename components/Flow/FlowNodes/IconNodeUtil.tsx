'use client'
import {
  HTMLContainer,
  Rectangle2d,
  SvgExportContext,
  TLBaseShape,
  TLOnResizeHandler,
  resizeBox,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { IconSetCache, SetNames } from '@/components';
import { FlowNodeUtil } from './FlowNodeUtil';
import ReactDOMServer from 'react-dom/server';

export type IconNode = TLBaseShape<
  'icon',
  {
    w: number;
    h: number;
    iconSet: SetNames;
    icon: string;
  }
>;

export class IconNodeUtil extends FlowNodeUtil<IconNode> {
  static override type = 'icon' as const;
  override isAspectRatioLocked = (node: IconNode) => false;
  override canResize = (node: IconNode) => true;
  override canBind = (node: IconNode) => true;

  getDefaultProps(): IconNode['props'] {
    return {
      w: 32,
      h: 32,
      iconSet: 'Carbon',
      icon: 'MachineLearning',
    };
  }

  getGeometry(node: IconNode) {
    return new Rectangle2d({
      width: node.props.w,
      height: node.props.h,
      isFilled: true,
    });
  }

  // Render method — the React component that will be rendered for the shape
  component(node: IconNode) {
    let Icon = IconSetCache?.[node.props.iconSet]?.[node.props.icon];
    if (!Icon) {
      node.props.icon = Object.keys(IconSetCache?.[node.props.iconSet])[0];
      Icon = IconSetCache?.[node.props.iconSet]?.[node.props.icon];
    }
    return (
      <HTMLContainer id={node.parentId}>
        {Icon && <Icon width="100%" height="100%" />}
      </HTMLContainer>
    );
  }

  indicator(node: IconNode) {
    return <rect width={node.props.w} height={node.props.h} />;
  }

  override onResize: TLOnResizeHandler<IconNode> = (node, info) => {
    return resizeBox(node, info);
  };

  override toSvg = (node: IconNode, ctx: SvgExportContext): Promise<SVGElement> | SVGElement => {
    const Icon = IconSetCache?.[node.props.iconSet]?.[node.props.icon];
    if (!Icon) {
      // return dummy svg element
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('width', `${node.props.w}`);
      svgElement.setAttribute('height', `${node.props.h}`);
      return svgElement;
    }
    const iconComponent = <Icon width={node.props.w} height={node.props.h} xmlns='http://www.w3.org/2000/svg' />;
    // Render the Icon component to markup string
    const svgString = ReactDOMServer.renderToStaticMarkup(iconComponent);
    // Parse the string to an SVGElement
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement: any = svgDocument.documentElement;

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();

    // check fill property
    const fill = svgElement.getAttribute('fill');
    if (fill === 'currentColor') {
      svgElement.setAttribute('fill', `rgb(${primaryColor})`);
    }

    const stroke = svgElement.getAttribute('stroke');
    if (stroke === 'currentColor') {
      svgElement.setAttribute('stroke', `rgb(${primaryColor})`);
    }

    // Return the SVG element
    return svgElement;
  }

  panelPreview(node: IconNode) {
    const Icon = <IconSetCache.Carbon.MachineLearning width="100%" height="100%" />;
    return (
      <HTMLContainer id={node.parentId} className='p-1'>
        {Icon}
      </HTMLContainer>
    );
  }

  getSchema(node: IconNode) {
    return {
      props: yup.object({
        'w': yup.number().min(0).label('Width').meta({ item: 'input' }),
        'h': yup.number().min(0).label('Height').meta({ item: 'input' }),
        'iconSet': yup.string().oneOf(Object.keys(IconSetCache)) .label('Set') .meta({ item: 'select' }),
        'icon': yup.string().oneOf(Object.keys(IconSetCache?.[node.props.iconSet]), "Invalid Icon").label('Icon').meta({ item: 'select' }),
      }).meta({ item: 'object' }),
    };
  }
}
