import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Meta } from '@/layouts/Meta';
import { getPosts, getSinglePost } from '@/lib/ghost-client';
import { Main } from '@/templates/Main';

type IBlogUrl = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post: any) => ({
      params: {
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

  const newHtml = html
    .replaceAll('<p>', '<p class="mb-6">')
    .replaceAll(
      '<figcaption>',
      '<figcaption class="text-center text-sm text-[rgb(151,151,151)] mt-2 mb-6">'
    )
    .replaceAll(
      '<img',
      '<img class="w-full mx-auto max-h-[36rem] sm:w-[90%] my-4 object-cover"'
    )
    .replaceAll('<li>', '<li class="list-disc list-outside mb-3">');

  return (
    <Main
      meta={<Meta title={post.title} description={post.meta_description} />}
    >
      <div>
        <div className="mx-[5%] pb-10 sm:mx-[15%] sm:pb-14">
          <div>
            {post.primary_tag && (
              <h1 className="mb-4 text-base font-bold text-[rgb(151,151,151)]">
                {post.primary_tag.name}
              </h1>
            )}
          </div>
          <div>
            <h1 className="mb-4 font-helvetica text-[32px] font-extrabold leading-8 sm:text-5xl sm:leading-none">
              {post.title}
            </h1>
          </div>
          <div className="flex flex-row items-center">
            <div>
              <img
                className="h-[52px] w-[52px] rounded-full"
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
              />
            </div>
            <div className="ml-3">
              <div className="items-center">
                <div className="font-helvetica text-base font-bold">
                  {post.primary_author.name}
                </div>
                <div className="text-sm text-[rgb(151,151,151)]">
                  {new Date(
                    0,
                    new Date(post.published_at).getMonth()
                  ).toLocaleString('en', { month: 'short' })}{' '}
                  {new Date(post.published_at).getDate()}
                  {`, ${new Date(post.published_at).getFullYear()}`}
                  {` • ${post.reading_time} min read`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {post.feature_image && (
          <div className="justify-center pb-14">
            <img
              className="max-h-[36rem] w-full object-cover sm:mx-[5%] sm:w-[90%]"
              src={post.feature_image}
              alt={post?.feature_image_alt}
            />
          </div>
        )}
        <div
          className="mx-[5%] justify-center font-avenir sm:mx-[15%]"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: newHtml }}
          style={{}}
        />
      </div>
    </Main>
  );
};

export default Post;
