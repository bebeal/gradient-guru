
import {
  HTMLContainer,
  Rectangle2d,
  TLBaseShape,
  TLOnResizeHandler,
  resizeBox,
} from '@tldraw/tldraw';
import * as yup from 'yup';
import { IconSetCache, SetNames } from '@/components';
import { FlowNodeUtil } from './shared';

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

  getSchema(node: IconNode) {
    return {
      props: yup.object({
        'w': yup.number().min(0).label('Width').meta({ type: 'input', disabled: false }),
        'h': yup.number().min(0).label('Height').meta({ type: 'input', disabled: false }),
        'iconSet': yup.string().oneOf(Object.keys(IconSetCache)).label('Set').meta({ type: 'select', disabled: false }),
        'icon': yup.string().oneOf(Object.keys(IconSetCache?.[node.props.iconSet])).label('Icon').meta({ type: 'select', disabled: false }),
      }).meta({ type: 'object', disabled: false }),
    };
  };
}
