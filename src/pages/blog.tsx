import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
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
    {Array.from(Array(10).keys()).map((elt) => (
      <div
        className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
        key={elt}
      >
        <Link href={`/blog/blog-${elt}`}>{`Blog - ${elt}`}</Link>
      </div>
    ))}
  </Main>
);

export default Blog;
