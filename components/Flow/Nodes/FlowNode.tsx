'use client'

import { toPng } from "html-to-image";
import * as yup from 'yup';
import { BaseBoxShapeUtil, SvgExportContext, TLBaseBoxShape } from "@tldraw/tldraw";
import { NodeSchemaMappings } from '@/components';

export abstract class FlowNodeUtil<Shape extends TLBaseBoxShape> extends BaseBoxShapeUtil<Shape> {
  override canEdit = () => true
	override isAspectRatioLocked = (node: Shape) => false
	override canResize = (node: Shape) => true
	override canBind = (node: Shape) => false
	override canUnmount = () => false

  indicator(node: Shape) {
    return <rect width={node.props.w} height={node.props.h} />;
  }

  // each node can define its own schema
  getSchema(node: Shape): yup.AnyObject {
    return NodeSchemaMappings;
  }

  // panelPreview what is shown in the ScratchPad for this node
  // Default to render the node itself which is present on the canvas
  panelPreview(node: Shape) {
    return this.component(node);
  }

  // toSvg determines what is shown in exported images for this node
  // Default to screenshotting the node and embedding it as an image in the SVG since SVGElement is the required return type
  toSvg(node: Shape, ctx: SvgExportContext): SVGElement | Promise<SVGElement> {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const element = document.getElementById(node.id)!;
    return new Promise((resolve, _) => { 
      if (window === undefined) return resolve(g);
      toPng(element, { quality: 1, cacheBust: true }).then(dataUrl => {
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl);
        image.setAttribute('width', node.props.w.toString());
        image.setAttribute('height', node.props.h.toString());
        g.appendChild(image);
        resolve(g);
      }).catch(err => {
        console.log(`Error in toSvg while converting node ${node.id} to image via html-to-image: `, err);
        resolve(g);
      });
    });
  }
}
