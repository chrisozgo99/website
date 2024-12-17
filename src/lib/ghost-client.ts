import type { PostsOrPages } from '@tryghost/content-api';
import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL || '',
  key: process.env.NEXT_PUBLIC_GHOST_KEY || '',
  version: 'v5.0',
});

const api2 = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL_2 || '',
  key: process.env.NEXT_PUBLIC_GHOST_KEY_2 || '',
  version: 'v5.0',
});

export const POSTS_PER_PAGE = 4;

// Helper to get total posts count from first API
async function getFirstApiTotalPosts() {
  const response = await api.posts.browse({
    limit: 1,
    include: ['tags', 'authors'],
  });
  return response.meta.pagination.total;
}

export async function getPosts(limit?: number) {
  try {
    if (!limit) {
      // If no limit, get all posts from both APIs
      const [posts1, posts2] = await Promise.all([
        api.posts.browse({
          limit: 'all',
          include: ['tags', 'authors'],
        }),
        api2.posts.browse({
          limit: 'all',
          include: ['tags', 'authors'],
        }),
      ]);
      return [...posts1, ...posts2];
    }
    // With limit, just get from first API since it has most recent posts
    return await api.posts
      .browse({
        limit,
        include: ['tags', 'authors'],
      })
      .then((posts: PostsOrPages) => posts)
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function getMorePosts(
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  try {
    const firstApiTotal = await getFirstApiTotalPosts();
    const startIndex = (page - 1) * limit;

    // If we haven't exhausted first API yet
    if (startIndex < firstApiTotal) {
      return await api.posts
        .browse({
          page,
          limit,
          include: ['tags', 'authors'],
        })
        .then((posts: PostsOrPages) => posts)
        .catch((err) => {
          throw new Error(err);
        });
    }

    // If we need posts from second API
    const adjustedPage = Math.floor((startIndex - firstApiTotal) / limit) + 1;
    return await api2.posts
      .browse({
        page: adjustedPage,
        limit,
        include: ['tags', 'authors'],
      })
      .then((posts: PostsOrPages) => posts)
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function getPostsWithTag(tagSlug: string, limit?: number) {
  const slugify = tagSlug.replace(/\s+/g, '-').toLowerCase();
  try {
    if (!limit) {
      // If no limit, get all tagged posts from both APIs
      const [posts1, posts2] = await Promise.all([
        api.posts.browse({
          limit: 'all',
          filter: `tag:${slugify}`,
          include: ['tags', 'authors'],
        }),
        api2.posts.browse({
          limit: 'all',
          filter: `tag:${slugify}`,
          include: ['tags', 'authors'],
        }),
      ]);
      return [...posts1, ...posts2];
    }

    // With limit, just get from first API
    return await api.posts.browse({
      limit,
      filter: `tag:${slugify}`,
      include: ['tags', 'authors'],
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function getMorePostsWithTag(
  tagSlug: string,
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  const slugify = tagSlug.replace(/\s+/g, '-').toLowerCase();
  try {
    // First get total tagged posts from first API
    const firstApiTagged = await api.posts.browse({
      limit: 1,
      filter: `tag:${slugify}`,
      include: ['tags', 'authors'],
    });
    const firstApiTotal = firstApiTagged.meta.pagination.total;
    const startIndex = (page - 1) * limit;

    // If we haven't exhausted first API's tagged posts yet
    if (startIndex < firstApiTotal) {
      return await api.posts.browse({
        page,
        limit,
        filter: `tag:${slugify}`,
        include: ['tags', 'authors'],
      });
    }

    // If we need tagged posts from second API
    const adjustedPage = Math.floor((startIndex - firstApiTotal) / limit) + 1;
    return await api2.posts.browse({
      page: adjustedPage,
      limit,
      filter: `tag:${slugify}`,
      include: ['tags', 'authors'],
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function getSinglePost(postSlug: string) {
  try {
    // Try first API
    try {
      return await api.posts.read(
        { slug: postSlug },
        { include: ['tags', 'authors'] }
      );
    } catch {
      // If not found, try second API
      return await api2.posts.read(
        { slug: postSlug },
        { include: ['tags', 'authors'] }
      );
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}
