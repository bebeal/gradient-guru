
import { NextRequest, NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

const handler = async ( request: NextRequest, { params }: { params: { id: string } } ) => {
  try {
    const id = params?.id || (await (request.json() as any)?.id);
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const tweet = await getTweet(id);
    // useTweet requires this be inside of `data` property
    return NextResponse.json({ data: tweet ?? null }, { status: tweet ? 200 : 404});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message, { status: error.statusCode || 500, statusText: error.message });
  }
}

export { handler as POST, handler as GET };
