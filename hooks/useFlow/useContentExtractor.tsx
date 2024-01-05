'use client';

import { getNodeName } from '@/components';
import { encodeBlobAsBase64, getSvgAsImage, getSvgElement } from '@/utils';
import { Box, SVG_PADDING, TLEventInfo, TLShape, TLShapeId, useEditor } from '@tldraw/tldraw';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { UiState, useRecordedContent } from '@/hooks';

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
  bounds?: Box;
  nodesToExclude: TLShapeId[];
  grid?: {
    enabled: boolean;
    size: number;
    color: string;
    labels: boolean;
  }
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
    enabled: yup.boolean().meta({ item: 'switch', label: 'Grid' }),
    size: yup.number().min(0).max(100).meta({ item: 'slider', step: 1 }),
    color: yup.string().meta({ item: 'color' }),
    labels: yup.boolean().meta({ item: 'checkbox', label: 'Grid Labels' }),
  }).meta({ item: 'object' }),
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
    enabled: false,
    size: 100,
    color: 'red',
    labels: true,
  },
};

export const defaultNodePropertiesToIgnore: (keyof TLShape)[] = ['typeName', 'index', 'meta', 'isLocked'];
export const defaultNodesExtractorConfig: NodesExtractorConfig = {
  enabled: true,
  nodePropertiesToExtract: {},
};

export const defaultTextExtractorConfig: TextExtractorConfig = {
  enabled: true,
  nodesToExclude: [],
};

export const defaultCanvasExtractorConfig: CanvasStateExtractorConfig = {
  enabled: true,
  canvasPropertiesToExtract: {} as Record<keyof TLEventInfo, boolean>,
};

export const defaultUiExtractorConfig: UiStateExtractorConfig = {
  enabled: true,
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
};

export type ContentExtractorConfig = ExtractorConfigs & {
  setExtractorConfig: (type: keyof ExtractorConfigs, config: Partial<ExtractorConfigs[keyof ExtractorConfigs]>) => void;
};

export const useContentExtractorStore = create<ContentExtractorConfig>((set) => ({
  imageExtractorConfig: defaultImageExtractorConfig,
  nodesExtractorConfig: defaultNodesExtractorConfig,
  textExtractorConfig: defaultTextExtractorConfig,
  canvasExtractorConfig: defaultCanvasExtractorConfig,
  uiExtractorConfig: defaultUiExtractorConfig,
  setExtractorConfig: (type, config) => set((state) => ({ [type]: { ...state[type], ...config } })),
}));

export const useContentExtractor = () => {
  const [mounted, setMounted] = useState(false);
  const editor = useEditor();
  const { canvasState, uiState } = useRecordedContent();
  const setExtractorConfig = useContentExtractorStore(useShallow((state) => state.setExtractorConfig));
  const imageExtractorConfig = useContentExtractorStore(useShallow((state) => state.imageExtractorConfig));
  const updateImageConfig = useCallback((newImageConfig: any) => {
    setExtractorConfig('imageExtractorConfig', newImageConfig);
  }, [setExtractorConfig]);
  const nodesExtractorConfig = useContentExtractorStore(useShallow((state) => state.nodesExtractorConfig));
  const updateNodesConfig = useCallback((newNodesConfig: any) => {
    setExtractorConfig('nodesExtractorConfig', newNodesConfig);
  }, [setExtractorConfig]);
  const textExtractorConfig = useContentExtractorStore(useShallow((state) => state.textExtractorConfig));
  const canvasExtractorConfig = useContentExtractorStore(useShallow((state) => state.canvasExtractorConfig));
  const updateCanvasConfig = useCallback((newCanvasConfig: any) => {
    setExtractorConfig('canvasExtractorConfig', newCanvasConfig);
  }, [setExtractorConfig]);
  const uiExtractorConfig = useContentExtractorStore(useShallow((state) => state.uiExtractorConfig));
  const updateUiConfig = useCallback((newUiConfig: any) => {
    setExtractorConfig('uiExtractorConfig', newUiConfig);
  }, [setExtractorConfig]);

  const updateNodesExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const nodes = editor.getCurrentPageShapesSorted();
      const nodePropertiesToExtract = nodes.reduce((propertiesToExtract: any, node: any, index: number) => {
        const nodeKey = node.id.replace('shape:', '');
        const keys = Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[];
        const properties =
          prevState.nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties ||
          keys?.reduce((nodeProperties: any, key) => {
            nodeProperties[key] = true;
            return nodeProperties;
          }, {});
        const enabled = prevState.nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.enabled || index === 0 ? true : false;
        propertiesToExtract[nodeKey] = { enabled, properties };
        return propertiesToExtract;
      }, {});

      return {
        ...prevState,
        nodesExtractorConfig: {
          ...prevState.nodesExtractorConfig,
          nodePropertiesToExtract,
        },
      };
    });
  }, [editor]);

  const updateCanvasExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const canvasPropertiesToExtract = Object.keys(canvasState).reduce((propertiesToExtract: any, key) => {
        propertiesToExtract[key] = true;
        return propertiesToExtract;
      }, {});

      return {
        ...prevState,
        canvasExtractorConfig: {
          ...prevState.canvasExtractorConfig,
          canvasPropertiesToExtract,
        },
      };
    });
  }, [canvasState]);

  const updateUiExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const uiPropertiesToExtract = Object.keys(uiState).reduce((propertiesToExtract: any, key) => {
        propertiesToExtract[key] = true;
        return propertiesToExtract;
      }, {});

      return {
        ...prevState,
        uiExtractorConfig: {
          ...prevState.uiExtractorConfig,
          uiPropertiesToExtract,
        },
      };
    });
  }, [uiState]);

  useEffect(() => {
    if (!mounted) {
      updateNodesExtractorConfig();
      updateCanvasExtractorConfig();
      updateUiExtractorConfig();
      setMounted(true);
    }
  }, [mounted, updateCanvasExtractorConfig, updateNodesExtractorConfig, updateUiExtractorConfig]);

  const getNodeIds = useCallback((nodesToExclude: TLShapeId[] = []): TLShapeId[] => {
    const nodeIds = Array.from(editor.getCurrentPageShapeIds());
    return nodeIds.filter((id) => !nodesToExclude.includes(id as TLShapeId));
  }, [editor] );

  const getNodes = useCallback((nodesToExclude: TLShapeId[] = []): TLShape[] => {
    const nodes = editor.getCurrentPageShapesSorted();
    return nodes.filter((node) => !nodesToExclude.includes(node.id as TLShapeId));
  },[editor]);

  const extractImage = useCallback(async (): Promise<{ svg: SVGSVGElement; blob: Blob | null; dataUrl: string | null, base64EncodedSvg: string | null }> => {
    const nodesToInclude = getNodeIds(imageExtractorConfig.nodesToExclude);
    const svg = await getSvgElement(editor, nodesToInclude, imageExtractorConfig);
    const { blob, base64EncodedSvg } = await getSvgAsImage(svg, imageExtractorConfig);
    const dataUrl = blob ? await encodeBlobAsBase64(blob) : null;
    return {
      svg,
      blob,
      dataUrl,
      base64EncodedSvg,
    }
  }, [editor, getNodeIds, imageExtractorConfig]);

  const getImageExtractorSchema = useCallback(() => {
    return yup.object().shape({
      type: ImageSchemaFields['type'],
      quality: ImageSchemaFields['quality'],
      scale: ImageSchemaFields['scale'],
      imageSmoothingEnabled: ImageSchemaFields['imageSmoothingEnabled'],
      imageSmoothingQuality: ImageSchemaFields['imageSmoothingQuality'],
      background: ImageSchemaFields['background'],
      grid: ImageSchemaFields['grid'],
    });
  }, []);

  const extractNodes = useCallback(async (): Promise<TLShape[] | null> => {
    const nodesToExclude = (Object.keys(nodesExtractorConfig.nodePropertiesToExtract).filter((nodeId) => !nodesExtractorConfig.nodePropertiesToExtract[nodeId as TLShapeId].enabled) || []) as TLShapeId[];
    const nodes = getNodes(nodesToExclude);
    const nodeExtraction = nodes.map((node) => {
      const nodeKey = node.id.replace('shape:', '') as TLShapeId;
      const properties = nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties || {};
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

    return nodeExtraction;
  }, [getNodes, nodesExtractorConfig.nodePropertiesToExtract]);

  const getNodesExtractorSchema = useCallback(() => {
    const nodes = editor.getCurrentPageShapesSorted();
    const selectedNodes = editor.getSelectedShapeIds();
    const nodeSchema = nodes.reduce((acc: any, node: any) => {
      const nodeKey = node.id.replace('shape:', '');
      const keys = (Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[]) || [];
      const selected = selectedNodes.includes(node.id);
      // key -> yup boolean schema
      const properties = keys?.reduce((acc: any, key) => {
        acc[key] = yup.boolean().default(true).meta({ item: 'checkbox', label: key });
        return acc;
      }, {});

      // nodeKey -> yup object schema
      //    enabled: yup boolean schema
      //    properties: yup boolean schema for each key
      acc[nodeKey] = yup
        .object()
        .shape({
          enabled: yup
            .boolean()
            .default(false)
            .meta({ item: 'checkbox', label: getNodeName(node), selected }),
          properties: yup
            .object()
            .shape(properties)
            .meta({ item: 'object', label: `${nodeKey} Properties` }),
        })
        .meta({ item: 'node-schema' });

      return acc;
    }, {});

    return yup
      .object()
      .shape({
        ...nodeSchema,
      })
      .meta({ item: 'object' });
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
    return yup.object().shape({});
  }, []);

  const extractCanvasState = useCallback((): Partial<TLEventInfo> => {
    if (!canvasExtractorConfig.canvasPropertiesToExtract) return {};
    const propertiesToExtract = Object.keys(canvasExtractorConfig.canvasPropertiesToExtract).filter((key: any) => canvasExtractorConfig.canvasPropertiesToExtract?.[key] === true);
    return propertiesToExtract.reduce((acc: any, key) => {
      acc[key] = canvasState?.[key as keyof TLEventInfo];
      return acc;
    }, {});
  }, [canvasExtractorConfig.canvasPropertiesToExtract, canvasState]);

  const getCanvasStateExtractorSchema = useCallback(() => {
    // for each canvas key add a boolean schema
    const canvasPrperties = Object.keys(canvasState).reduce((acc: any, key) => {
      acc[key] = yup.boolean().default(true).meta({ item: 'checkbox', label: key });
      return acc;
    }, {});
    return yup.object().shape(canvasPrperties).meta({ item: 'object' });
  }, [canvasState]);

  const extractUiState = useCallback((): Partial<UiState> => {
    if (!uiExtractorConfig.uiPropertiesToExtract) return {};
    const propertiesToExtract = Object.keys(uiExtractorConfig.uiPropertiesToExtract).filter((key: any) => uiExtractorConfig.uiPropertiesToExtract?.[key] === true);
    return propertiesToExtract.reduce((acc: any, key) => {
      acc[key] = uiState?.[key as keyof UiState];
      return acc;
    }, {});
  }, [uiExtractorConfig.uiPropertiesToExtract, uiState]);

  const getUiStateExtractorSchema = useCallback(() => {
    const uiProperties = Object.keys(uiState).reduce((acc: any, key) => {
      acc[key] = yup.boolean().default(true).meta({ item: 'checkbox', label: key });
      return acc;
    }, {});
    return yup.object().shape(uiProperties).meta({ item: 'object' });
  }, [uiState]);

  const getNodesToExcludeSchema = useCallback(() => {
    const nodes = editor.getCurrentPageShapesSorted();
    const nodeSchema = nodes.reduce((acc: any, node: any) => {
      acc[node.id] = yup.boolean().meta({ item: 'checkbox', label: getNodeName(node) });
      return acc;
    }, {});
    return yup.object().shape(nodeSchema).meta({ item: 'from-array' });
  }, [editor]);

  const extractAll = useCallback(async (): Promise<ExtractedState> => {
    const nodes = nodesExtractorConfig.enabled ? await extractNodes() : null;
    const image = imageExtractorConfig.enabled ? await extractImage() : null;
    const { svg, blob, dataUrl, base64EncodedSvg } = image || { svg: null, blob: null, dataUrl: null, base64EncodedSvg: null };
    const text = textExtractorConfig.enabled ? extractText() : null;
    const canvasState = canvasExtractorConfig.enabled ? extractCanvasState() : null;
    const uiState = uiExtractorConfig.enabled ? extractUiState() : null;
    const theme = editor?.user.getUserPreferences().isDarkMode ? 'dark' : 'light';
    return { nodes, text, svg, blob, dataUrl, base64EncodedSvg, canvasState, uiState, theme, ...useContentExtractorStore.getState() };
  }, [nodesExtractorConfig.enabled, extractNodes, imageExtractorConfig.enabled, extractImage, textExtractorConfig.enabled, extractText, canvasExtractorConfig.enabled, extractCanvasState, uiExtractorConfig.enabled, extractUiState, editor?.user]);

  return {
    imageExtractorConfig,
    extractImage,
    getImageExtractorSchema,
    updateImageConfig,

    nodesExtractorConfig,
    extractNodes,
    getNodesExtractorSchema,
    updateNodesConfig,

    textExtractorConfig,
    extractText,
    getTextExtractorSchema,

    canvasExtractorConfig,
    extractCanvasState,
    getCanvasStateExtractorSchema,
    updateCanvasConfig,

    uiExtractorConfig,
    extractUiState,
    getUiStateExtractorSchema,
    updateUiConfig,

    getNodeIds,
    getNodes,
    getNodesToExcludeSchema,
    setExtractorConfig,
    extractAll,
  };
};