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
    <div className="flex w-full flex-row">
      <div className="w-1/2 bg-gray-400 pl-12">
        <div className="mb-4 mt-20">
          <h1 className="font-helvetica text-[3.5rem] font-bold">THINK TANK</h1>
        </div>
        <div>
          <p className="mr-12 font-avenir text-base leading-7">
            Welcome to the Think Tank, my blog where I discuss topics such as
            startups, coding, travel, fitness, foreign policy, and much more!
          </p>
        </div>
        <div>
          <button
            type="button"
            disabled
            className="mt-6 h-12 py-2 font-raleway text-sm font-semibold hover:decoration-inherit"
          >
            <Link href="/blog/">Read More</Link>
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <img src="../../assets/images/thinktank2.png" alt="Think Tank logo" />
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
