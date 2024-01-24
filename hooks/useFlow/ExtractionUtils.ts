import { TLShapeId, TLShape, Box, SVG_PADDING, TLEventInfo } from "@tldraw/tldraw";
import * as yup from 'yup';
import { UiState } from "@/hooks";
import { PreviewNode } from "@/components";

type BaseExtractorConfig = {
  enabled: boolean;
};

const imageTypes = ['svg', 'png', 'jpeg', 'webp'] as const;
type ImageType = typeof imageTypes[number];

const imageSmoothingQualities = ['low', 'medium', 'high'] as const;
type ImageSmoothingQuality = typeof imageSmoothingQualities[number];

export type ImageExtractorConfig = BaseExtractorConfig & {
  type: ImageType;
  quality: number;
  scale: number;
  background: boolean;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
  padding?: number;
  preserveAspectRatio?: React.SVGAttributes<SVGSVGElement>['preserveAspectRatio'];
  bounds?: Box;
  nodesToExclude: TLShapeId[];
  grid?: {
    enabled: boolean;
    size: number;
    color: string;
    labels: boolean;
  };
};

type NodeProperties = { enabled: boolean; properties: Record<keyof TLShape, boolean> };
export type NodesExtractorConfig = BaseExtractorConfig & {
  nodePropertiesToExtract: Record<TLShapeId, NodeProperties>;
};

export type TextExtractorConfig = BaseExtractorConfig & {
  nodesToExclude: TLShapeId[];
};

export type CanvasStateExtractorConfig = BaseExtractorConfig & {
  canvasPropertiesToExtract?: Record<string, boolean>;
};

export type UiStateExtractorConfig = BaseExtractorConfig & {
  uiPropertiesToExtract?: Record<string, boolean>;
};

export const ImageSchemaFields = {
  enabled: yup.boolean().meta({ item: 'switch' }),
  type: yup.string().oneOf(['svg', 'png', 'jpeg', 'webp']).meta({ item: 'select' }),
  quality: yup.number().min(0).max(1).meta({ item: 'slider', step: 0.1 }),
  scale: yup.number().min(0).max(1).meta({ item: 'slider', step: 0.1 }),
  background: yup.boolean().meta({ item: 'checkbox', label: 'Background' }),
  imageSmoothingEnabled: yup.boolean().meta({ item: 'checkbox', label: 'Image Smoothing' }),
  imageSmoothingQuality: yup.string().oneOf(['low', 'medium', 'high']).meta({ item: 'select', label: 'Image Smoothing Quality' }),
  padding: yup.number().min(0).max(100).meta({ item: 'slider', step: 1 }),
  grid: yup.object().shape({
    enabled: yup.boolean().meta({ item: 'switch', label: 'Enabled' }),
    size: yup.number().min(0).max(100).meta({ item: 'slider', step: 1 }),
    color: yup.string().meta({ item: 'color' }),
    labels: yup.boolean().meta({ item: 'checkbox', label: 'Grid Labels' }),
  }).meta({ item: 'object', label: 'Grid' }),
};

export const defaultImageExtractorConfig: ImageExtractorConfig = {
  enabled: true,
  nodesToExclude: [],
  type: 'png',
  quality: 0.8,
  scale: 1,
  background: true,
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'high',
  padding: SVG_PADDING,
  preserveAspectRatio: 'none',
  bounds: undefined,
  grid: {
    enabled: true,
    size: 100,
    color: 'red',
    labels: true,
  },
};

export const defaultNodePropertiesToIgnore: (keyof TLShape)[] = ['typeName', 'index', 'meta', 'isLocked'];
export const defaultNodesExtractorConfig: NodesExtractorConfig = {
  enabled: false,
  nodePropertiesToExtract: {},
};

export const defaultTextExtractorConfig: TextExtractorConfig = {
  enabled: true,
  nodesToExclude: [],
};

export const defaultCanvasExtractorConfig: CanvasStateExtractorConfig = {
  enabled: false,
  canvasPropertiesToExtract: {} as Record<keyof TLEventInfo, boolean>,
};

export const defaultUiExtractorConfig: UiStateExtractorConfig = {
  enabled: false,
  uiPropertiesToExtract: {} as Record<keyof UiState, boolean>,
};

export type ExtractorConfigs = {
  imageExtractorConfig: ImageExtractorConfig;
  nodesExtractorConfig: NodesExtractorConfig;
  textExtractorConfig: TextExtractorConfig;
  canvasExtractorConfig: CanvasStateExtractorConfig;
  uiExtractorConfig: UiStateExtractorConfig;
};

export type ExtractedState = ExtractorConfigs & {
  nodes: TLShape[] | null;
  svg: SVGSVGElement | null;
  base64EncodedSvg: string | null;
  blob: Blob | null;
  dataUrl: string | Blob | null;
  text: string[] | null;
  canvasState: Partial<TLEventInfo> | null;
  uiState: Partial<UiState> | null
  theme?: 'dark' | 'light';
  previousPreviews: PreviewNode[];
};

export type ContentExtractorConfig = ExtractorConfigs & {
  setExtractorConfig: (type: keyof ExtractorConfigs, config: Partial<ExtractorConfigs[keyof ExtractorConfigs]>) => void;
};

export const ImageSchema = yup.object().shape({
  type: ImageSchemaFields['type'],
  quality: ImageSchemaFields['quality'],
  scale: ImageSchemaFields['scale'],
  imageSmoothingEnabled: ImageSchemaFields['imageSmoothingEnabled'],
  imageSmoothingQuality: ImageSchemaFields['imageSmoothingQuality'],
  background: ImageSchemaFields['background'],
  grid: ImageSchemaFields['grid'],
});
