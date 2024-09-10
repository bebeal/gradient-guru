// app/api/mapshot-tile

import { NextRequest, NextResponse } from 'next/server';
import { MapshotS3Client } from '@/clients/AWS/MapshotS3Client';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const mapshot = url.searchParams.get('mapshot');
  const prefix = url.searchParams.get('prefix');
  const z = url.searchParams.get('z');
  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');
  if (!mapshot || !prefix || !x || !y || !z) {
    return NextResponse.json({ error: 'All query parameters (mapshot, prefix, z, x, y) are required' }, { status: 400 });
  }

  try {
    const mapshotClient = MapshotS3Client.getInstance();
    const tile = await mapshotClient.getMapshotTile(mapshot, prefix, z, x, y);
    return  new NextResponse(tile, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching mapshot tile:', error);
    return NextResponse.json({ error: 'Failed to fetch mapshot tile' }, { status: 500 });
  }
}
