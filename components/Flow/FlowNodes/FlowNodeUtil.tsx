'use client'

import * as yup from 'yup';
import { BaseBoxShapeUtil, TLBaseBoxShape } from "@tldraw/tldraw";
import { NodeSchemaMappings } from '@/components';

export abstract class FlowNodeUtil<Shape extends TLBaseBoxShape> extends BaseBoxShapeUtil<Shape> {
  // each node can define its own schema
  getSchema(node: Shape): yup.AnyObject {
    return NodeSchemaMappings;
  }

  // this determines what is shown in the scratchpad for this node
  panelPreview(node: Shape) {
    return this.component(node);
  }
}
