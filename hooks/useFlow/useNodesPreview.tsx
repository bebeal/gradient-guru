'use client'

import { useContentExtractor } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';

export const useNodesPreview = () => {
  const {
    nodesExtractorConfig,
    extractNodes
  } = useContentExtractor();
  const [nodesPreview, setNodesPreview] = useState<any[] | null>(null);

  const fetchAndSetNodes = useCallback(async () => {
    const nodes = await extractNodes();
    setNodesPreview(nodes);
  }, [extractNodes]);

  useEffect(() => {
    fetchAndSetNodes();
  }, [fetchAndSetNodes, nodesExtractorConfig]);

  return {
    nodesPreview,
    fetchAndSetNodes
  }
};
