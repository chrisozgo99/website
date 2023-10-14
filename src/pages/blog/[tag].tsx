/* eslint-disable react/no-unescaped-entities */
import type { MultipleQueriesQuery } from '@algolia/client-search';
import algoliasearch from 'algoliasearch';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { SearchBoxProps } from 'react-instantsearch';
import {
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch';

import BlogPreview from '@/components/blog-preview';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import {
  getMorePostsWithTag,
  getPostsWithTag,
  getTags,
  POSTS_PER_PAGE,
} from '@/lib/ghost-client';
import { Main } from '@/templates/Main';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { tag } = params as { tag: string };

  const tagsPromise = getTags();
  const postsPromise = getPostsWithTag(tag.toString(), POSTS_PER_PAGE);

  const [posts, tags] = await Promise.all([postsPromise, tagsPromise]);

  if (!tags) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts, tag, tags },
  };
};

function Hit({ hit }: any) {
  return (
    <div className="col-span-1 mb-8 w-fit sm:mx-7">
      <Link
        className="w-fit"
        href={{
          pathname: `/blog/${hit.primary_tag.slug}/${hit.slug}`,
        }}
      >
        <BlogPreview
          excerpt={hit.excerpt}
          feature_image={hit.feature_image}
          feature_image_alt={hit.feature_image_alt}
          primary_author={hit.primary_author}
          primary_tag={hit.primary_tag}
          published_at={hit.published_at}
          reading_time={hit.reading_time}
          title={hit.title}
        />
      </Link>
    </div>
  );
}

function EmptyQueryBoundary({ children, postList }: any) {
  const { indexUiState } = useInstantSearch();

  const results = postList.map((post: any, index: number) => {
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
                  pathname: `/blog/${postList[index + 1].primary_tag.slug}/${
                    postList[index + 1].slug
                  }`,
                }}
              >
                <BlogPreview
                  excerpt={postList[index + 1].excerpt}
                  feature_image={postList[index + 1].feature_image}
                  feature_image_alt={postList[index + 1].feature_image_alt}
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
    return children;
  });

  if (!indexUiState.query) {
    return results;
  }

  return children;
}

const Blog = (props: any) => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const searchClient = {
    ...algoliaClient,
    search(queries: readonly MultipleQueriesQuery[]): Promise<any> {
      if (queries.every(({ params }) => !params?.query)) {
        return Promise.resolve({
          results: queries.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return algoliaClient.search(queries);
    },
  };

  const router = useRouter();

  const { posts, tag, tags } = props;

  const [postList, setPostList] = useState(posts);
  const [pagination, setPagination] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [openSubscribe, setOpenSubscribe] = useState(false);

  useEffect(() => {
    setPostList(posts);
    setHasMore(true);
    setPagination(2);
  }, [posts]);

  async function getAdditionalPosts() {
    await getMorePostsWithTag(tag, pagination).then((res) => {
      if (res.meta.pagination.page >= res.meta.pagination.pages) {
        setHasMore(false);
      }
      setPostList(
        [...postList, ...res].filter((post) => {
          return post.primary_tag.slug === tag;
        })
      );
      setPagination(pagination + 1);
    });
  }

  return (
    <Main
      meta={
        <Meta
          title={`${
            tag[0].toUpperCase() + tag.substr(1, tag.length - 1)
          } Blog Posts - Think Tank`}
          description={`Blog posts about ${tag}!`}
        />
      }
    >
      <InstantSearch
        indexName="post"
        searchClient={searchClient}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <div className="w-full flex-row sm:flex">
          <div className="bg-gray-400 px-4 sm:w-1/2 sm:pl-12">
            <div className="mb-4 sm:mt-20">
              <h1 className="pt-6 font-helvetica text-3xl font-bold sm:text-[3.5rem]">
                THINK TANK
              </h1>
            </div>
            <div>
              <p className="font-avenir text-base leading-7 sm:mr-12">
                Welcome to the Think Tank, my blog where I discuss topics such
                as startups, coding, travel, fitness, current events, and much
                more!
              </p>
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
              priority
              width={400}
              height={400}
              src={`${router.basePath}/assets/images/thinktank2.png`}
              alt="Think Tank logo"
              className="h-[230px] w-full object-cover sm:h-[400px]"
            />
          </div>
        </div>
        <div
          id="tags"
          className="flex flex-row items-center overflow-x-scroll sm:ml-4"
        >
          {[{ id: 'all', name: 'All Posts' }, ...tags].map((category: any) => (
            <div key={category.id}>
              <Link
                href={{
                  pathname:
                    category.name === 'All Posts'
                      ? `/blog`
                      : `/blog/${category.slug}`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    category.name === 'All Posts'
                      ? `/blog#tags`
                      : `/blog/${category.slug}#tags`
                  );
                }}
              >
                {category.name === 'Current Events' ||
                category.name === 'All Posts' ? (
                  <h2 className="mx-4 my-7 flex w-max text-center font-avenir text-lg sm:text-center">
                    {category.name}
                  </h2>
                ) : (
                  <h2 className="mx-4 my-7 text-center font-avenir text-lg sm:text-center">
                    {category.name}
                  </h2>
                )}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-center border py-2 sm:mr-4 sm:w-1/2 sm:justify-end sm:border-0">
          <SearchBox
            classNames={{
              root: 'display-flex flex-row justify-center border-2 border-gray-400 rounded-md outline-none mr-4',
              input:
                'pl-4 pt-2 pb-2 text-sm placeholder-gray-400 outline-none rounded-md',
              form: 'flex flex-row justify-center rounded-md',
              submit: 'p-2 text-sm outline-none rounded-md',
              reset: 'hidden',
              loadingIndicator: 'hidden',
            }}
            placeholder="Search"
            {...(props as SearchBoxProps)}
          />
        </div>
        <div className="flex flex-wrap justify-between">
          <InfiniteScroll
            dataLength={postList.length}
            next={() => getAdditionalPosts()}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
            endMessage={
              postList.length >= POSTS_PER_PAGE && (
                <p style={{ textAlign: 'center' }}>
                  <b>Thanks for scrolling! That's all for now!</b>
                </p>
              )
            }
          >
            <div className="flex flex-wrap justify-between">
              <EmptyQueryBoundary postList={postList}>
                <Hits
                  hitComponent={Hit}
                  classNames={{
                    list: 'flex flex-wrap',
                  }}
                />
              </EmptyQueryBoundary>
            </div>
          </InfiniteScroll>
          <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
          <div
            className={`transition-all duration-500 ${
              openSubscribe ? 'fixed z-50' : 'opacity-0'
            }`}
          >
            <SubscribeModal open={openSubscribe} setOpen={setOpenSubscribe} />
          </div>
        </div>
      </InstantSearch>
    </Main>
  );
};

export default Blog;
