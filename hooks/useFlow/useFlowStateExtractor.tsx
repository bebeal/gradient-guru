
import { getExportedImageBlob } from "@/utils";
import { Editor, TLEventInfo, TLShape, TLShapeId, UiEvent, useEditor } from "@tldraw/tldraw";
import { useCallback } from "react";
import { useFlowEventsRecorder } from ".";
import { StoreRecord } from "@/packages/tldraw/packages/store/.tsbuild/lib/Store";

export const AllPossibleNodeStateProps = ['x', 'y', 'rotation', 'id', 'type', 'props'];

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
  filter: string[];
}

export type TextExtractorProps = {

};

export type EventsExtractorProps = {
  canvasEvent: boolean;
  uiEvent: boolean;
  storeEvents: boolean;
};

export type BaseExtractorProps = {
  enabled: boolean;
  selected: boolean;
};

export type NodesConfig = BaseExtractorProps & NodesExtractorProps;
export type ImageConfig = BaseExtractorProps & ImageExtractorProps;
export type TextConfig = BaseExtractorProps & TextExtractorProps;
export type EventsConfig = BaseExtractorProps & EventsExtractorProps;

export interface FlowStateExtractorProps {
  nodesConfig?: NodesConfig;
  imageConfig?: ImageConfig;
  textConfig?: TextConfig;
  eventsConfig?: EventsConfig;
};

export const defaultFlowStateExtractorProps: FlowStateExtractorProps  = {
  nodesConfig: {
    enabled: true,
    selected: false,
    filter: [],
  },
  imageConfig: {
    enabled: true,
    selected: false,
    width: 320,
    height: 240,
    type: 'png',
    quality: 1,
    scale: 1,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  },
  textConfig: {
    enabled: true,
    selected: false,
  },
  eventsConfig: {
    enabled: true,
    selected: false,
    canvasEvent: true,
    uiEvent: true,
    storeEvents: true,
  },
};

export const useFlowStateExtractor = (props: FlowStateExtractorProps = defaultFlowStateExtractorProps) => {
  const {
    nodesConfig = defaultFlowStateExtractorProps.nodesConfig!,
    imageConfig = defaultFlowStateExtractorProps.imageConfig!,
    textConfig = defaultFlowStateExtractorProps.textConfig!,
    eventsConfig = defaultFlowStateExtractorProps.eventsConfig!,
  } = props;
  const editor = useEditor();
  const { canvasEvent, storeEvents, uiEvents } = useFlowEventsRecorder();
  
  const getNodeIds = useCallback((selected: boolean = false): TLShapeId[] => {
    return selected ? editor.getSelectedShapeIds() : Array.from(editor.getCurrentPageShapeIds());
  }, [editor]);

  const getNodes = useCallback((selected: boolean = false): TLShape[] => {
    return selected ? editor.getSelectedShapes() : editor.getCurrentPageShapesSorted()
  }, [editor]);

  const extractNodes = useCallback((): TLShape[] => {
    const nodes = getNodes(nodesConfig.selected);
    return nodes.map((node: any) => {
      const { nodeState } = node.props;
      const filteredNodes = Object.keys(nodeState).reduce((acc: any, key: string) => {
        if (!nodesConfig.filter.includes(key)) {
          acc[key] = nodeState[key];
        }
        return acc;
      }, {});
      return filteredNodes;
    })
  }, [getNodes, nodesConfig]);

  const extractImage = useCallback(async (): Promise<Blob | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageConfig.selected);
    return await getExportedImageBlob(editor, nodesInImage, imageConfig);
  }, [editor, getNodeIds, imageConfig]);

  const extractText = useCallback(async (): Promise<string> => {
    const nodeIds = getNodeIds(textConfig.selected);
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
  }, [editor, getNodeIds, textConfig.selected]);

  const extractEvents = useCallback((): { canvasEvent?: TLEventInfo, uiEvents?: UiEvent, storeEvents?: string[] } => {
    const { canvasEvent: getCanvasEvent, uiEvent: getUiEvent, storeEvents: getStoreEvents } = eventsConfig;
    const events: { canvasEvent?: any, uiEvents?: any, storeEvents?: any } = {};
    if (getCanvasEvent) {
      events['canvasEvent'] = canvasEvent;
    }
    if (getUiEvent) {
      events['uiEvents'] = uiEvents;
    }
    if (getStoreEvents) {
      events['storeEvents'] = storeEvents;
    }
    return events;
  }, [eventsConfig, canvasEvent, uiEvents, storeEvents]);

  const extractAll = useCallback(async () => {
    const nodes = extractNodes();
    const image = await extractImage();
    const text = await extractText();
    const events = extractEvents();
    return {
      nodes,
      image,
      text,
      events,
    }
  }, [extractNodes, extractImage, extractText, extractEvents]);

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

  return {
    extractNodes,
    extractImage,
    extractText,
    extractEvents,
    extractAll,
    fetchImage,
    fetchText,
  };
};


