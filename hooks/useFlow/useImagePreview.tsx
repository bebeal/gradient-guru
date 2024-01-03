'use client'

import { useContentExtractor } from '@/hooks';
import { getSVGAsBlob, getSvgPreview } from '@/utils';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { useCallback, useEffect, useState } from 'react';

export const useImagePreview = () => {
  const editor = useEditor();
  const {
    imageExtractorConfig,
    getNodeIds,
  } = useContentExtractor();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getImagePreview = useCallback(async (): Promise<string | null> => {
    const nodesInImage: TLShapeId[] = getNodeIds(imageExtractorConfig.nodesToExclude);
    if (nodesInImage.length === 0) return null;
    const svgPreview = await getSvgPreview(editor, nodesInImage, imageExtractorConfig);
    const imgBlob = await getSVGAsBlob(svgPreview!);
    return imgBlob;
  }, [editor, getNodeIds, imageExtractorConfig]);

  const fetchAndSetImage = useCallback(async () => {
    const imgBlob = await getImagePreview();
    if (imgBlob) {
      setImagePreview((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return imgBlob;
      });
    }
  }, [getImagePreview, setImagePreview]);

  useEffect(() => {
    fetchAndSetImage();
  }, [fetchAndSetImage, imageExtractorConfig]);

  return {
    imagePreview,
    getImagePreview,
  }
};
