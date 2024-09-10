'use client'

import { MapshotManifest } from '@/utils/mapshot';
import { Suspense, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Erroring, Loading } from '../Primitives';
import { CreditBadge } from '../Credit/CreditBadge';
const MapshotViewer = dynamic(() => import('./MapshotViewer'));

export interface MapshotProps {
  mapshot: string;
}

export const Mapshot: React.FC<MapshotProps> = ({ mapshot }) => {
  const [manifest, setManifest] = useState<MapshotManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mapshot) return;
    setManifest(null);
    setError(null);
    const url = new URL('/api/mapshot-manifest', window.location.origin);
    url.searchParams.append('mapshot', mapshot);
    fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
        }
        const manifest = await response.json();
        setManifest(manifest);
      })
      .catch(error => {
        console.error('Error fetching mapshot manifest:', error);
        setError(error);
      });
  }, [mapshot]);

  const map = useMemo(() => {
    if (!mapshot) return <div>No mapshot specified</div>;
    if (error) return <Erroring error={error} />;
    if (!manifest || !mounted) return <Loading />;
    return <MapshotViewer mapshot={mapshot} manifest={manifest} />;
  }, [mapshot, error, manifest, mounted]);

  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center">
      <Suspense fallback={<Loading />}>
        {map}
      </Suspense>
      <div className="absolute bottom-2 left-2 z-[9999]">
      <CreditBadge text={"mapshot"} link={"https://github.com/Palats/mapshot"} />
      </div>
    </div>
  );
};
