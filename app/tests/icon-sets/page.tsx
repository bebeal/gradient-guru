'use client';

import { useMemo, useState } from 'react';
import { Accordion, Button, IconSetCache, Input } from '@/components';
import { cn } from '@/utils';

const ICONS_PER_PAGE = 50;

interface PageState {
  [key: string]: number;
}

const IconSetsPage = () => {
  const [size, setSize] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<PageState>({});
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [localSearchQueries, setLocalSearchQueries] = useState<{ [key: string]: string }>({});

  const handlePageChange = (iconSetName: string, newPage: number) => {
    const totalIcons = Object.entries(IconSetCache[iconSetName]).length;
    const totalPages = Math.ceil(totalIcons / ICONS_PER_PAGE);

    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }

    setCurrentPage((prev) => ({ ...prev, [iconSetName]: newPage }));
  };

  const getPageDisplay = (iconSetName: string): string => {
    const totalIcons = Object.entries(IconSetCache[iconSetName]).length;
    const totalPages = Math.ceil(totalIcons / ICONS_PER_PAGE);
    const page = currentPage[iconSetName] || 0;

    return `Page ${page + 1} of ${totalPages}`;
  };

  const filteredIconSets = useMemo(() => {
    let filteredSets = Object.keys(IconSetCache);

    if (globalSearchQuery) {
      filteredSets = filteredSets.filter((iconSetName) =>
        iconSetName.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        Object.keys(IconSetCache[iconSetName]).some(iconName =>
          iconName.toLowerCase().includes(globalSearchQuery.toLowerCase()))
      );
    }
    
    return filteredSets;
  }, [globalSearchQuery]);

  const getFilteredIcons = (iconSetName: string, IconSet: any) => {
    const searchQuery = localSearchQueries[iconSetName]?.toLowerCase() || '';

    if (!searchQuery) {
      return Object.entries(IconSet);
    }

    return Object.entries(IconSet).filter(([iconName]) =>
      iconName.toLowerCase().includes(searchQuery)
    );
  };

  const updateLocalSearchQueries = (newGlobalQuery: string) => {
    const updatedQueries = { ...localSearchQueries };
    filteredIconSets.forEach(iconSet => {
      updatedQueries[iconSet] = newGlobalQuery;
    });
    setLocalSearchQueries(updatedQueries);
  };

  const handleGlobalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGlobalQuery = e.target.value;
    setGlobalSearchQuery(newGlobalQuery);
    updateLocalSearchQueries(newGlobalQuery);
  };

  return (
    <div className='p-8'>
      <div className='flex flex-row w-full justify-center items-center p-2'>
      <Input
        extraCharWidth={10}
        type="text"
        placeholder="Search icons or sets..."
        value={globalSearchQuery}
        onChange={handleGlobalSearchChange}
        className="w-full mr-2 border border-gray-300 rounded"
      />
      <Input
        extraCharWidth={10}
        type="number"
        placeholder="Icon size..."
        value={size}
        onChange={(e) => setSize(parseInt(e.target.value))}
        className="w-auto ml-2 border border-gray-300 rounded"
      />
      </div>
      {filteredIconSets.map((iconSetName: string) => {
        const IconSet = IconSetCache[iconSetName];
        const page = currentPage[iconSetName] || 0;
        const paginatedIcons = getFilteredIcons(iconSetName, IconSet).slice(
          page * ICONS_PER_PAGE,
          (page + 1) * ICONS_PER_PAGE
        );

        return (
          <div key={iconSetName} className="flex flex-col justify-center items-center gap-4 rounded p-2">
            <Accordion
              spaceBetween={16}
              items={[
                {
                  open: page === 0,
                  name: iconSetName,
                  content: (
                      <div className="flex flex-col gap-1 w-full h-full justify-center items-center p-4">
                        <Input
                          extraCharWidth={10}
                          type="text"
                          placeholder={`Search in ${iconSetName}...`}
                          value={localSearchQueries[iconSetName] || ''}
                          onChange={(e) =>
                            setLocalSearchQueries({
                              ...localSearchQueries,
                              [iconSetName]: e.target.value,
                            })
                          }
                          className="w-full m-2 border border-gray-300 rounded"
                        />
                        <div className="grid grid-cols-6 gap-2 w-full h-full justify-center items-center">
                          {paginatedIcons.map(([IconName, Icon]: [string, any]) => (
                            <div
                              key={IconName}
                              className="flex bg-gray-600 bg-opacity-50 border border-gray-400 rounded shadow-2xl justify-center items-center overflow-hidden flex-shrink-0"
                            >
                              <div
                                className={cn(
                                  `flex flex-col items-center justify-center gap-1 w-full h-[${size + 32}px] p-1`
                                )}
                              >
                                {Icon && <Icon width={`${size}`} height={`${size}`} />}
                                <div className="flex flex-wrap break-all text-xs text-center justify-center items-center w-full h-12 overflow-hidden">
                                  {IconName}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-row gap-2 w-full justify-center items-center">
                          <Button variant="classic" onClick={() => handlePageChange(iconSetName, page - 1)}>
                            Previous
                          </Button>
                          <span className="text-sm">{getPageDisplay(iconSetName)}</span>
                          <Button variant="classic" onClick={() => handlePageChange(iconSetName, page + 1)}>
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
};

export default IconSetsPage;
