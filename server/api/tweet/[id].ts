// api/tweet/[id].ts

import { getTweet } from 'react-tweet/api';
import { Request, Response } from 'express';

const handler = async (request: Request, response: Response) => {
  try {
    // const { id } = request.params;
    const { id } = request.params;
    const tweet = await getTweet(id);
    // useTweet requires this be inside of `data` property
    response.json({ data: tweet ? tweet : null });
  } catch (error: any) {
    console.error(error);
    response.status(500).json({ error: error?.message });
  }
};

export default handler;
