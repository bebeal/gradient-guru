'use client'

import * as yup from 'yup';
import { BaseBoxShapeUtil, TLBaseBoxShape } from "@tldraw/tldraw";

export abstract class FlowNodeUtil<Shape extends TLBaseBoxShape> extends BaseBoxShapeUtil<Shape> {
  // each node can define its own schema
  getSchema(node: Shape): yup.AnyObject {
    return {
      props: yup.object({
        'w': yup.number().min(0).label('Width').meta({ item: 'input' }),
        'h': yup.number().min(0).label('Height').meta({ item: 'input' }),
      }).meta({ item: 'object' }),
    };
  }

  // this determines what is shown in the scratchpad for this node
  panelPreview(node: Shape) {
    return this.component(node);
  }
}
