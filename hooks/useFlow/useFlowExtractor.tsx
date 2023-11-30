
import { getExportedImageBlob } from "@/utils";
import { Editor, TLEventInfo, TLRecord, TLShape, TLShapeId, UiEvent, useEditor } from "@tldraw/tldraw";
import { createContext, useCallback, useContext, useState } from "react";
import { useFlowEventsRecorder } from ".";
import { RecordsDiff } from "@tldraw/store";

export const defaultNodePropertiesToExtract = ['x', 'y', 'rotation', 'id', 'type', 'props'] as const;

export type ImageExtractorProps = {
  width: number;
  height: number;
  type: 'png' | 'jpeg' | 'webp' | 'url';
  quality: number;
  scale: number;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: 'low' | 'medium' | 'high';
};

export type NodesExtractorProps = {
  nodesToExclude: string[];
}

export type BaseExtractorProps = {
  enabled: boolean; // if true will extract this state when extractAll is called
};
export type FilterBySelectionProps = {
  filterSelected: boolean; // if true, filters this state to only consider selected nodes
};

// 6 total possible states that can be extracted, each with their own config that affect how they are extracted
export type NodesConfig = BaseExtractorProps & FilterBySelectionProps & NodesExtractorProps;
export type ImageConfig = BaseExtractorProps & FilterBySelectionProps & ImageExtractorProps;
export type TextConfig = BaseExtractorProps & FilterBySelectionProps;
export type CanvasEventConfig = BaseExtractorProps;
export type UiEventConfig = BaseExtractorProps;
export type HistoryRecordsConfig = BaseExtractorProps & FilterBySelectionProps;

// Initialize default configs for each state extractor
export const defaultBaseConfig: BaseExtractorProps = {
  enabled: true,
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
    ...defaultFilterBySelectionConfig,
    width: 320,
    height: 240,
    type: 'png',
    quality: 1,
    scale: 1,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
};
export const defaultTextConfig: TextConfig = {
  ...defaultBaseConfig,
  ...defaultFilterBySelectionConfig,
};
export const defaultCanvasEventConfig: CanvasEventConfig = {
  ...defaultBaseConfig,
};
export const defaultUiEventConfig: UiEventConfig = {
  ...defaultBaseConfig,
};
export const defaultHistoryRecordsConfig: HistoryRecordsConfig = {
  ...defaultBaseConfig,
  ...defaultFilterBySelectionConfig,
};

// Each of these configs will be accessible to the rest of the app via a provider
export const FlowConfigContext = createContext({} as {
  nodesConfig: NodesConfig; setNodesConfig: (config: NodesConfig) => void;
  imageConfig: ImageConfig; setImageConfig: (config: ImageConfig) => void;
  textConfig: TextConfig; setTextConfig: (config: TextConfig) => void;
  canvasEventConfig: CanvasEventConfig; setCanvasEventConfig: (config: CanvasEventConfig) => void;
  uiEventConfig: UiEventConfig; setUiEventConfig: (config: UiEventConfig) => void;
  historyRecordsConfig: HistoryRecordsConfig; setHistoryRecordsConfig: (config: HistoryRecordsConfig) => void;
});
export const FlowConfigProvider = ({children}: {children: any}) => {
  const [nodesConfig, setNodesConfig] = useState<NodesConfig>(defaultNodesConfig);
  const [imageConfig, setImageConfig] = useState<ImageConfig>(defaultImageConfig);
  const [textConfig, setTextConfig] = useState<TextConfig>(defaultTextConfig);
  const [canvasEventConfig, setCanvasEventConfig] = useState<CanvasEventConfig>(defaultBaseConfig);
  const [uiEventConfig, setUiEventConfig] = useState<UiEventConfig>(defaultBaseConfig);
  const [historyRecordsConfig, setHistoryRecordsConfig] = useState<HistoryRecordsConfig>(defaultHistoryRecordsConfig);

  const value = {
    nodesConfig, setNodesConfig,
    imageConfig, setImageConfig,
    textConfig, setTextConfig,
    canvasEventConfig, setCanvasEventConfig,
    uiEventConfig, setUiEventConfig,
    historyRecordsConfig, setHistoryRecordsConfig,
  };

  return (
    <FlowConfigContext.Provider value={value}>
      {children}
    </FlowConfigContext.Provider>
  );
};

// Type definition for useFlowExtractor
export type useFlowExtractorReturn = {
  nodesConfig: NodesConfig; setNodesConfig: (config: NodesConfig) => void;
  imageConfig: ImageConfig; setImageConfig: (config: ImageConfig) => void;
  textConfig: TextConfig; setTextConfig: (config: TextConfig) => void;
  canvasEventConfig: CanvasEventConfig; setCanvasEventConfig: (config: CanvasEventConfig) => void;
  uiEventConfig: UiEventConfig; setUiEventConfig: (config: UiEventConfig) => void;
  historyRecordsConfig: HistoryRecordsConfig; setHistoryRecordsConfig: (config: HistoryRecordsConfig) => void;

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
};

// useFlowStateExtractor:
// Contains configs which affect how the state is extracted
// Contains methods to extract each state
// and extractAll to extract all states at once to be used to feed into the model
export const useFlowExtractor = (): useFlowExtractorReturn => {
  const configs = useContext(FlowConfigContext);
  const {
    nodesConfig, setNodesConfig,
    imageConfig, setImageConfig,
    textConfig, setTextConfig,
    canvasEventConfig, setCanvasEventConfig,
    uiEventConfig, setUiEventConfig,
    historyRecordsConfig, setHistoryRecordsConfig,
  } = configs;

  if (!configs) {
    throw new Error('useFlowStateExtractor must be used within a FlowStateExtractorProvider');
  }

  const editor = useEditor();
  const { canvasEvent, uiEvents, historyRecords } = useFlowEventsRecorder();
  
  const getNodeIds = useCallback((filterSelected: boolean = false): TLShapeId[] => {
    return filterSelected ? editor.getSelectedShapeIds() : Array.from(editor.getCurrentPageShapeIds());
  }, [editor]);

  const getNodes = useCallback((filterSelected: boolean = false): TLShape[] => {
    return filterSelected ? editor.getSelectedShapes() : editor.getCurrentPageShapesSorted()
  }, [editor]);

  const fetchImage = async () => {
    if (imageConfig?.enabled) {
      const image: Blob | null = await extractImage();
      return image ? URL.createObjectURL(image) : null;
    }
    return null;
  };

  const fetchText = async () => {
    return textConfig?.enabled ? extractText() : null;
  };

  // ********** Extractor methods **********

  // Nodes extractor
  const extractNodes = useCallback((): TLShape[] => {
    const nodes = getNodes(nodesConfig.filterSelected);
    return nodes.map((node: any) => {
      const { nodeState } = node.props;
      const filteredNodes = Object.keys(nodeState).reduce((acc: any, key: string) => {
        if (!nodesConfig.nodesToExclude.includes(key)) {
          acc[key] = nodeState[key];
        }
        return acc;
      }, {});
      return filteredNodes;
    })
  }, [getNodes, nodesConfig]);

  // Image extractor
  const extractImage = useCallback(async (): Promise<Blob | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageConfig.filterSelected);
    return await getExportedImageBlob(editor, nodesInImage, imageConfig);
  }, [editor, getNodeIds, imageConfig]);

  // Text extractor
  const extractText = useCallback(async (): Promise<string> => {
    const nodeIds = getNodeIds(textConfig.filterSelected);
    const nodeDescendantIds = editor.getShapeAndDescendantIds(nodeIds)
  
    const texts = Array.from(nodeDescendantIds)
      .map((id) => {
        const shape = editor.getShape(id)
        if (!shape) return null
        if (
          shape.type === 'text' ||
          shape.type === 'geo' ||
          shape.type === 'arrow' ||
          shape.type === 'note'
        ) {
          // @ts-expect-error
          return shape.props.text
        }
        return null
      })
      .filter((v) => v !== null && v !== '')
  
    return texts.join('\n')
  }, [editor, getNodeIds, textConfig.filterSelected]);

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
    const selectedNodes = getNodeIds(true);
    // filter out records that are not for selected nodes
    return historyRecords;
  }, [getNodeIds, historyRecords]);

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
    }
  }, [nodesConfig, imageConfig, textConfig, canvasEventConfig, uiEventConfig, historyRecordsConfig, extractNodes, extractImage, extractText, extractCanvasEvent, extractUiEvent, extractHistoryRecords]);

  return {
    ...configs,
    fetchImage,
    fetchText,
    extractNodes,
    extractImage,
    extractText,
    extractCanvasEvent,
    extractUiEvent,
    extractHistoryRecords,
    extractAll
  };
};

