/* eslint-disable react/no-unescaped-entities */

import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import BlogPreview from '@/components/blog-preview';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import {
  getMorePosts,
  getPosts,
  getTags,
  POSTS_PER_PAGE,
} from '@/lib/ghost-client';
import { Main } from '@/templates/Main';

export const getServerSideProps: GetServerSideProps = async () => {
  const postsPromise = getPosts(POSTS_PER_PAGE);
  const tagsPromise = getTags();

  const [posts, tags] = await Promise.all([postsPromise, tagsPromise]);

  if (!posts || !tags) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts, tags },
  };
};

interface BlogProps {
  posts: any;
  tags: any;
  test?: boolean;
}

const Blog = (props: BlogProps) => {
  const router = useRouter();
  const { posts, tags, test } = props;

  const [postList, setPostList] = useState(posts);
  const [pagination, setPagination] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [email, setEmail] = useState('');
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [message, setMessage] = useState('');

  async function getAdditionalPosts() {
    await getMorePosts(pagination).then((res) => {
      if (res.meta.pagination.page === res.meta.pagination.pages) {
        setHasMore(false);
      }
      setPostList([...postList, ...res]);
      setPagination(pagination + 1);
    });
  }

  return (
    <Main
      meta={
        <Meta
          title="Blog | Think Tank"
          description="Blog discussing startups, coding, fitness, travel, foreign policy, and more!"
        />
      }
    >
      <div className="flex h-full w-full flex-col items-center justify-center" />
      <div className="w-full flex-row sm:flex">
        <div className="bg-gray-400 px-4 sm:w-1/2 sm:pl-12">
          <div className="mb-4 sm:mt-20">
            <h1 className="pt-6 font-helvetica text-3xl font-bold sm:text-[3.5rem]">
              THINK TANK
            </h1>
          </div>
          <div>
            <h2 className="font-avenir text-base leading-7 sm:mr-12">
              Welcome to the Think Tank, my blog where I discuss topics such as
              startups, coding, travel, fitness, foreign policy, and much more!
            </h2>
          </div>
          <div>
            <button
              type="button"
              disabled
              className="my-4 py-2 font-raleway text-sm font-semibold hover:decoration-inherit sm:mt-6 sm:h-12"
            >
              <Link
                href="#tags"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = document.getElementById('tags');
                  if (targetId) {
                    targetId.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                Read More
              </Link>
            </button>
          </div>
        </div>
        <div className="sm:w-1/2">
          <Image
            width={400}
            height={400}
            priority
            src={`${test ? '/' : ''}${
              router.basePath
            }/assets/images/thinktank2.png`}
            alt="Think Tank logo"
            className="h-[230px] w-full object-cover sm:h-[400px]"
          />
        </div>
      </div>
      <div id="tags" className="flex flex-row overflow-x-scroll sm:ml-4">
        {[{ id: 'all', name: 'All Posts' }, ...tags].map((tag: any) => (
          <div key={tag.id}>
            <Link
              href={{
                pathname:
                  tag.name === 'All Posts' ? `/blog` : `/blog/${tag.slug}`,
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  tag.name === 'All Posts'
                    ? `/blog#tags`
                    : `/blog/${tag.slug}#tags`
                );
              }}
            >
              <h2 className="my-7 mr-10 w-full text-center font-avenir text-lg sm:text-left">
                {tag.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="-z-10 flex flex-wrap justify-between">
        <InfiniteScroll
          dataLength={postList.length}
          next={() => getAdditionalPosts()}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Thanks for scrolling! That's all for now!</b>
            </p>
          }
        >
          {postList.map((post: any, index: number) => {
            if (index % 2 === 0) {
              return (
                <div
                  className="-z-20 sm:flex sm:flex-row"
                  key={post.id + new Date().toLocaleDateString()}
                >
                  <div className="col-span-1 mb-8 w-fit sm:mx-7" key={post.id}>
                    <Link
                      className="w-fit"
                      href={{
                        pathname: `/blog/${post.primary_tag.slug}/${post.slug}`,
                      }}
                    >
                      <BlogPreview
                        excerpt={post.excerpt}
                        feature_image={post.feature_image}
                        feature_image_alt={post.feature_image_alt}
                        primary_author={post.primary_author}
                        primary_tag={post.primary_tag}
                        published_at={post.published_at}
                        reading_time={post.reading_time}
                        title={post.title}
                      />
                    </Link>
                  </div>
                  {postList[index + 1] && (
                    <div
                      className="col-span-2 mb-8 w-fit sm:mx-7"
                      key={postList[index + 1].id}
                    >
                      <Link
                        className="w-fit"
                        href={{
                          pathname: `/blog/${
                            postList[index + 1].primary_tag.slug
                          }/${postList[index + 1].slug}`,
                        }}
                      >
                        <BlogPreview
                          excerpt={postList[index + 1].excerpt}
                          feature_image={postList[index + 1].feature_image}
                          feature_image_alt={
                            postList[index + 1].feature_image_alt
                          }
                          primary_author={postList[index + 1].primary_author}
                          primary_tag={postList[index + 1].primary_tag}
                          published_at={postList[index + 1].published_at}
                          reading_time={postList[index + 1].reading_time}
                          title={postList[index + 1].title}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </InfiniteScroll>
        <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
        <div
          className={`transition-all duration-500 ${
            openSubscribe ? 'fixed z-50' : 'opacity-0'
          }`}
        >
          <SubscribeModal
            open={openSubscribe}
            setOpen={setOpenSubscribe}
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
                if (!response.ok) {
                  setEmail('');
                  setMessage('You are already subscribed!');
                } else {
                  response.json().then((data) => {
                    if (!data.error) {
                      setEmail('');
                      setMessage('Success! Thank you for subscribing!');
                    }
                  });
                }
              });
            }}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </Main>
  );
};

export default Blog;
