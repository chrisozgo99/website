import Link from 'next/link';
import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const About = () => {
  const router = useRouter();
  return (
    <Main meta={<Meta title="About" description="About Chris Ozgo" />}>
      <div className="ml-8 flex flex-row">
        <div className="h-[740px] w-[640px]">
          <img
            className="h-full w-full object-cover"
            src={`${router.basePath}/assets/images/chrisozgo3.png`}
            alt="Chris Ozgo smiling in graduation regalia"
          />
        </div>
        <div className="mb-[-35px] ml-[-335px] mt-9 w-[650px] bg-gray-200 px-10 text-center font-avenir text-[0.94rem] leading-7">
          <h1 className="my-9 font-raleway text-4.5xl font-light">About Me</h1>
          <p className="mb-6">
            I love boiling down my entire life into just a few sentences.
          </p>
          <p className="mb-6">
            My name is Chris, and just like everyone else, I{`'`}m trying to
            figure things out. I was an aspiring college basketball player
            before a neck injury-induced gap year that opened up my mind to many
            other amazing opportunities.
          </p>
          <p className="mb-6">
            I got into entrepreneurship, learned how to code, and traveled the
            world as a wide-eyed 18-year old. I started journaling for the first
            time, coached some basketball teams, and culminated my year of
            exploration by earning a full-ride scholarship to Georgia Tech to
            study Computer Science.
          </p>
          <p className="mb-6">
            While in college, I got attached to the concept of seeking
            discomfort-intentionally putting yourself in situations that
            challenge you in order to grow as a person-and built a 500+ person
            community around the idea. I embarked on my own seek discomfort
            projects like completing an Ironman triathlon, working on a couple
            startups, and Project 30-a 30-day challenge with a friend where we
            did something out of our comfort zone every day for a month. I also
            continueed to grow and discover new passions, like foreign affairs,
            solo traveling, and building mobile apps.
          </p>
          <p className="mb-6">
            I{`'`}m a avid writer with a passion for many of the above topics,
            and I{`'`}ve built this site to share my thoughts and experiences
            with the world! If any of that interests you, feel free to reach
            out, or check out my blog to learn more!
          </p>
        </div>
      </div>
      <div className="mt-16 flex flex-row justify-evenly">
        <div>
          <Link href="/about/">
            <button
              type="button"
              className="rounded-3xl bg-black px-4 py-2 font-raleway font-bold text-white hover:bg-blue-700"
            >
              Contact
            </button>
          </Link>
        </div>
        <div>
          <Link href="/blog/">
            <button
              type="button"
              className="rounded-3xl bg-black px-4 py-2 font-raleway font-bold text-white hover:bg-blue-700"
            >
              Blog
            </button>
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default About;
