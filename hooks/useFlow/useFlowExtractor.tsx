'use client'

import { createContext, useCallback, useContext, useState } from 'react';
import { RecordsDiff } from '@tldraw/store';
import { TLEventInfo, TLRecord, TLShape, TLShapeId, UiEvent, useEditor } from '@tldraw/tldraw';
import { getDataUrl, getExportedImageBlob } from '@/utils';
import * as yup from 'yup';
import { useFlowEventsRecorder } from './useFlowEventsRecorder';

export const defaultNodePropertiesToExtract = ['x', 'y', 'rotation', 'id', 'type', 'props'] as const;

export type ImageExtractorProps = {
  type: 'svg' | 'png' | 'jpeg' | 'webp';
  quality: number;
  scale: number;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: 'low' | 'medium' | 'high';
  background: boolean;
};

export type NodesExtractorProps = {
  nodesToExclude: string[];
};

export type BaseExtractorProps = {
  enabled: boolean; // if true will extract this state when extractAll is called
};
export type FilterBySelectionProps = {
  filterSelected: boolean; // if true, filters this state to only consider selected nodes
};

// 6 total possible states that can be extracted, each with their own config that affect how they are extracted
export type NodesConfig = BaseExtractorProps & FilterBySelectionProps & NodesExtractorProps;
export type ImageConfig = BaseExtractorProps & ImageExtractorProps;
export type TextConfig = BaseExtractorProps;
export type CanvasEventConfig = BaseExtractorProps;
export type UiEventConfig = BaseExtractorProps;
export type HistoryRecordsConfig = BaseExtractorProps;

// Initialize default configs for each state extractor
export const defaultBaseConfig: BaseExtractorProps = {
  enabled: false,
};
export const defaultFilterBySelectionConfig: FilterBySelectionProps = {
  filterSelected: false,
};
export const defaultNodesConfig: NodesConfig = {
  ...defaultBaseConfig,
  ...defaultFilterBySelectionConfig,
  nodesToExclude: [],
};
export const defaultImageConfig: ImageConfig = {
  ...defaultBaseConfig,
  type: 'png',
  quality: 1,
  scale: 1,
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'high',
  background: true,
};
export const defaultTextConfig: TextConfig = {
  ...defaultBaseConfig,
};
export const defaultCanvasEventConfig: CanvasEventConfig = {
  ...defaultBaseConfig,
};
export const defaultUiEventConfig: UiEventConfig = {
  ...defaultBaseConfig,
};
export const defaultHistoryRecordsConfig: HistoryRecordsConfig = {
  ...defaultBaseConfig,
};

export const SchemaFields = {
  'enabled': yup.boolean().meta({ type: 'switch', disabled: false }),
  'filterSelected': yup.boolean().meta({ type: 'checkbox', disabled: false, label: 'Filter by Selected' }),
  'width': yup.number().max(400).min(1).meta({ type: 'slider', disabled: false }),
  'height': yup.number().max(400).min(1).meta({ type: 'slider', disabled: false }),
  'type': yup.string().oneOf(['svg', 'png', 'jpeg', 'webp']).meta({ type: 'select', disabled: false }),
  'quality': yup.number().min(0).max(1).meta({ type: 'slider', disabled: false, step: 0.1 }),
  'scale': yup.number().min(0).max(2).meta({ type: 'slider', disabled: false, step: 0.1 }),
  'imageSmoothingEnabled': yup.boolean().meta({ type: 'checkbox', disabled: false, label: 'Image Smoothing' }),
  'imageSmoothingQuality': yup.string().oneOf(['low', 'medium', 'high']).meta({ type: 'select', disabled: false, label: 'Image Smoothing Quality' }),
  'background': yup.boolean().meta({ type: 'checkbox', disabled: false, label: 'Background' }),
}

// Each of these configs will be accessible to the rest of the app via a provider
export const FlowConfigContext = createContext(
  {} as {
    nodesConfig: NodesConfig;
    setNodesConfig: (config: NodesConfig) => void;
    imageConfig: ImageConfig;
    setImageConfig: (config: ImageConfig) => void;
    textConfig: TextConfig;
    setTextConfig: (config: TextConfig) => void;
    canvasEventConfig: CanvasEventConfig;
    setCanvasEventConfig: (config: CanvasEventConfig) => void;
    uiEventConfig: UiEventConfig;
    setUiEventConfig: (config: UiEventConfig) => void;
    historyRecordsConfig: HistoryRecordsConfig;
    setHistoryRecordsConfig: (config: HistoryRecordsConfig) => void;
    toggleNodeState: (nodeId: string) => void;
  }
);
export const FlowConfigProvider = ({ children }: { children: any }) => {
  const [nodesConfig, setNodesConfig] = useState<NodesConfig>({ ...defaultNodesConfig, enabled: false });
  const [imageConfig, setImageConfig] = useState<ImageConfig>({ ...defaultImageConfig, enabled: true });
  const [textConfig, setTextConfig] = useState<TextConfig>({ ...defaultTextConfig, enabled: true });
  const [canvasEventConfig, setCanvasEventConfig] = useState<CanvasEventConfig>(defaultBaseConfig);
  const [uiEventConfig, setUiEventConfig] = useState<UiEventConfig>(defaultBaseConfig);
  const [historyRecordsConfig, setHistoryRecordsConfig] = useState<HistoryRecordsConfig>(defaultHistoryRecordsConfig);

  const toggleNodeState = useCallback((nodeId: string) => {
    const nodeExcluded = nodesConfig.nodesToExclude.includes(nodeId);
    setNodesConfig({
      ...nodesConfig,
      nodesToExclude: nodeExcluded
        ? nodesConfig.nodesToExclude.filter((id) => id !== nodeId)
        : [...nodesConfig.nodesToExclude, nodeId],
    });
  }, [nodesConfig]);

  const value = {
    nodesConfig,
    setNodesConfig,
    imageConfig,
    setImageConfig,
    textConfig,
    setTextConfig,
    canvasEventConfig,
    setCanvasEventConfig,
    uiEventConfig,
    setUiEventConfig,
    historyRecordsConfig,
    setHistoryRecordsConfig,
    toggleNodeState,
  };

  return <FlowConfigContext.Provider value={value}>{children}</FlowConfigContext.Provider>;
};

// Type definition for useFlowExtractor
export type useFlowExtractorReturn = {
  nodesConfig: NodesConfig;
  setNodesConfig: (config: NodesConfig) => void;
  imageConfig: ImageConfig;
  setImageConfig: (config: ImageConfig) => void;
  textConfig: TextConfig;
  setTextConfig: (config: TextConfig) => void;
  canvasEventConfig: CanvasEventConfig;
  setCanvasEventConfig: (config: CanvasEventConfig) => void;
  uiEventConfig: UiEventConfig;
  setUiEventConfig: (config: UiEventConfig) => void;
  historyRecordsConfig: HistoryRecordsConfig;
  setHistoryRecordsConfig: (config: HistoryRecordsConfig) => void;

  toggleNodeState: (nodeId: string) => void;

  fetchImage: () => Promise<string | null>;
  fetchText: () => Promise<string | null>;

  extractNodes: () => TLShape[];
  extractImage: () => Promise<Blob | null>;
  extractText: () => Promise<string>;
  extractCanvasEvent: () => TLEventInfo;
  extractUiEvent: () => UiEvent;
  extractHistoryRecords: () => RecordsDiff<TLRecord>[];
  extractAll: () => Promise<{
    nodes: TLShape[];
    image: Blob | null;
    text: string;
    canvasEvent: TLEventInfo | {};
    uiEvent: UiEvent | {};
    historyRecords?: RecordsDiff<TLRecord>[];
  }>;
  getImageSchema: () => yup.ObjectSchema<any>;
  getTextSchema: () => yup.ObjectSchema<any>;
  getCanvasEventSchema: () => yup.ObjectSchema<any>;
  getUiEventSchema: () => yup.ObjectSchema<any>;
  getHistoryRecordsSchema: () => yup.ObjectSchema<any>;
};

// useFlowStateExtractor:
// Contains configs which affect how the state is extracted
// Contains methods to extract each state
// and extractAll to extract all states at once to be used to feed into the model
export const useFlowExtractor = (): useFlowExtractorReturn => {
  const {
    nodesConfig,
    setNodesConfig,
    imageConfig,
    setImageConfig,
    textConfig,
    setTextConfig,
    canvasEventConfig,
    setCanvasEventConfig,
    uiEventConfig,
    setUiEventConfig,
    historyRecordsConfig,
    setHistoryRecordsConfig,
    toggleNodeState,
  } = useContext(FlowConfigContext);

  if (!nodesConfig || !imageConfig || !textConfig || !canvasEventConfig || !uiEventConfig || !historyRecordsConfig) {
    throw new Error('useFlowStateExtractor must be used within a FlowStateExtractorProvider');
  }

  const editor = useEditor();
  const { canvasEvent, uiEvents, historyRecords } = useFlowEventsRecorder();

  const getNodeIds = useCallback((filterSelected: boolean = false): TLShapeId[] => {
      const nodeIds = filterSelected ? editor.getSelectedShapeIds() : Array.from(editor.getCurrentPageShapeIds());
      return nodeIds.filter((id) => !nodesConfig.nodesToExclude.includes(id));
  }, [editor, nodesConfig.nodesToExclude]);

  const getNodes = useCallback((filterSelected: boolean = false): TLShape[] => {
      const nodes = filterSelected ? editor.getSelectedShapes() : editor.getCurrentPageShapesSorted();
      return nodes.filter((node) => !nodesConfig.nodesToExclude.includes(node.id));
  }, [editor, nodesConfig.nodesToExclude]);

  // ********** Extractor methods **********

  // Nodes extractor
  const extractNodes = useCallback((): TLShape[] => {
    const nodes = getNodes(nodesConfig.filterSelected);
    return nodes.map((node) => {
      const propsToExtract =  defaultNodePropertiesToExtract.reduce((acc, key) => {
        acc[key] = node[key];
        return acc;
      }, {} as any);
      return propsToExtract;
    });
  }, [getNodes, nodesConfig]);

  // Image extractor
  const extractImage = useCallback(async (): Promise<Blob | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(nodesConfig.filterSelected);
    return await getExportedImageBlob(editor, nodesInImage, imageConfig);
  }, [editor, getNodeIds, imageConfig, nodesConfig.filterSelected]);

  // Text extractor
  const extractText = useCallback(async (): Promise<string> => {
    const nodeIds = getNodeIds(nodesConfig.filterSelected);
    const nodeDescendantIds = editor.getShapeAndDescendantIds(nodeIds);

    const texts = Array.from(nodeDescendantIds)
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
    return texts.join('\n');
  }, [editor, getNodeIds, nodesConfig.filterSelected]);

  // Canvas event extractor
  const extractCanvasEvent = useCallback((): TLEventInfo => {
    return canvasEvent;
  }, [canvasEvent]);

  // UI event extractor
  const extractUiEvent = useCallback((): UiEvent => {
    return uiEvents?.[0] || {};
  }, [uiEvents]);

  // History records extractor
  const extractHistoryRecords = useCallback((): RecordsDiff<TLRecord>[] => {
    return historyRecords;
  }, [historyRecords]);

  // Extract all enabled states
  const extractAll = useCallback(async () => {
    const nodes = nodesConfig.enabled ? extractNodes() : [];
    const image = imageConfig.enabled ? await extractImage() : null;
    const text = textConfig.enabled ? await extractText() : '';
    const canvasEvent = canvasEventConfig.enabled ? extractCanvasEvent() : {};
    const uiEvent = uiEventConfig.enabled ? extractUiEvent() : {};
    const historyRecords = historyRecordsConfig.enabled ? extractHistoryRecords() : [];
    return {
      nodes,
      image,
      text,
      canvasEvent,
      uiEvent,
      historyRecords,
    };
  }, [
    nodesConfig,
    imageConfig,
    textConfig,
    canvasEventConfig,
    uiEventConfig,
    historyRecordsConfig,
    extractNodes,
    extractImage,
    extractText,
    extractCanvasEvent,
    extractUiEvent,
    extractHistoryRecords,
  ]);

  // ********** Helper methods **********

  const fetchImage = useCallback(async () => {
    const nodesInImage: TLShapeId[] = getNodeIds(nodesConfig.filterSelected);
    if (nodesInImage.length === 0) return null;
    return await getDataUrl(editor, nodesInImage, imageConfig);
  }, [editor, getNodeIds, imageConfig, nodesConfig.filterSelected]);

  const fetchText = useCallback(async () => {
    return textConfig?.enabled ? extractText() : null;
  }, [textConfig, extractText]);

  // ********** Schema methods **********

  const getImageSchema = useCallback(() => {
    return yup.object().shape({
      type: SchemaFields['type'],
      quality: SchemaFields['quality'],
      scale: SchemaFields['scale'],
      imageSmoothingEnabled: SchemaFields['imageSmoothingEnabled'],
      imageSmoothingQuality: SchemaFields['imageSmoothingQuality'],
      background: SchemaFields['background'],
    });
  }, []);

  const getTextSchema = useCallback(() => {
    return yup.object().shape({ });
  }, []);

  const getCanvasEventSchema = useCallback(() => {
    return yup.object().shape({ });
  }, []);

  const getUiEventSchema = useCallback(() => {
    return yup.object().shape({ });
  }, []);

  const getHistoryRecordsSchema = useCallback(() => {
    return yup.object().shape({ });
  }, []);

  return {
    nodesConfig,
    setNodesConfig,
    imageConfig,
    setImageConfig,
    textConfig,
    setTextConfig,
    canvasEventConfig,
    setCanvasEventConfig,
    uiEventConfig,
    setUiEventConfig,
    historyRecordsConfig,
    setHistoryRecordsConfig,
    toggleNodeState,
    fetchImage,
    fetchText,
    extractNodes,
    extractImage,
    extractText,
    extractCanvasEvent,
    extractUiEvent,
    extractHistoryRecords,
    extractAll,
    getImageSchema,
    getTextSchema,
    getCanvasEventSchema,
    getUiEventSchema,
    getHistoryRecordsSchema,
  };
};
