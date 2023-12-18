'use client';

import * as yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { create } from 'zustand'
import { Box2d, SVG_PADDING, TLEventInfo, TLShape, TLShapeId, useEditor } from '@tldraw/tldraw';
import { getExportedImageBlob, getSVGAsBlob, getSvgPreview } from '@/utils';
import { UiState, useContentRecorder } from './useContentRecorder';
import { getNodeName } from '@/components';

export type BaseExtractorConfig = {
  enabled: boolean;
};

export type ImageExtractorConfig = BaseExtractorConfig & {
  type: 'svg' | 'png' | 'jpeg' | 'webp';
  quality: number;
  scale: number;
  background: boolean;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: 'low' | 'medium' | 'high';
  padding?: number;
  preserveAspectRatio?: React.SVGAttributes<SVGSVGElement>['preserveAspectRatio'];
  bounds?: Box2d;
  nodesToExclude: TLShapeId[];
};

type NodeProperties = { enabled: boolean, properties: Record<keyof TLShape, boolean> };
export type JSONExtractorConfig = BaseExtractorConfig & {
  nodePropertiesToExtract: Record<TLShapeId, NodeProperties>;
};

export type TextExtractorConfig = BaseExtractorConfig & {
  nodesToExclude: TLShapeId[];
};

export type CanvasStateExtractorConfig = BaseExtractorConfig & {
  canvasPropertiesToExtract?: (keyof TLEventInfo)[];
};

export type UiStateExtractorConfig = BaseExtractorConfig & {
  uiPropertiesToExtract?: (keyof UiState)[];
};

// Initialize default configs for each extractor
export const defaultBaseConfig: BaseExtractorConfig = {
  enabled: false,
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
};

export const defaultImageExtractorConfig: ImageExtractorConfig = {
  ...defaultBaseConfig,
  nodesToExclude: [],
  type: 'png',
  quality: 1,
  scale: 1,
  background: true,
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'high',
  padding: SVG_PADDING,
  preserveAspectRatio: 'none',
  bounds: undefined,
};

export const defaultNodePropertiesToIgnore: (keyof TLShape)[] = ['typeName', 'index', 'meta', 'isLocked'];
export const defaultJSONExtractorConfig: JSONExtractorConfig = {
  ...defaultBaseConfig,
  nodePropertiesToExtract: {},
};

export const defaultTextExtractorConfig: TextExtractorConfig = {
  ...defaultBaseConfig,
  nodesToExclude: [],
};

export const defaultCanvasExtractorConfig: CanvasStateExtractorConfig = {
  ...defaultBaseConfig,
  canvasPropertiesToExtract: [],
};

export const defaultUiExtractorConfig: UiStateExtractorConfig = {
  ...defaultBaseConfig,
  uiPropertiesToExtract: [],
};

export type ExtractorConfigs = {
  imageExtractorConfig: ImageExtractorConfig;
  jsonExtractorConfig: JSONExtractorConfig;
  textExtractorConfig: TextExtractorConfig;
  canvasExtractorConfig: CanvasStateExtractorConfig;
  uiExtractorConfig: UiStateExtractorConfig;
};

export type ContentExtractorConfig = ExtractorConfigs & {
  setExtractorConfig: (type: keyof ExtractorConfigs, config: Partial<ExtractorConfigs[keyof ExtractorConfigs]>) => void;
};

export const useContentExtractorStore = create<ContentExtractorConfig>((set) => ({
  imageExtractorConfig: defaultImageExtractorConfig,
  jsonExtractorConfig: defaultJSONExtractorConfig,
  textExtractorConfig: defaultTextExtractorConfig,
  canvasExtractorConfig: defaultCanvasExtractorConfig,
  uiExtractorConfig: defaultUiExtractorConfig,
  setExtractorConfig: (type, config) => set(state => ({...state, [type]: {...state[type], ...config}})),
}));

export const useContentExtractor = () => {
  const [mounted, setMounted] = useState(false);
  const editor = useEditor();
  const { canvasState, uiState, onUiEvent } = useContentRecorder();
  const imageExtractorConfig = useContentExtractorStore(state => state.imageExtractorConfig);
  const jsonExtractorConfig = useContentExtractorStore(state => state.jsonExtractorConfig);
  const textExtractorConfig = useContentExtractorStore(state => state.textExtractorConfig);
  const canvasExtractorConfig = useContentExtractorStore(state => state.canvasExtractorConfig);
  const uiExtractorConfig = useContentExtractorStore(state => state.uiExtractorConfig);
  const setExtractorConfig = useContentExtractorStore(state => state.setExtractorConfig);

  const updateJSONExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const nodes = editor.getCurrentPageShapesSorted();
      const nodePropertiesToExtract = nodes.reduce((propertiesToExtract: any, node: any) => {
        const nodeKey = node.id.replace('shape:', '');
        const keys = Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[];
        const properties = prevState.jsonExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties || (
          keys?.reduce((nodeProperties: any, key) => {
            nodeProperties[key] = true;
            return nodeProperties;
          }, {})
        );
        const enabled = prevState.jsonExtractorConfig.nodePropertiesToExtract[nodeKey]?.enabled || false;
        propertiesToExtract[nodeKey] = { enabled, properties };
        return propertiesToExtract;
      }, {});

      return {
        ...prevState,
        jsonExtractorConfig: {
          ...prevState.jsonExtractorConfig,
          nodePropertiesToExtract,
        },
      }
    });
  }, [editor]);

  useEffect(() => {
    if (!mounted) {
      updateJSONExtractorConfig();
      setMounted(true);
    }
  }, [mounted, updateJSONExtractorConfig]);

  const getNodeIds = useCallback((nodesToExclude: TLShapeId[] = []): TLShapeId[] => {
      const nodeIds = Array.from(editor.getCurrentPageShapeIds());
      return nodeIds.filter((id) => !nodesToExclude.includes((id).replace('shape:', '') as TLShapeId));
  }, [editor]);

  const getNodes = useCallback((nodesToExclude: TLShapeId[] = []): TLShape[] => {
      const nodes = editor.getCurrentPageShapesSorted();
      return nodes.filter((node) => !nodesToExclude.includes((node.id).replace('shape:', '') as TLShapeId));
  }, [editor]);

  const extractImage = useCallback(async (): Promise<Blob | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageExtractorConfig.nodesToExclude);
    return await getExportedImageBlob(editor, nodesInImage, imageExtractorConfig);
  }, [editor, getNodeIds, imageExtractorConfig]);

  const getImagePreview = useCallback(async (): Promise<string | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageExtractorConfig.nodesToExclude);
    if (nodesInImage.length === 0) return null;
    const svgPreview = await getSvgPreview(editor, nodesInImage, imageExtractorConfig);
    return await getSVGAsBlob(svgPreview!);
  }, [editor, getNodeIds, imageExtractorConfig]);

  const getImageExtractorSchema = useCallback(() => {
    return yup.object().shape({
      type: ImageSchemaFields['type'],
      quality: ImageSchemaFields['quality'],
      scale: ImageSchemaFields['scale'],
      imageSmoothingEnabled: ImageSchemaFields['imageSmoothingEnabled'],
      imageSmoothingQuality: ImageSchemaFields['imageSmoothingQuality'],
      background: ImageSchemaFields['background'],
    });
  }, []);

  const extractJSON = useCallback(async (): Promise<TLShape[] | null> => {
    const nodesToExclude = (Object.keys(jsonExtractorConfig.nodePropertiesToExtract).filter((nodeId) => !jsonExtractorConfig.nodePropertiesToExtract[nodeId as TLShapeId].enabled) || []) as TLShapeId[];
    const nodes = getNodes(nodesToExclude);
    const json = nodes.map((node) => {
      const nodeKey = node.id.replace('shape:', '') as TLShapeId;
      const properties = jsonExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties || {};
      const nodeProperties = Object.entries(node).reduce((acc: any, [key, value]) => {
        if (properties?.[key as keyof TLShape]) {
          if (key === 'id') {
            acc['id'] = value.replace('shape:', '');
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});
  
      return nodeProperties;
    });

    return json;
  }, [getNodes, jsonExtractorConfig.nodePropertiesToExtract]);

  const getJSONExtractorSchema = useCallback(() => {
    const nodes = editor.getCurrentPageShapesSorted();
    const nodeSchema = nodes.reduce((acc: any, node: any) => {
      const nodeKey = node.id.replace('shape:', '');
      const keys = Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[] || [];
      
      // key -> yup boolean schema
      const properties = keys?.reduce((acc: any, key) => {
        acc[key] = yup.boolean().default(true).meta({ item: 'checkbox', label: key });
        return acc;
      }, {});
    
      // nodeKey -> yup object schema
      //    enabled: yup boolean schema
      //    properties: yup boolean schema for each key
      acc[nodeKey] = yup.object().shape({
        enabled: yup.boolean().default(false).meta({ item: 'checkbox', label: getNodeName(node) }),
        properties: yup.object().shape(properties).meta({ item: 'object', label: `${nodeKey} Properties` }),
      }).meta({ item: 'node-schema' });
    
      return acc;
    }, {});
  
    return yup.object().shape({
      ...nodeSchema,
    }).meta({ item: 'object' });
  }, [editor]);

  const extractText = useCallback((): string[] => {
    const nodeIds = getNodeIds(textExtractorConfig.nodesToExclude);
    const nodeDescendantIds = editor.getShapeAndDescendantIds(nodeIds);
    const text = Array.from(nodeDescendantIds)
      .map((id) => {
        const shape = editor.getShape(id);
        if (!shape) return null;
        if (shape.type === 'text' || shape.type === 'geo' || shape.type === 'arrow' || shape.type === 'note') {
          // @ts-expect-error
          return shape.props.text;
        }
        return null;
      })
      .filter((v) => v !== null && v !== '');
    return text;
  }, [editor, getNodeIds, textExtractorConfig.nodesToExclude]);

  const getTextExtractorSchema = useCallback(() => {
    return yup.object().shape({
    });
  }, []);

  const extractCanvasState = useCallback((): TLEventInfo => {
    return canvasExtractorConfig.canvasPropertiesToExtract?.reduce((acc, key) => {
      acc[key] = canvasState[key];
      return acc;
    }, {} as any);
  }, [canvasExtractorConfig.canvasPropertiesToExtract, canvasState]);
  
  const getCanvasStateExtractorSchema = useCallback(() => {
    return yup.object().shape({
    });
  }, []);

  const extractUiState = useCallback((): UiState => {
    return uiExtractorConfig.uiPropertiesToExtract?.reduce((acc, key) => {
      acc[key] = uiState[key];
      return acc;
    }, {} as any);
  }, [uiExtractorConfig.uiPropertiesToExtract, uiState]);

  const getUiStateExtractorSchema = useCallback(() => {
    return yup.object().shape({
    });
  }, []);

  const getNodesToExcludeSchema = useCallback(() => {
    const nodes = editor.getCurrentPageShapesSorted();
    const nodeSchema = nodes.reduce((acc: any, node: any) => {
      acc[node.id] = yup.boolean().meta({ item: 'checkbox', label: getNodeName(node) });
      return acc;
    }, {});
    return yup.object().shape(nodeSchema).meta({ item: 'from-array' });
  }, [editor]);

  const extractAll = useCallback(async (): Promise<{ json: TLShape[] | null, image: Blob | null, text: string[] | null, canvasState: TLEventInfo | null, uiState: UiState | null }> => {
    const json = jsonExtractorConfig.enabled ? await extractJSON() : null;
    const image = imageExtractorConfig.enabled ? await extractImage() : null;
    const text = textExtractorConfig.enabled ? extractText() : null;
    const canvasState = canvasExtractorConfig.enabled ? extractCanvasState() : null;
    const uiState = uiExtractorConfig.enabled ? extractUiState() : null;
    return { json, image, text, canvasState, uiState };
  }, [jsonExtractorConfig.enabled, extractJSON, imageExtractorConfig.enabled, extractImage, textExtractorConfig.enabled, extractText, canvasExtractorConfig.enabled, extractCanvasState, uiExtractorConfig.enabled, extractUiState]);

  return {
    imageExtractorConfig,
    extractImage,
    getImagePreview,
    getImageExtractorSchema,

    jsonExtractorConfig,
    extractJSON,
    getJSONExtractorSchema,

    textExtractorConfig,
    extractText,
    getTextExtractorSchema,

    canvasExtractorConfig,
    extractCanvasState,
    getCanvasStateExtractorSchema,

    uiExtractorConfig,
    extractUiState,
    getUiStateExtractorSchema,

    getNodesToExcludeSchema,
    setExtractorConfig,
    extractAll,
  }
};


