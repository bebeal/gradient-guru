'use client';

import { getNodeName } from '@/components';
import { encodeBlobAsBase64, getExportedImageBlob, getSVGAsBlob, getSvgPreview } from '@/utils';
import { Box2d, SVG_PADDING, TLEventInfo, TLShape, TLShapeId, useEditor } from '@tldraw/tldraw';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { UiState, useContentRecorder } from './useContentRecorder';

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
};

export const defaultImageExtractorConfig: ImageExtractorConfig = {
  enabled: true,
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
  const { canvasState, uiState } = useContentRecorder();
  const imageExtractorConfig = useContentExtractorStore(useShallow((state) => state.imageExtractorConfig));
  const nodesExtractorConfig = useContentExtractorStore(useShallow((state) => state.nodesExtractorConfig));
  const textExtractorConfig = useContentExtractorStore(useShallow((state) => state.textExtractorConfig));
  const canvasExtractorConfig = useContentExtractorStore(useShallow((state) => state.canvasExtractorConfig));
  const uiExtractorConfig = useContentExtractorStore(useShallow((state) => state.uiExtractorConfig));
  const setExtractorConfig = useContentExtractorStore(useShallow((state) => state.setExtractorConfig));

  const updateNodesExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const nodes = editor.getCurrentPageShapesSorted();
      const nodePropertiesToExtract = nodes.reduce((propertiesToExtract: any, node: any) => {
        const nodeKey = node.id.replace('shape:', '');
        const keys = Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[];
        const properties =
          prevState.nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties ||
          keys?.reduce((nodeProperties: any, key) => {
            nodeProperties[key] = true;
            return nodeProperties;
          }, {});
        const enabled = prevState.nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.enabled || false;
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

  const getNodeIds = useCallback(
    (nodesToExclude: TLShapeId[] = []): TLShapeId[] => {
      const nodeIds = Array.from(editor.getCurrentPageShapeIds());
      return nodeIds.filter((id) => !nodesToExclude.includes(id.replace('shape:', '') as TLShapeId));
    },
    [editor]
  );

  const getNodes = useCallback(
    (nodesToExclude: TLShapeId[] = []): TLShape[] => {
      const nodes = editor.getCurrentPageShapesSorted();
      return nodes.filter((node) => !nodesToExclude.includes(node.id.replace('shape:', '') as TLShapeId));
    },
    [editor]
  );

  const extractImage = useCallback(async (): Promise<string | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageExtractorConfig.nodesToExclude);
    const blob = await getExportedImageBlob(editor, nodesInImage, imageExtractorConfig);
    // return URL.createObjectURL(blob!);
    return await encodeBlobAsBase64(blob!);
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
    const nodeSchema = nodes.reduce((acc: any, node: any) => {
      const nodeKey = node.id.replace('shape:', '');
      const keys = (Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[]) || [];

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
            .meta({ item: 'checkbox', label: getNodeName(node) }),
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

  const extractAll = useCallback(async (): Promise<{ nodes: TLShape[] | null; image: string | null; text: string[] | null; canvasState: Partial<TLEventInfo> | null; uiState: Partial<UiState> | null }> => {
    const nodes = nodesExtractorConfig.enabled ? await extractNodes() : null;
    const image = imageExtractorConfig.enabled ? await extractImage() : null;
    const text = textExtractorConfig.enabled ? extractText() : null;
    const canvasState = canvasExtractorConfig.enabled ? extractCanvasState() : null;
    const uiState = uiExtractorConfig.enabled ? extractUiState() : null;
    return { nodes, text, image, canvasState, uiState };
  }, [nodesExtractorConfig.enabled, extractNodes, imageExtractorConfig.enabled, extractImage, textExtractorConfig.enabled, extractText, canvasExtractorConfig.enabled, extractCanvasState, uiExtractorConfig.enabled, extractUiState]);

  return {
    imageExtractorConfig,
    extractImage,
    getImagePreview,
    getImageExtractorSchema,

    nodesExtractorConfig,
    extractNodes,
    getNodesExtractorSchema,

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
  };
};