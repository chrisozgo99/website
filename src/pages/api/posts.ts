import type { NextApiRequest, NextApiResponse } from 'next';

import { getPosts } from '@/lib/ghost-client';

export default function getJsonPosts(
  _: NextApiRequest,
  response: NextApiResponse
) {
  getPosts()
    .then((posts: any) => {
      response.status(200).json(posts);
    })
    .catch((error: any) => {
      response.status(500).json({ error: error.message });
    });
}
