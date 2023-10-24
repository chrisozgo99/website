import { doc, getFirestore, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next/types';

import { getPosts } from '@/lib/ghost-client';
import { app as firebaseApp } from '@/utils/FirebaseConfig';

const db = getFirestore(firebaseApp);

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  getPosts()
    .then((posts: any) => {
      const json = { posts: [] };
      posts.forEach((post: any) => {
        json.posts.push(post as never);
      });

      json.posts.forEach(async (post: any) => {
        await setDoc(doc(db, 'posts', post.id), post).catch((error) => {
          throw new Error(error);
        });
      });

      res.status(200).json('Posts updated');
    })
    .catch((error: any) => {
      res.status(500).json({ error: error.message });
    });
}
