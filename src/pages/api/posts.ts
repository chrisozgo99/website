import type { NextApiRequest, NextApiResponse } from 'next';

import { getPosts } from '@/lib/ghost-client';

const fs = require('fs');

export default function getJsonPosts(
  _: NextApiRequest,
  response: NextApiResponse
) {
  getPosts()
    .then((posts: any) => {
      const json = { posts: [] };
      posts.forEach((post: any) => {
        json.posts.push(post as never);
      });

      fs.writeFileSync('public/posts.json', JSON.stringify(json, null, 2));

      response.status(200).json(posts);
    })
    .catch((error: any) => {
      response.status(500).json({ error: error.message });
    });
}
