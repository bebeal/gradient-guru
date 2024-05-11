// api/tweet/[id].ts

import { getTweet } from 'react-tweet/api';

const handler = async (request: Request): Promise<Response> => {
  try {
    // const { id } = request.params;
    console.log('id:', request.body);
    const id: string = '0';
    const tweet = await getTweet(id);
    // useTweet requires this be inside of `data` property
    return new Response(JSON.stringify({ data: tweet ? tweet : null }), { status: tweet ? 200 : 404 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), { status: 500 });
  }
};

export default handler;
