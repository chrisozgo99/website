/* eslint-disable jsx-a11y/iframe-has-title */
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BlogPreview from '@/components/blog-preview';
import { Meta } from '@/layouts/Meta';
import { getPosts, getTags } from '@/lib/ghost-client';
import { Main } from '@/templates/Main';

const Blog = () => {
  const [gotPosts, setGotPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [gotTags, setGotTags] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!gotPosts) {
      getPosts().then((res: any) => {
        setPosts(res);
        setGotPosts(true);
      });
    }
  });

  useEffect(() => {
    if (!gotTags) {
      getTags().then((res: any) => {
        const sortedTags = [
          'Startups',
          'Coding',
          'Travel',
          'Fitness',
          'Foreign Policy',
        ];
        const orderedTags = [];
        for (const tag of sortedTags) {
          for (const t of res) {
            if (t.name === tag) {
              orderedTags.push(t);
            }
          }
        }
        setTags(orderedTags?.length > 0 ? orderedTags : res);
        setGotTags(true);
      });
    }
  });

  return (
    <Main
      meta={
        <Meta
          title="Think Tank"
          description="Blog discussing startups, coding, fitness, travel, foreign policy, and more!"
        />
      }
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
              Welcome to the Think Tank, my blog where I discuss topics such as
              startups, coding, travel, fitness, foreign policy, and much more!
            </p>
          </div>
          <div>
            <button
              type="button"
              disabled
              className="my-4 py-2 font-raleway text-sm font-semibold hover:decoration-inherit sm:mt-6 sm:h-12"
            >
              <Link href="/blog/">Read More</Link>
            </button>
          </div>
        </div>
        <div className="sm:w-1/2">
          <img
            src="../../assets/images/thinktank2.png"
            alt="Think Tank logo"
            className="h-[230px] w-full object-cover sm:h-[400px]"
          />
        </div>
      </div>
      <div className="ml-4 flex flex-row">
        {[{ id: 'all', name: 'All Posts' }, ...tags].map((tag: any) => (
          <div key={tag.id}>
            <a href={`/blog/${tag.slug}`}>
              <h1 className="my-7 mr-10 font-avenir text-lg">{tag.name}</h1>
            </a>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between">
        {posts.map((post: any, index: number) => {
          if (index % 2 === 1) {
            return (
              <div className="col-span-1 mb-8 mr-7 w-fit" key={post.id}>
                <a className="w-fit" href={`/blog/${post.slug}`}>
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
                </a>
              </div>
            );
          }
          return (
            <div className="col-span-1 mb-8 ml-7 w-fit" key={post.id}>
              <a className="w-fit" href={`/blog/${post.slug}`}>
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
              </a>
            </div>
          );
        })}
      </div>
      {/* <iframe
        src="https://widgets.sociablekit.com/medium-publication-feed/iframe/144737"
        frameBorder="0"
        width="100%"
        height="4200"
      /> */}
    </Main>
  );
};

export default Blog;
