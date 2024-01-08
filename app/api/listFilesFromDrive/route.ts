
import { GDriveClient } from "@/clients";
import { getSessionServerSide } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const handler = async (request: NextRequest) => {
  const session = await getSessionServerSide();
  const gDriveClient = GDriveClient.getInstance(session);
  if (!gDriveClient) {
    return Response.json({ error: 'Invalid Google Drive Client' }, { status: 500 });
  }

  const files = await gDriveClient.listFiles();
  console.log('files', files);
  return NextResponse.json(files);
}

export { handler as POST, handler as GET };
