'use client'

import { Button, IconSetCache, Input } from "@/components";
import { useParams } from "next/navigation";
import { useState } from "react";

const ICONS_PER_PAGE = 50;

const IconSetPage = () => {
  const { set } = useParams<{ set: string }>();
  const [width, setWidth] = useState<number | string>(32);
  const [height, setHeight] = useState<number | string>('100%');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const IconSet = IconSetCache[set];

  const handlePageChange = (newPage: number) => {
    const totalIcons = Object.keys(IconSet).length;
    const totalPages = Math.ceil(totalIcons / ICONS_PER_PAGE);

    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }

    setCurrentPage(newPage);
  };

  const getPageDisplay = (): string => {
    const totalIcons = Object.keys(IconSet).length;
    const totalPages = Math.ceil(totalIcons / ICONS_PER_PAGE);
    return `Page ${currentPage + 1} of ${totalPages}`;
  };

  const filteredIcons = Object.entries(IconSet).filter(([iconName]) =>
    iconName.toLowerCase().includes(localSearchQuery.toLowerCase())
  ).slice(
    currentPage * ICONS_PER_PAGE,
    (currentPage + 1) * ICONS_PER_PAGE
  );

  let iconProps = {};
  if (typeof width === 'number') {
    iconProps = { ...iconProps, width };
  }
  if (typeof height === 'number') {
    iconProps = { ...iconProps, height };
  }

  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto gap-4 p-4`}>
      <div className="flex flex-row justify-center items-center gap-2">
        <Input
          className="w-full h-full p-2 px-10 text-base bg-gray-600 bg-opacity-50 border border-gray-400 rounded shadow-2xl"
          placeholder="Search..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        />
        <Input
          extraCharWidth={10}
          type="text"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="w-auto ml-2 border border-gray-300 rounded"
        />
        <Input
          extraCharWidth={10}
          type="text"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-auto ml-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-6 gap-2 w-full h-auto justify-center items-stretch auto-rows-fr overflow-auto">
        {filteredIcons.map(([IconName, IconFromSet]: [string, any]) => (
          <div key={IconName} className="flex flex-col bg-gray-600 bg-opacity-50 border border-gray-400 rounded shadow-2xl overflow-auto h-full justify-center">
            <div className="flex flex-col items-center w-full h-full p-1 overflow-hidden">
              {IconFromSet && <IconFromSet {...iconProps} />}
              <div className="text-xs w-full flex text-center justify-center items-end">
                {IconName}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 w-full justify-center items-center">
        <Button variant="classic" onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </Button>
        <span className="text-sm">{getPageDisplay()}</span>
        <Button variant="classic" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
};

export default IconSetPage;
