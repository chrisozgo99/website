import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Subscribe = () => {
  return (
    <Main
      meta={<Meta title="Subscribe" description="Subscribe to Think Tank" />}
    >
      <div className="max-w-full justify-center sm:flex sm:flex-row sm:justify-evenly">
        <div className="mx-4 flex flex-col sm:ml-8">
          <div className="flex items-center justify-center sm:mr-4">
            <img
              src="/assets/images/thinktank.png"
              alt="Think Tank"
              className="h-[100px] w-[100px] sm:h-[135px] sm:w-[135px]"
            />
          </div>
          <div className="">
            <div>
              <h1 className="my-4 text-center font-raleway text-5xl font-black leading-[4.5rem] sm:text-6xl">
                Think Tank
                <br />
                by Chris Ozgo
              </h1>
            </div>
            <div>
              <h2 className="mb-4 text-center text-xl">
                All my thoughts in one place.
                <br />
                <br className="sm:hidden" />
                Join the community to get my posts delivered to your inbox!
                <br />
                👇🏼
              </h2>
            </div>
          </div>
          <div>
            <div className="w-full justify-center">
              <iframe
                src="https://embeds.beehiiv.com/6d734579-85cc-4d58-855a-cd8e7adc8497?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                frameBorder="0"
                scrolling="no"
                title="Subscribe to Think Tank"
                style={{
                  margin: '0',
                  border: 'none',
                  borderRadius: '0px !important',
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
              />
              <div className="my-6 flex flex-col text-center sm:mb-0">
                <Link href="/blog" className="text-lg text-gray-700">
                  Let me read it first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Subscribe;
