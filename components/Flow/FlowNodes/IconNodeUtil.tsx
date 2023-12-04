'use client'
import {
  HTMLContainer,
  Rectangle2d,
  SvgExportContext,
  TLBaseShape,
  TLOnResizeHandler,
  getDefaultColorTheme,
  resizeBox,
} from '@tldraw/tldraw';
import { getFillDefForExport } from '@tldraw/tldraw/src/lib/shapes/shared/defaultStyleDefs';
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
      iconSet: 'Custom',
      icon: 'CPU',
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
    const Icon = IconSetCache?.[node.props.iconSet]?.[node.props.icon];
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
    const iconComponent = <Icon width={node.props.w} height={node.props.h} xmlns='http://www.w3.org/2000/svg' />;
    const { children, ...restProps } = iconComponent.props;
    // Render the Icon component to markup string
    const svgString = ReactDOMServer.renderToStaticMarkup(iconComponent);
    // Parse the string to an SVGElement
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDocument.documentElement;

		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
		ctx.addExportDef(getFillDefForExport('solid', theme))
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

    // Ensure that the parsed element is an SVGElement
    if (!(svgElement instanceof SVGElement)) {
      throw new Error('Parsed element is not an SVGElement');
    }

    // Return the SVG element
    return svgElement;
  }

  getSchema(node: IconNode) {
    return {
      props: yup.object({
        'w': yup.number().min(0).label('Width').meta({ type: 'input', disabled: false }),
        'h': yup.number().min(0).label('Height').meta({ type: 'input', disabled: false }),
        'iconSet': yup.string().oneOf(Object.keys(IconSetCache)).label('Set').meta({ type: 'select', disabled: false }),
        'icon': yup.string().oneOf(Object.keys(IconSetCache?.[node.props.iconSet])).label('Icon').meta({ type: 'select', disabled: false }),
      }).meta({ type: 'object', disabled: false }),
    };
  }
}
