'use client'
import { BaseBoxShapeTool } from "@tldraw/editor";

export class IconNodeTool extends BaseBoxShapeTool {
  static override id = 'icon';
  static override initial = 'idle';
  override shapeType = 'icon';
}
