'use client';

import React, { useState } from 'react';
import { Icon } from '@/components';

export interface TreeNode {
  [key: string]: string[];
}

export interface DirectoryTreeProps {
  data: TreeNode;
  basePath?: string;
}

export const DirectoryTree: React.FC<DirectoryTreeProps> = ({ data, basePath = '' }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (path: string) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (node: string[], path: string): React.ReactNode => {
    return (
      <div key={path}>
        <div
          className="flex items-center cursor-pointer py-1"
          onClick={() => toggleExpand(path)}
        >
          {expanded[path] ? (
            <Icon set="Carbon" icon="ChevronDown" className="h-4 w-4 mr-1" />
          ) : (
            <Icon set="Carbon" icon="ChevronRight" className="h-4 w-4 mr-1" />
          )}
          <Icon set="Custom" icon="Folder" className="h-4 w-4 mr-2 select-none" />
          <span className="font-medium">{path}</span>
        </div>
        {expanded[path] && (
          <div className="ml-6">
            {node.map((subPath) => (
              <div key={subPath} className="py-1">
                <a href={`${basePath}${path}${subPath}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold flex items-center">
                  <Icon set="Custom" icon="File" className="h-4 w-4 mr-1" />
                  {subPath}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm">
      {Object.entries(data).map(([key, value]) => renderTree(value, key))}
    </div>
  );
};