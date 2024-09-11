'use client'

import { useEffect, useState } from "react";
import { Erroring, Loading } from "../Primitives";
import { cn } from "@/utils";
import { DemoCard } from "../Random/Misc/DemoCard";

interface MapshotMetadata {
  name: string;
  description: string;
  preview: string;
}

export const MapshotList: React.FC = () => {
  const title = 'Mapshots';
  const [mapshots, setMapshots] = useState<MapshotMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/mapshots')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch mapshots');
        }
        return response.json();
      })
      .then(data => {
        setMapshots(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching mapshots:', error);
        setMapshots([]);
        setError(error);
  });
  }, []);

  if (error) {
    return <Erroring error={error} />;
  }
  if (mapshots?.length === 0) {
    return <Loading />;
  }
  console.log(mapshots);
  return (
    <div className="relative flex flex-col gap-2 h-full w-full justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className={cn(`flex justify-center items-center gap-10 flex-wrap p-2 w-full`)}>
        {!error && mapshots?.map((mapshot, index) => (
          <DemoCard key={`mapshot-${index}`} content={<img src={mapshot.preview} alt={'mapshot preview'} className="object-contain w-full h-full rounded-xl max-h-[180px]" />} className={"min-w-[300px]"} title={mapshot.name} pinContent={'Click to open in new tab'} description={mapshot.description} href={`/mapshot/${mapshot.name}`} />
        ))}
      </div>
  </div>
  );
};
