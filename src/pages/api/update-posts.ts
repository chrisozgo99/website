import { doc, getFirestore, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getPosts } from '@/lib/ghost-client';
import { app as firebaseApp } from '@/utils/FirebaseConfig';

const db = getFirestore(firebaseApp);

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

      // Update the posts collection in firestore
      json.posts.forEach(async (post: any) => {
        await setDoc(doc(db, 'posts', post.id), post).catch((error) => {
          throw new Error(error);
        });
      });

      response.status(200).json('Posts updated');
    })
    .catch((error: any) => {
      response.status(500).json({ error: error.message });
    });
}
