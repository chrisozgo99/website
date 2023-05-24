import GhostContentAPI from '@tryghost/content-api';

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

export async function getPostsWithTag(tagSlug: string) {
  return api.posts
    .browse({
      limit: 'all',
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getSinglePost(postSlug: string) {
  return api.posts
    .read(
      {
        slug: postSlug,
      },
      {
        include: ['tags', 'authors'],
      }
    )
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
