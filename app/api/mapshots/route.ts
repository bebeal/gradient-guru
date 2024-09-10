// /api/mapshots

import { MapshotS3Client } from '@/clients/AWS/MapshotS3Client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mapshotClient = MapshotS3Client.getInstance();
    const mapshots = await mapshotClient.getMapshots();
    return NextResponse.json(mapshots);
  } catch (error) {
    console.error('Error fetching mapshots:', error);
    return NextResponse.json({ error: 'Failed to fetch mapshots' }, { status: 500 });
  }
}
