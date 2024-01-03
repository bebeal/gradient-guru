'use client';

import { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Box2d, compact, createShapeId, DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultHorizontalAlignStyle, DefaultSizeStyle, DefaultVerticalAlignStyle, EASINGS } from '@tldraw/editor';
import { Editor, GeoShapeGeoStyle, TLShape } from '@tldraw/tldraw';
import { FONT_FAMILIES } from '@tldraw/tldraw/src/lib/shapes/shared/default-shape-constants';
import { DefaultLabelColorStyle } from '@tldraw/tlschema/src/styles/TLColorStyle';
import * as yup from 'yup';
import { Form, Label, Separator, Switch } from '@/components';
import { cn, isEmptyObject } from '@/utils';
import { PreviewNode } from '../Nodes/PreviewNode/PreviewNode';


export const KeysToMakereadOnly: string[] = ['type'] as const;
export const KeysToIgnore: string[] = ['index', 'typeName', 'meta'] as const;

// global schema mappings for all nodes to use
export const NodeSchemaMappings: any = {
  x: yup.number().meta({ item: 'input', label: 'x' }),
  y: yup.number().meta({ item: 'input', label: 'y' }),
  rotation: yup.number().meta({ item: 'input', label: 'Rotation' }),
  isLocked: yup.boolean().label('Locked').meta({ item: 'checkbox', label: 'Locked' }),
  opacity: yup.number().min(0.0).max(1.0).meta({ item: 'input', label: 'Opacity' }),
  id: yup.string().meta({ item: 'readOnly', label: 'ID' }),
  parentId: yup.string().meta({ item: 'readOnly', label: 'Parent ID' }),
  props: yup
    .object()
    .shape({
      font: yup.string().oneOf(Object.keys(FONT_FAMILIES)).meta({ item: 'select', label: 'Font' }),
      size: yup.string().oneOf(DefaultSizeStyle.values).meta({ item: 'select', label: 'Size' }),
      fill: yup.string().oneOf(DefaultFillStyle.values).meta({ item: 'select', label: 'Fill' }),
      align: yup.string().oneOf(DefaultHorizontalAlignStyle.values).meta({ item: 'select', label: 'Align' }),
      verticalAlign: yup.string().oneOf(DefaultVerticalAlignStyle.values).meta({ item: 'select', label: 'Vertical Align' }),
      dash: yup.string().oneOf(DefaultDashStyle.values).meta({ item: 'select', label: 'Dash' }),
      color: yup.string().oneOf(DefaultColorStyle.values).meta({ item: 'select', label: 'Color' }),
      labelColor: yup.string().oneOf(DefaultLabelColorStyle.values).meta({ item: 'select', label: 'Label Color' }),
      geo: yup.string().oneOf(GeoShapeGeoStyle.values).meta({ item: 'select', label: 'Geo', hidden: true }),
      w: yup.number().meta({ item: 'input', label: 'Width' }),
      h: yup.number().meta({ item: 'input', label: 'Height' }),
      url: yup.string().meta({ item: 'input', label: 'URL' }),
      text: yup.string().meta({ item: 'input', label: 'Text' }),
    })
    .meta({ item: 'object', label: 'Props' }),
};
KeysToMakereadOnly.forEach((key) => {
  NodeSchemaMappings[key] = yup.string().meta({ item: 'readOnly' });
});

export const formatNodeId = (id: string) => {
  return id.replace(/^shape:/, '');
};

export const getNodeId = (node: TLShape) => {
  return formatNodeId(node.id);
};

export const getNodeName = (node: TLShape) => {
  return `[${node.type}] - ${getNodeId(node)}`;
};

export const getNodeNameComponent = (node: TLShape, className: string = '') => {
  return (
    <div className={cn('flex justify-between items-center w-full gap-2', className)}>
      <div className="text-right flex-1">[{node.type}]</div>
      <div className="text-center w-auto">-</div>
      <div className="text-left flex-1">{getNodeId(node)}</div>
    </div>
  );
};

export const makeEmptyResponseShape = (editor: Editor) => {
  // Create the preview shape
  const { maxX = 0, midY = 0 }: any = editor.getCurrentPageBounds();
  const newShapeId = createShapeId();
  editor.createShape<PreviewNode>({
    id: newShapeId,
    type: 'preview',
    x: maxX + 60, // to the right of the selection
    y: midY - (540 * 2) / 3 / 2, // half the height of the preview's initial shape
    props: { html: '', source: '' },
  });
  return newShapeId;
};

export const zoomToFitNewNode = (editor: Editor, animation: any = { duration: 200, easing: EASINGS.easeInOutQuad }, padding: number = 100) => {
  if (!editor.getInstanceState().canMoveCamera) return this;

  const ids = [...editor.getCurrentPageShapeIds()];
  if (ids.length <= 0) return this;

  const pageBounds = Box2d.Common(compact(ids.map((id) => editor.getShapePageBounds(id))));
  const currentBounds = editor.getCurrentPageBounds();
  pageBounds.x = Math.min(pageBounds.x, currentBounds?.x || pageBounds.x);
  pageBounds.y = Math.min(pageBounds.y, currentBounds?.y || pageBounds.y);
  // dont decrease the size of the page ever
  pageBounds.width = Math.max(pageBounds.width, currentBounds?.width || pageBounds.width);
  pageBounds.height = Math.max(pageBounds.height, currentBounds?.height || pageBounds.height);
  // add some padding
  pageBounds.x -= padding;
  pageBounds.y -= padding;
  pageBounds.width += padding * 2;
  pageBounds.height += padding * 2;

  editor.zoomToBounds(pageBounds, undefined, animation);
};

export const EditingIndicator = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        position: 'absolute',
        bottom: isEditing ? -40 : 0,
        padding: 4,
        fontFamily: 'inherit',
        fontSize: 12,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          background: 'var(--color-panel)',
          padding: '4px 12px',
          borderRadius: 99,
          border: '1px solid var(--color-muted-1)',
        }}
      >
        {isEditing ? 'Click the canvas to exit' : 'Double click to interact'}
      </span>
    </div>
  );
};

export const TabClasses = `w-full h-full flex flex-col p-2 gap-2`;

export const TabTitle = ({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  const titleText: string = title || children || '';
  return (
    <div className={cn('flex flex-col w-full gap-1 justify-center items-center text-base', className)}>
      <div className="text-primary font-bold w-auto h-auto flex justify-center items-center gap-1">{titleText}</div>
      <Separator />
    </div>
  );
};

export const FlowTab = memo(({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  return (
    <div className={cn(TabClasses)}>
      <TabTitle title={title} />
      <div className={cn('p-2 pt-0 flex flex-col w-full h-auto items-center gap-1', className)}>{children}</div>
    </div>
  );
});

export const Title = ({ children, className }: { children?: any; className?: string }) => {
  return <div className={cn('flex w-auto h-auto font-bold justify-center text-center items-center gap-2', className)}>{children}</div>;
};

export const BulletedList = ({ items, className }: { items: any[]; className?: string }) => {
  const getItem = (item: any): ReactNode => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item) && !isEmptyObject(item)) {
      const key: any = Object.keys(item)[0]; // Define a more specific type if possible
      const value = item[key];
      return (
        <div className={cn('flex flex-col', className)}>
          <Label className="text-xs text-primary font-bold">{key}</Label>
          <Form object={value} readOnly={true} className="p-1" />
        </div>
      );
    } else {
      return item;
    }
  };

  return (
    <ul role="list" className="relative w-full h-auto break-words pl-6 pr-2 py-2 list-inside pointer-events-auto">
      {items.map((item, index: number) => {
        return (
          <li key={`ui-event-${index}`} className="relative flex items-center m-0 p-0 before:content-['\2022'] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:text-primary before:text-md select-text cursor-text">
            {getItem(item)}
          </li>
        );
      })}
    </ul>
  );
};

export const ToggleTitle = ({ pressed, onPressedChange, children }: any) => {
  return (
    <div className={cn(`pointer-events-auto relative flex h-full w-full justify-center gap-3 items-center`)}>
      <Switch pressed={pressed} onPressedChange={onPressedChange} className="absolute left-1 scale-95">
        <div />
      </Switch>
      <div className="font-bold justify-self-center text-sm ml-10 mr-6">{children}</div>
    </div>
  );
};

export const ImageWithSizeIndicator: React.FC<{ src: string }> = ({ src }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  type Size = { width: number; height: number };
  const [size, setSize] = useState<{ natural: Size; offset: Size }>({ natural: { width: 0, height: 0 }, offset: { width: 0, height: 0 } });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateSize = useCallback(() => {
    if (imgRef.current) {
      setSize({
        natural: {
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        },
        offset: {
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight,
        },
      });
      setPosition({
        x: imgRef.current.offsetLeft,
        y: imgRef.current.offsetTop,
      });
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-secondary p-2 rounded border border-primary">
      <div className={cn(`relative flex items-center justify-center w-auto h-auto overflow-hidden`)} style={{ padding: `${24}px ${44}px` }}>
        {/* Horizontal Size Indicator */}
        <div className={cn('absolute flex flex-col items-center')} style={{ width: `${size?.offset?.width}px`, height: `${24}px`, top: 0, left: `${position?.x}px` }}>
          <span className="text-white text-xs flex justify-center">{size?.natural?.width}px</span>
          <div className="flex flex-row w-full items-center mt-px">
            <div className="h-[8px] w-[1px] bg-white" />
            <div className="h-[1px] bg-white" style={{ width: 'calc(100% - 2px)' }} />
            <div className="h-[8px] w-[1px] bg-white" />
          </div>
        </div>
        <img ref={imgRef} src={src} onLoad={updateSize} className="object-cover object-center w-auto h-auto border border-primary" alt="Preview of Image Extraction" />
        {/* Vertical Size Indicator */}
        <div className={cn('absolute flex flex-row justify-center items-start')} style={{ height: `${size?.offset?.height}px`, width: `${48}px`, top: `${position?.y}px`, left: `${position?.x + size?.offset?.width - 1}px` }}>
          <div className="flex flex-col w-auto h-full items-center mr-px">
            <div className="w-[8px] h-[1px] bg-white" />
            <div className="w-[1px] bg-white" style={{ height: 'calc(100% - 2px)' }} />
            <div className="w-[8px] h-[1px] bg-white" />
          </div>
          <span className="text-white text-xs h-full flex items-center justify-center">{size?.natural?.height}px</span>
        </div>
      </div>
    </div>
  );
};