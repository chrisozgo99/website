import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL as string,
  key: process.env.NEXT_PUBLIC_GHOST_KEY as string,
  version: 'v5.0',
});

export async function getPosts() {
  return api.posts
    .browse({
      limit: 'all',
      include: ['tags', 'authors'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getTags() {
  return api.tags
    .browse({
      limit: 'all',
    })
    .catch((err) => {
      throw new Error(err);
    });
}
