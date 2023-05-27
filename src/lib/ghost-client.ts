import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL as string,
  key: process.env.NEXT_PUBLIC_GHOST_KEY as string,
  version: 'v5.0',
});

export const POSTS_PER_PAGE = 4;

export async function getPosts(limit?: number) {
  return api.posts
    .browse({
      limit: limit || 'all',
      include: ['tags', 'authors'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getMorePosts(
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  return api.posts
    .browse({
      page,
      limit,
      include: ['tags', 'authors'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPostsWithTag(tagSlug: string, limit?: number) {
  return api.posts
    .browse({
      limit: limit || 'all',
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getMorePostsWithTag(
  tagSlug: string,
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  return api.posts
    .browse({
      page,
      limit,
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
