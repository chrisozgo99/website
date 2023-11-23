/* eslint-disable react/no-unescaped-entities */
import type { MultipleQueriesQuery } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
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
import { DropdownMenu } from '@/components/dropdown';
import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import {
  getMorePosts,
  getPosts,
  // getTags,
  POSTS_PER_PAGE,
} from '@/lib/ghost-client';
import { Main } from '@/templates/Main';
import { tagHierarchy } from '@/utils/tags';

export const config = {
  runtime: 'nodejs',
};

interface BlogProps {
  posts: any;
  tags: any;
  test?: boolean;
}

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

const Blog = (props: BlogProps) => {
  const { test } = props;
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

  const [postList, setPostList] = useState([]);
  const [tags, setTags] = useState([]);
  const [pagination, setPagination] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTag, setDropdownTag] = useState();

  useEffect(() => {
    const postsPromise: any = getPosts(POSTS_PER_PAGE);
    const tagsPromise: any = Object.keys(tagHierarchy);

    Promise.all([postsPromise, tagsPromise]).then(([postsRes, tagsRes]) => {
      setPostList(postsRes);
      setTags(tagsRes);
      setPagination(2);
      setHasMore(true);
    });
  }, []);

  async function getAdditionalPosts() {
    await getMorePosts(pagination).then((res: any) => {
      if (res.meta.pagination.page === res.meta.pagination.pages) {
        setHasMore(false);
      }
      setPostList([...postList.concat(res)]);
      setPagination(pagination + 1);
    });
  }

  return (
    <Main
      meta={
        <Meta
          title="Blog | Think Tank"
          description="Blog discussing startups, coding, fitness, travel, current events, and more!"
        />
      }
    >
      <div className="flex h-full w-full flex-col items-center justify-center" />
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
              <h2 className="font-avenir text-base leading-7 sm:mr-12">
                Welcome to the Think Tank, my blog where I discuss topics such
                as startups, coding, travel, fitness, current events, and much
                more!
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
        <div
          id="tags"
          className="items-center sm:ml-4 sm:flex sm:w-full sm:flex-row sm:overflow-x-scroll"
        >
          <style>
            {`
            @media (min-width: 640px) {
              div#tags {
                overflow: initial;
              }
            }
          `}
          </style>
          <div
            className="flex w-full flex-row overflow-x-scroll pr-4"
            id="tags"
          >
            {['All Posts', ...tags].map((tag: any) => (
              <div
                key={tag.replace(/\s+/g, '-').toLowerCase()}
                className="mx-5"
              >
                <Link
                  onMouseEnter={() => {
                    setShowDropdown(true);
                    setDropdownTag(tag);
                  }}
                  onMouseLeave={() => {
                    setShowDropdown(false);
                    setDropdownTag(undefined);
                  }}
                  href={{
                    pathname:
                      tag === 'All Posts'
                        ? `/blog`
                        : `/blog/${tag.replace(/\s+/g, '-').toLowerCase()}`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      tag.name === 'All Posts'
                        ? `/blog#tags`
                        : `/blog/${tag.replace(/\s+/g, '-').toLowerCase()}#tags`
                    );
                  }}
                >
                  {tag.name === 'All Posts' ? (
                    <h2 className="flex w-max py-4 text-center font-avenir text-lg sm:py-7 sm:text-center">
                      {tag}
                    </h2>
                  ) : (
                    <h2 className="pm:my-7 py-4 text-center font-avenir text-lg sm:text-center">
                      {tag}
                    </h2>
                  )}
                </Link>
                {showDropdown && dropdownTag === tag && (
                  <div
                    onMouseEnter={() => {
                      setShowDropdown(true);
                      setDropdownTag(tag);
                    }}
                    onMouseLeave={() => {
                      setShowDropdown(false);
                      setDropdownTag(undefined);
                    }}
                    className="absolute z-50"
                  >
                    <DropdownMenu dropdownItems={tagHierarchy[tag]} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex w-full flex-row justify-center border py-2 sm:mr-8 sm:justify-end sm:border-0">
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
        </div>

        <div className="-z-10 flex w-full flex-wrap justify-between">
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
