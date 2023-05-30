import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useState } from 'react';

import { BlogPost } from '@/components/blog-post';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-model';
import { Meta } from '@/layouts/Meta';
import { getPosts, getSinglePost } from '@/lib/ghost-client';
import { Main } from '@/templates/Main';

type IBlogUrl = {
  tag: string;
  slug: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post: any) => ({
      params: {
        tag: post.primary_tag.slug,
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getSinglePost(context.params?.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { post } = props;

  const { html }: { html: string } = post;

  const [email, setEmail] = useState('');
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [message, setMessage] = useState('');

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
    .replaceAll('<a href', '<a class="text-blue-500 underline" href');

  return (
    <Main
      meta={<Meta title={post.title} description={post.meta_description} />}
    >
      <div
        className={`transition-all duration-500 ${
          openSubscribe ? 'fixed z-50' : 'opacity-0'
        }`}
      >
        <SubscribeModal
          open={openSubscribe}
          setOpen={setOpenSubscribe}
          message={message}
          setMessage={setMessage}
          email={email}
          setEmail={setEmail}
          onClick={() => {
            fetch('/api/subscribe', {
              body: JSON.stringify({
                email,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            }).then((response) => {
              response.json().then((data) => {
                if (!data.error) {
                  setEmail('');
                  setMessage('Success! Thank you for subscribing!');
                }
              });
            });
          }}
        />
      </div>
      <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
      <BlogPost post={post} newHtml={newHtml} />
    </Main>
  );
};

export default Post;
