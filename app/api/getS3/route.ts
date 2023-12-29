import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@/clients";

const handler = async (request: NextRequest) => {
  const s3Client = S3Client.getInstance();
  if (!s3Client) {
    return NextResponse.json({ error: 'Invalid S3 Client' }, { status: 500 });
  }
  const res = await request.json();

  if (request.method === 'POST') {
    const { id } = res;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const response = await s3Client.get(id);
    return NextResponse.json(response, { status: 200 });

  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}

export { handler as POST };
