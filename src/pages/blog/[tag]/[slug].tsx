import { DiscussionEmbed } from 'disqus-react';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { BlogPost } from '@/components/blog-post';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import { getPosts, getSinglePost } from '@/lib/ghost-client';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

type IBlogUrl = {
  tag: string;
  slug: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  try {
    const posts = await getPosts();

    // If no posts are available, return empty paths
    if (!posts || posts.length === 0) {
      console.warn('No posts available for static path generation');
      return {
        paths: [],
        fallback: false,
      };
    }

    return {
      paths: posts.map((post: any) => ({
        params: {
          tag: post.primary_tag?.slug || 'uncategorized',
          slug: post.slug,
        },
      })),
      fallback: false,
    };
  } catch (error) {
    console.warn('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const post = await getSinglePost(context.params?.slug as string);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: { post },
    };
  } catch (error) {
    console.warn('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { post } = props;

  const { html }: { html: string } = post;

  const [openSubscribe, setOpenSubscribe] = useState(false);
  const newHtml = html
    .replaceAll('<p>', '<p class="mb-8">')
    .replaceAll(
      '<figcaption>',
      '<figcaption class="text-center text-sm text-[rgb(151,151,151)] mt-2 mb-8">'
    )
    .replaceAll(
      '<img',
      '<img class="w-full mx-auto max-h-[36rem] sm:w-[90%] my-4 object-cover"'
    )
    .replaceAll('<li>', '<li class="list-disc list-outside mb-3 ml-6">')
    .replaceAll('<a href', '<a class="text-blue-500 underline" href')
    .replaceAll('<h2', '<h2 class="text-[32px] font-bold mb-4"')
    .replaceAll('<h3', '<h3 class="text-[24px] font-bold mb-4"');

  return (
    <Main
      meta={<Meta title={post.title} description={post.meta_description} />}
    >
      <div className="mb-14">
        <BlogPost
          post={post}
          newHtml={newHtml}
          onClick={() => {
            if (router.asPath === '/blog' || window.history.length === 1) {
              router.push('/blog');
            } else {
              router.back();
            }
          }}
        />
      </div>
      <div className="mx-auto w-4/5">
        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME as string}
          config={{
            url: `${AppConfig.url}/${router.asPath}`,
            identifier: post.id,
            title: post.title,
            language: 'en',
          }}
        />
      </div>

      <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
      <div
        className={`transition-all duration-500 ${
          openSubscribe ? 'fixed z-50' : 'opacity-0'
        }`}
      >
        <SubscribeModal open={openSubscribe} setOpen={setOpenSubscribe} />
      </div>
    </Main>
  );
};

export default Post;
