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
      const [posts1, posts2] = await Promise.allSettled([
        api.posts.browse({
          limit: 'all',
          include: ['tags', 'authors'],
        }),
        api2.posts.browse({
          limit: 'all',
          include: ['tags', 'authors'],
        }),
      ]);

      const successfulPosts1 =
        posts1.status === 'fulfilled' ? posts1.value : [];
      const successfulPosts2 =
        posts2.status === 'fulfilled' ? posts2.value : [];

      return [...successfulPosts1, ...successfulPosts2];
    }
    // With limit, just get from first API since it has most recent posts
    return await api.posts
      .browse({
        limit,
        include: ['tags', 'authors'],
      })
      .then((posts: PostsOrPages) => posts)
      .catch((err) => {
        console.warn('Failed to fetch posts from first API:', err.message);
        // Try second API as fallback
        return api2.posts
          .browse({
            limit,
            include: ['tags', 'authors'],
          })
          .catch((err2) => {
            console.warn(
              'Failed to fetch posts from second API:',
              err2.message
            );
            return []; // Return empty array if both APIs fail
          });
      });
  } catch (err) {
    console.warn(
      'getPosts error:',
      err instanceof Error ? err.message : String(err)
    );
    return []; // Return empty array to prevent build failure
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

    // Try first API
    const posts1 = await api.posts
      .browse({
        limit,
        filter: `tag:${slugify}`,
        include: ['tags', 'authors'],
      })
      .catch(() => ({ length: 0 })); // Return empty object if no posts found

    // If we got enough posts from first API, return them
    if (posts1.length >= limit) {
      return posts1;
    }

    // If we got some posts from first API but not enough
    if (posts1.length > 0) {
      const remainingLimit = limit - posts1.length;
      const posts2 = await api2.posts
        .browse({
          limit: remainingLimit,
          filter: `tag:${slugify}`,
          include: ['tags', 'authors'],
        })
        .catch(() => []); // Return empty array if no posts found

      return [...(posts1 as any), ...posts2];
    }

    // If first API returned no posts, try second API
    return await api2.posts.browse({
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
    // Get total posts from first API for this tag
    const firstApiTotal = await api.posts
      .browse({
        limit: 1,
        filter: `tag:${slugify}`,
        include: ['tags', 'authors'],
      })
      .then((res) => res.meta.pagination.total)
      .catch(() => 0); // If error, assume 0 posts in first API

    const startIndex = (page - 1) * limit;

    // If we haven't exhausted first API's tagged posts yet
    if (startIndex < firstApiTotal) {
      const remainingInFirstApi = firstApiTotal - startIndex;

      // If we can get all posts needed from first API
      if (remainingInFirstApi >= limit) {
        return await api.posts.browse({
          page,
          limit,
          filter: `tag:${slugify}`,
          include: ['tags', 'authors'],
        });
      }

      // If we need posts from both APIs
      const posts1 = await api.posts.browse({
        page,
        limit: remainingInFirstApi,
        filter: `tag:${slugify}`,
        include: ['tags', 'authors'],
      });

      const posts2 = await api2.posts.browse({
        page: 1,
        limit: limit - remainingInFirstApi,
        filter: `tag:${slugify}`,
        include: ['tags', 'authors'],
      });

      return [...posts1, ...posts2];
    }

    // If we need posts only from second API
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
    } catch (error) {
      console.warn(`Post not found in first API: ${postSlug}`, error);
      // If not found, try second API
      try {
        return await api2.posts.read(
          { slug: postSlug },
          { include: ['tags', 'authors'] }
        );
      } catch (error2) {
        console.warn(`Post not found in second API: ${postSlug}`, error2);
        return null; // Return null if post not found in either API
      }
    }
  } catch (err) {
    console.warn(
      'getSinglePost error:',
      err instanceof Error ? err.message : String(err)
    );
    return null; // Return null to prevent build failure
  }
}
