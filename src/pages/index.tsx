import 'react-horizontal-scrolling-menu/dist/styles.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface IIndexProps {
  test?: boolean;
}

const Index = (props: IIndexProps) => {
  const { test } = props;

  const router = useRouter();

  const [openSubscribe, setOpenSubscribe] = useState(false);

  const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
  ];

  return (
    <Main
      meta={
        <Meta
          title="Chris Ozgo"
          description="The personal website and blog of Chris Ozgo"
        />
      }
    >
      <div className="mb-8 flex-row items-center justify-between sm:flex">
        <div className="mx-4 sm:ml-16">
          <h1 className="text-center text-4xl sm:font-avenir sm:text-6.5xl">
            Hi, I{`'`}m Chris!
          </h1>
          <p className="mt-2 font-avenir text-xl">I{`'`}m passionate about</p>
          <ul className="mt-0 list-inside list-disc font-avenir">
            <li className="my-1 ml-4">startups</li>
            <li className="my-1 ml-4">coding</li>
            <li className="my-1 ml-4">current events</li>
            <li className="my-1 ml-4">travel</li>
            <li className="my-1 ml-4">fitness</li>
            <li className="my-1 ml-4">and plenty of other niche topics!</li>
          </ul>
        </div>
        <div className="mx-16 mt-4 sm:mr-16 sm:max-w-xs">
          <Image
            height={400}
            width={400}
            src={`${test ? '/' : ''}${
              router.basePath
            }/assets/images/chrisozgo1.png`}
            alt="Chris Ozgo"
          />
        </div>
      </div>
      <div className="mb-[60px] flex-row justify-evenly sm:flex">
        <div className="mx-24 mb-4 sm:h-12 sm:w-48">
          <Link href="/about/">
            <button
              type="button"
              className="h-full w-full rounded-3xl bg-black px-4 py-2 font-raleway font-bold text-white hover:decoration-inherit"
            >
              About
            </button>
          </Link>
        </div>
        <div className="mx-24 sm:h-12 sm:w-48">
          <Link href="/blog/">
            <button
              type="button"
              className="h-full w-full rounded-3xl bg-black px-4 py-2 font-raleway font-bold text-white hover:decoration-inherit"
            >
              Blog
            </button>
          </Link>
        </div>
      </div>
      <div className="mx-6 mb-10 border-b border-black sm:mb-24" />
      <div className="justify-center sm:flex">
        <div className="mx-6 sm:mb-[76px]">
          <Image
            height={500}
            width={500}
            priority
            src={`${test ? '/' : ''}${
              router.basePath
            }/assets/images/chrisozgo2.png`}
            alt="Chris Ozgo at Zion National Park"
          />
        </div>
        <div className="mb-6 pl-[26px] pr-7 pt-4 sm:mb-36 sm:ml-[-160px] sm:mt-12 sm:max-w-[478px] sm:bg-gray-200 sm:pb-8 sm:pt-10">
          <h2 className="font-avenir text-base leading-6 sm:text-[0.94rem]">
            <p className="pb-2 font-raleway text-[1.375rem] font-light sm:pb-[26px]">
              In the past few years I:
            </p>
            <ul className="mt-0 list-inside list-disc">
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Co-founded{' '}
                <Link
                  href="https://seedgatech.wixsite.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  SEED
                </Link>{' '}
                and{' '}
                <Link
                  href="https://www.instagram.com/gtseekdiscomfort/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  Seek Discomfort Club
                </Link>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Broke the Guinness World Record for the{' '}
                <Link
                  href="https://linktr.ee/seedgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  Longest Hopscotch Game
                </Link>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                <Link
                  href="https://chrisozgo.com/blog/travel/#tags"
                  className=" underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solo traveled on 5 different continents
                </Link>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Gave the{' '}
                <Link
                  href="https://www.youtube.com/watch?v=IRyCNIOo_Po"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  keynote speech
                </Link>{' '}
                to Georgia Tech{`'`}s freshman class
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Played college basketball in Singapore and led the country in
                scoring
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Climbed{' '}
                <Link
                  href="https://chrisozgo.com/blog/fitness/climbing-mt-kilimanjaro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  Mt. Kilimanjaro
                </Link>
                , the tallest mountain in Africa and highest freestanding
                mountain in the world
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Completed 4 marathons, 2 half-Ironmans and 1 Ironman
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Built a{' '}
                <Link
                  href="https://linktr.ee/chrisozgoapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  few mobile apps
                </Link>{' '}
                that made some money
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Worked for some{' '}
                <Link
                  href="https://linktr.ee/chrisozgostartups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  kickass startups
                </Link>
              </li>
            </ul>
          </h2>
        </div>
      </div>
      <div>
        <ScrollMenu>
          {items.map(({ id }) => {
            if (id % 4 === 1) {
              return (
                <div className="max-h-[713px]" key={id}>
                  <div
                    className="m-0.5 h-[431px] w-[257px] bg-gray-400"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/gallery/${id}.jpeg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                    }}
                  />
                  <div
                    className="m-0.5 h-[287px] w-[257px] bg-gray-300"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/gallery/${
                        id - 1
                      }.jpeg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                    }}
                  />
                </div>
              );
            }
            if (id % 2 === 1) {
              return (
                <div className="max-h-[713px]" key={id}>
                  <div
                    className="m-0.5 h-[287px] w-[257px] bg-gray-400"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/gallery/${id}.jpeg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                    }}
                  />
                  <div
                    className="m-0.5 h-[431px] w-[257px] bg-gray-300"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/gallery/${
                        id - 1
                      }.jpeg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                    }}
                  />{' '}
                </div>
              );
            }
            return <div key={id} />;
          })}
        </ScrollMenu>
      </div>
      <div className="sm:hidden">
        <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
        <div
          className={`transition-all duration-500 ${
            openSubscribe ? 'fixed z-50' : 'opacity-0'
          }`}
        >
          <SubscribeModal open={openSubscribe} setOpen={setOpenSubscribe} />
        </div>
      </div>
    </Main>
  );
};

export default Index;
