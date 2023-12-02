'use client'
import { ShapeUtil, TLUnknownShape } from "@tldraw/tldraw";

// each node can define its own schema
export abstract class FlowNodeUtil<Shape extends TLUnknownShape = TLUnknownShape> extends ShapeUtil<Shape> {
  abstract getSchema(node: Shape): any;
}
