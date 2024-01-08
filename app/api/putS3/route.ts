import { S3Client } from "@/clients";
import { NextRequest, NextResponse } from "next/server";

const handler = async (request: NextRequest) => {
  const s3Client = S3Client.getInstance();
  if (!s3Client) {
    return Response.json({ error: 'Invalid S3 Client' }, { status: 500 });
  }

  const res = await request.json();

  if (request.method === 'POST') {
    const { id, html, source, version } = res;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    } else if (!html) {
      return NextResponse.json({ error: 'html is required' }, { status: 400 });
    } else if (!source) {
      return NextResponse.json({ error: 'source is required' }, { status: 400 });
    }

    const response = await s3Client.put(id, res);
    return NextResponse.json(response, { status: 200 });

  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}

export { handler as POST };
