/* eslint-disable react/no-unescaped-entities */
import type { MultipleQueriesQuery } from '@algolia/client-search';
import algoliasearch from 'algoliasearch';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Hits, InstantSearch, useInstantSearch } from 'react-instantsearch';

import BlogPreview from '@/components/blog-preview';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Tags } from '@/components/tags';
import { Meta } from '@/layouts/Meta';
import {
  getMorePostsWithTag,
  getPostsWithTag,
  POSTS_PER_PAGE,
} from '@/lib/ghost-client';
import { Main } from '@/templates/Main';
import { tagHierarchy } from '@/utils/tags';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { tag } = params as { tag: string };

  return {
    props: { tag },
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
          className="sm:flex sm:flex-row"
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
  const algoliaClient = useMemo(
    () =>
      algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
      ),
    []
  );

  const searchClient = useMemo(
    () => ({
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
    }),
    [algoliaClient]
  );

  const router = useRouter();

  const { tag } = props;

  const [postList, setPostList] = useState([]);
  const [tags, setTags] = useState([]);
  const [pagination, setPagination] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTag, setDropdownTag] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (selectedTag !== 'All Posts') {
      const postsPromise: any = getPostsWithTag(
        selectedTag || tag,
        POSTS_PER_PAGE
      );
      const tagsPromise: any = Object.keys(tagHierarchy);
      Promise.all([postsPromise, tagsPromise]).then(([postsRes, tagsRes]) => {
        if (postsRes) {
          setPostList(postsRes);
        } else {
          setPostList([]);
        }
        setTags(tagsRes);
        setPagination(2);
        setHasMore(true);
      });
    }
  }, [selectedTag, refresh, tag]);

  async function getAdditionalPosts() {
    await getMorePostsWithTag(selectedTag || tag, pagination)
      .then((res: any) => {
        if (!res || res.length === 0) {
          setHasMore(false);
          return;
        }

        setPostList([...(postList as never), ...(res as never)]);
        setPagination(pagination + 1);
      })
      .catch(() => {
        setHasMore(false);
      });
  }

  const tagName = tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <Main
      meta={
        <Meta
          title={`${selectedTag || tagName} - Think Tank Blog`}
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
                as tech, fitness, travel, and more!
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
        <Tags
          tags={tags}
          dropdownTag={dropdownTag}
          setDropdownTag={setDropdownTag}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          setSelectedTag={setSelectedTag}
          setRefresh={setRefresh}
        />
        <div className="flex w-full flex-col flex-wrap">
          <InfiniteScroll
            dataLength={postList.length}
            next={() => {
              if (postList.length !== 0) {
                getAdditionalPosts();
              }
            }}
            hasMore={hasMore}
            loader={
              <h4 style={{ textAlign: 'center', width: '100%' }}>
                <p style={{ textAlign: 'center' }}>
                  Thanks for scrolling! That's all for now!
                </p>
              </h4>
            }
            endMessage={
              postList.length >= POSTS_PER_PAGE && (
                <p style={{ textAlign: 'center' }}>
                  Thanks for scrolling! That's all for now!
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
