'use client';

import { formatNodeId, getNodeName } from '@/components';
import { encodeBlobAsBase64, getSvgAsImage, getSvgElement } from '@/utils';
import { TLEventInfo, TLShape, TLShapeId, useEditor, useValue } from '@tldraw/tldraw';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { UiState, useRecordedContent } from '@/hooks';
import { ContentExtractorConfig, ExtractedState, defaultCanvasExtractorConfig, defaultImageExtractorConfig, defaultNodePropertiesToIgnore, defaultNodesExtractorConfig, defaultTextExtractorConfig, defaultUiExtractorConfig } from './ExtractionUtils';

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
  const [imageExtractorConfig, updateImageConfig]  = useContentExtractorStore(useShallow((state) => [state.imageExtractorConfig, (newImageConfig: any) => setExtractorConfig('imageExtractorConfig', newImageConfig)]));
  const [nodesExtractorConfig, updateNodesConfig] = useContentExtractorStore(useShallow((state) => [state.nodesExtractorConfig, (newNodesConfig: any) => setExtractorConfig('nodesExtractorConfig', newNodesConfig)]));
  const [textExtractorConfig, updateTextConfig] = useContentExtractorStore(useShallow((state) => [state.textExtractorConfig, (newTextConfig: any) => setExtractorConfig('textExtractorConfig', newTextConfig)]));
  const [canvasExtractorConfig, updateCanvasConfig] = useContentExtractorStore(useShallow((state) => [state.canvasExtractorConfig, (newCanvasConfig: any) => setExtractorConfig('canvasExtractorConfig', newCanvasConfig)]));
  const [uiExtractorConfig, updateUiConfig] = useContentExtractorStore(useShallow((state) => [state.uiExtractorConfig, (newUiConfig: any) => setExtractorConfig('uiExtractorConfig', newUiConfig)]));
  const currentPageShapes: any = useValue('current page shapes', () => editor.getCurrentPageShapesSorted(), [editor]);
  const currentPageShapeIds: any = useValue('current page shapes', () => editor.getCurrentPageShapesSorted(), [editor]);

  const getNodeIds = useCallback((nodesToExclude: TLShapeId[] = []): TLShapeId[] => {
    return Array.from(currentPageShapeIds).filter((id) => !nodesToExclude.includes(id as TLShapeId)) as TLShapeId[];
  }, [currentPageShapeIds]);

  const getNodes = useCallback((nodesToExclude: TLShapeId[] = []): TLShape[] => {
    return currentPageShapes.filter((node: TLShape) => !nodesToExclude.includes(node.id as TLShapeId));
  },[currentPageShapes]);

  const updateNodesExtractorConfig = useCallback(() => {
    useContentExtractorStore.setState((prevState) => {
      const nodePropertiesToExtract = currentPageShapes.reduce((propertiesToExtract: any, node: any, index: number) => {
        const nodeKey = formatNodeId(node.id) as TLShapeId;
        const keys = Object.keys(node).filter((key) => !defaultNodePropertiesToIgnore.includes(key as keyof TLShape)) as (keyof TLShape)[];
        const properties = prevState.nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties || keys?.reduce((nodeProperties: any, key) => {
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
  }, [currentPageShapes]);

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
  }, [mounted, setMounted, updateCanvasExtractorConfig, updateNodesExtractorConfig, updateUiExtractorConfig]);

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

  const extractNodes = useCallback(async (): Promise<TLShape[] | null> => {
    const nodesToExclude = (Object.keys(nodesExtractorConfig.nodePropertiesToExtract).filter((nodeId) => !nodesExtractorConfig.nodePropertiesToExtract[nodeId as TLShapeId].enabled) || []) as TLShapeId[];
    const nodes = getNodes(nodesToExclude);
    const nodeExtraction = nodes.map((node) => {
      const nodeKey = formatNodeId(node.id) as TLShapeId;
      const properties = nodesExtractorConfig.nodePropertiesToExtract[nodeKey]?.properties || {};
      const nodeProperties = Object.entries(node).reduce((acc: any, [key, value]) => {
        if (properties?.[key as keyof TLShape]) {
          if (key === 'id') {
            acc['id'] = formatNodeId(value);
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
      const nodeKey = formatNodeId(node.id)!;
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
  }, [nodesExtractorConfig, extractNodes, imageExtractorConfig, extractImage, textExtractorConfig, extractText, canvasExtractorConfig, extractCanvasState, uiExtractorConfig, extractUiState, editor]);

  return {
    imageExtractorConfig,
    extractImage,
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