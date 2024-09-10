// app/api/mapshot-manifest

import { NextRequest, NextResponse } from 'next/server';
import { MapshotS3Client } from '@/clients/AWS/MapshotS3Client';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const mapshot = url.searchParams.get('mapshot');
  if (!mapshot) {
    return NextResponse.json({ error: 'Mapshot parameter is required' }, { status: 400 });
  }

  try {
    const mapshotClient = MapshotS3Client.getInstance();
    const manifest = await mapshotClient.getMapshotManifest(mapshot);
    return NextResponse.json(manifest);
  } catch (error) {
    console.error('Error fetching mapshot manifest:', error);
    return NextResponse.json({ error: 'Failed to fetch mapshot manifest' }, { status: 500 });
  }
}
