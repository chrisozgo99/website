import type { PostsOrPages, Tag } from '@tryghost/content-api';
import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL || '',
  key: process.env.NEXT_PUBLIC_GHOST_KEY || '',
  version: 'v5.0',
});

export const POSTS_PER_PAGE = 4;

export async function getPosts(limit?: number) {
  return api.posts
    .browse({
      limit: limit || 'all',
      include: ['tags', 'authors'],
    })
    .then((posts: PostsOrPages) => {
      return posts;
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
  // turn tagslug into a tag slug if not already (remove spaces, lowercase, etc.)
  const slugify = tagSlug.replace(/\s+/g, '-').toLowerCase();
  console.log(slugify);

  return api.posts
    .browse({
      limit: limit || 'all',
      filter: `tag:${slugify}`,
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
  const slugify = tagSlug.replace(/\s+/g, '-').toLowerCase();
  return api.posts
    .browse({
      page,
      limit,
      filter: `tag:${slugify}`,
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

const orderedTags = [
  'Startups',
  'Coding',
  'Travel',
  'Fitness',
  'Current Events',
  'Other',
];

export async function getTags() {
  return api.tags
    .browse({
      limit: 'all',
    })
    .then((tags) => {
      console.log(tags);
      // Sort tags by order
      const sortedTags = tags.sort((a: Tag, b: Tag) => {
        return (
          orderedTags.indexOf(a.name || '') - orderedTags.indexOf(b.name || '')
        );
      });
      return sortedTags;
    })
    .catch((err) => {
      throw new Error(err);
    });
}
