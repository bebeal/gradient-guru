'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { Accordion, Button, Icon, IconSets, Input } from '@/components';

const ICON_PAGINATION_PER_SET = 50;

interface PageState {
  [key: string]: number;
}

const IconSetsPage = memo(() => {
  const [width, setWidth] = useState<number | string>(32);
  const [height, setHeight] = useState<number | string>('100%');
  const [currentPage, setCurrentPage] = useState<PageState>({});
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [localSearchQueries, setLocalSearchQueries] = useState<{ [key: string]: string }>({});

  const handlePageChange = useCallback((iconSet: string, newPage: number) => {
    const totalIcons = Object.keys(IconSets[iconSet].icons).length;
    const totalPages = Math.ceil(totalIcons / ICON_PAGINATION_PER_SET);

    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }

    setCurrentPage((prev) => ({ ...prev, [iconSet]: newPage }));
  }, []);

  const getPageDisplay = useCallback(
    (iconSet: string): string => {
      const totalIcons = Object.keys(IconSets[iconSet].icons).length;
      const totalPages = Math.ceil(totalIcons / ICON_PAGINATION_PER_SET);
      const page = currentPage[iconSet] || 0;

      return `Page ${page + 1} of ${totalPages}`;
    },
    [currentPage],
  );

  const filteredIconSets = useMemo(() => {
    const filteredSets = Object.keys(IconSets);
    if (globalSearchQuery) {
      return filteredSets.filter((iconSet) => iconSet.toLowerCase().includes(globalSearchQuery.toLowerCase()) || Object.keys(IconSets[iconSet].icons).some((icon) => icon.toLowerCase().includes(globalSearchQuery.toLowerCase())));
    }
    return filteredSets;
  }, [globalSearchQuery]);

  const getFilteredIcons = useCallback(
    (iconSetName: string, iconsFromSet: string[]) => {
      const searchQuery = localSearchQueries[iconSetName]?.toLowerCase() || '';

      if (!searchQuery) {
        return iconsFromSet;
      }

      return iconsFromSet.filter((icon: string) => icon.toLowerCase().includes(searchQuery));
    },
    [localSearchQueries],
  );

  const updateLocalSearchQueries = useCallback(
    (newGlobalQuery: string) => {
      const updatedQueries = { ...localSearchQueries };
      filteredIconSets.forEach((iconSet) => {
        updatedQueries[iconSet] = newGlobalQuery;
      });
      setLocalSearchQueries(updatedQueries);
    },
    [filteredIconSets, localSearchQueries],
  );

  const handleGlobalSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newGlobalQuery = e.target.value;
      setGlobalSearchQuery(newGlobalQuery);
      updateLocalSearchQueries(newGlobalQuery);
    },
    [updateLocalSearchQueries],
  );

  return (
    <div className="p-8">
      <div className="flex flex-row w-full justify-center items-center p-2">
        <Input extraCharWidth={10} type="text" placeholder="Search icons or sets..." value={globalSearchQuery} onChange={handleGlobalSearchChange} className="w-full mr-2 border border-gray-300 rounded" />
        <Input extraCharWidth={10} type="text" placeholder="Width" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-auto ml-2 border border-gray-300 rounded" />
        <Input extraCharWidth={10} type="text" placeholder="Height" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-auto ml-2 border border-gray-300 rounded" />
      </div>
      {filteredIconSets.map((iconSet: string) => {
        const icons = Object.keys(IconSets[iconSet].icons);
        const page = currentPage[iconSet] || 0;
        const paginatedIcons = getFilteredIcons(iconSet, icons).slice(page * ICON_PAGINATION_PER_SET, (page + 1) * ICON_PAGINATION_PER_SET);
        let iconProps = {};
        if (typeof width === 'number') {
          iconProps = { ...iconProps, width };
        }
        if (typeof height === 'number') {
          iconProps = { ...iconProps, height };
        }
        return (
          <div key={iconSet} className="flex flex-col justify-center items-center gap-4 rounded p-2">
            <Accordion
              spaceBetween={16}
              items={[
                {
                  open: page === 0,
                  name: iconSet,
                  content: (
                    <div className="flex flex-col gap-1 w-full h-full justify-center items-center p-4">
                      <Input
                        extraCharWidth={10}
                        type="text"
                        placeholder={`Search in ${iconSet}...`}
                        value={localSearchQueries[iconSet] || ''}
                        onChange={(e) =>
                          setLocalSearchQueries({
                            ...localSearchQueries,
                            [iconSet]: e.target.value,
                          })
                        }
                        className="w-full m-2 border border-gray-300 rounded"
                      />
                      <div className="grid grid-cols-5 gap-2 w-full h-auto justify-center items-stretch auto-rows-fr overflow-auto">
                        {paginatedIcons.map((icon: string) => (
                          <div key={icon} className="flex flex-col bg-gray-600 bg-opacity-50 border border-gray-400 rounded shadow-2xl overflow-auto h-full justify-center">
                            <div className="flex flex-col items-center w-full h-full p-1 overflow-hidden">
                              <Icon set={iconSet} icon={icon} {...iconProps} className="text-primary h-full" />
                              <div className="text-xs w-full h-full flex text-center justify-center items-end text-wrap break-all">{icon}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-row gap-2 w-full justify-center items-center">
                        <Button variant="classic" onClick={() => handlePageChange(iconSet, page - 1)}>
                          Previous
                        </Button>
                        <span className="text-sm">{getPageDisplay(iconSet)}</span>
                        <Button variant="classic" onClick={() => handlePageChange(iconSet, page + 1)}>
                          Next
                        </Button>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        );
      })}
    </div>
  );
});

export default IconSetsPage;
