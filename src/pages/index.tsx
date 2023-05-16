/* eslint-disable import/no-extraneous-dependencies */
import 'react-horizontal-scrolling-menu/dist/styles.css';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();

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
          <h3 className="text-center text-4xl sm:font-avenir sm:text-6.5xl">
            Hi, I{`'`}m Chris!
          </h3>
          <p className="mt-2 font-avenir text-xl">
            I{`'`}m passionate about
            <ul className="mt-0 list-inside list-disc">
              <li className="my-1 ml-4">startups</li>
              <li className="my-1 ml-4">coding</li>
              <li className="my-1 ml-4">foreign policy</li>
              <li className="my-1 ml-4">travel</li>
              <li className="my-1 ml-4">fitness</li>
              <li className="my-1 ml-4">and plenty of other niche topics!</li>
            </ul>
          </p>
        </div>
        <div className="mx-16 mt-4 sm:mr-16 sm:max-w-xs">
          <img
            src={`${router.basePath}/assets/images/chrisozgo1.png`}
            alt="Chris Ozgo smiling candidly in Los Angeles"
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
          <img
            src={`${router.basePath}/assets/images/chrisozgo2.png`}
            alt="Chris Ozgo at Zion National Park"
          />
        </div>
        <div className="mb-6 pl-[26px] pr-7 pt-4 sm:mb-36 sm:ml-[-160px] sm:mt-20 sm:max-w-[478px] sm:bg-gray-200 sm:pt-10">
          <h1 className="font-avenir text-base leading-6 sm:text-[0.94rem]">
            <p className="pb-2 font-raleway text-[1.375rem] font-light sm:pb-[26px]">
              In the past few years I:
            </p>
            <ul className="mt-0 list-inside list-disc">
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Co-founded{' '}
                <a
                  href="https://seedgatech.wixsite.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  SEED
                </a>{' '}
                and{' '}
                <a
                  href="https://www.instagram.com/gtseekdiscomfort/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  Seek Discomfort Club
                </a>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Broke the Guinness World Record for the{' '}
                <a
                  href="https://linktr.ee/seedgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  Longest Hopscotch Game
                </a>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                <a
                  href="https://chrisozgo.substack.com/"
                  className=" underline"
                >
                  Solo traveled on 4 different continents
                </a>
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Gave the{' '}
                <a
                  href="https://www.youtube.com/watch?v=IRyCNIOo_Po"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  keynote speech
                </a>{' '}
                to Georgia Tech{`'`}s freshman class
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Played college basketball in Singapore and led the country in
                scoring
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Completed 4 marathons, 2 half-Ironmans and 1 Ironman
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Built a{' '}
                <a
                  href="https://linktr.ee/chrisozgoapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  few mobile apps
                </a>{' '}
                that made some money
              </li>
              <li className="my-1 ml-4 list-outside sm:ml-8">
                Worked for some{' '}
                <a
                  href="https://linktr.ee/chrisozgostartups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  kickass startups
                </a>
              </li>
            </ul>
          </h1>
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
    </Main>
  );
};

export default Index;
