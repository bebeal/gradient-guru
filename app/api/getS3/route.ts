import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@/clients";

const handler = async (request: NextRequest) => {
  const s3Client = S3Client.getInstance();
  if (!s3Client) {
    return NextResponse.json({ error: 'Invalid S3 Client' }, { status: 500 });
  }
  const res = await request.json();

  if (request.method === 'POST') {
    const { id, version, versionId } = res;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    
    try {
      let response;
      if (versionId) {
        response = await s3Client.getObject(id, versionId);
      } else {
        response = await s3Client.get(id, version);
      }
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json(error.message, { status: error.statusCode || 500, statusText: error.message });
    }

  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}

export { handler as POST };
