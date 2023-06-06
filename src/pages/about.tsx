import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface IAboutProps {
  test?: boolean;
}

const About = (props: IAboutProps) => {
  const { test } = props;

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <Main meta={<Meta title="About" description="About Chris Ozgo" />}>
      <div className="mx-4 flex-row sm:ml-8 sm:flex">
        <div className="sm:h-[740px] sm:w-[640px]">
          <Image
            height={740}
            width={640}
            priority
            className="h-full w-full object-cover"
            src={`${test ? '/' : ''}${
              router.basePath
            }/assets/images/chrisozgo3.png`}
            alt="Chris Ozgo smiling in graduation regalia"
          />
        </div>
        <div className="px-4 text-center font-avenir text-[0.94rem] leading-7 sm:mb-[-35px] sm:ml-[-335px] sm:mt-9 sm:w-[650px] sm:bg-gray-200 sm:px-10">
          <h1 className="my-4 font-raleway text-2xl font-light sm:my-9 sm:text-4.5xl">
            About Me
          </h1>
          <p className="mb-6">
            I love boiling down my entire life into just a few sentences.
          </p>
          <p className="mb-6">
            My name is Chris, and I{`'`}m from Arlington, VA. I{`'`}m high
            energy, hard working, and deep thinking. Growing up, I was an
            aspiring college basketball player before a neck injury led me to
            take a gap year that opened up my mind to many other amazing
            opportunities.
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
            I{`'`}m an avid writer with a passion for many of the above topics,
            and I built this site to share my thoughts and experiences with the
            world! If any of that interests you, feel free to reach out, or
            check out my blog to learn more!
          </p>
        </div>
      </div>
      <div className="mt-6 flex-row justify-evenly font-raleway text-base sm:mt-16 sm:flex">
        <div className="mx-24 mb-4 sm:h-12 sm:w-48">
          <a href="mailto:hi@chrisozgo.com">
            <button
              type="button"
              className="h-full w-full rounded-3xl bg-black px-4 py-2 font-raleway font-bold text-white"
            >
              Contact
            </button>
          </a>
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
      <div className="sm:hidden">
        <Subscribe open={openSubscribe} setOpen={setOpenSubscribe} />
        <div
          className={`transition-all duration-500 ${
            openSubscribe ? 'fixed z-50' : 'opacity-0'
          }`}
        >
          <SubscribeModal
            open={openSubscribe}
            setOpen={setOpenSubscribe}
            email={email}
            setEmail={setEmail}
            onClick={() => {
              fetch('/api/subscribe', {
                body: JSON.stringify({
                  email,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              }).then((response) => {
                if (!response.ok) {
                  setEmail('');
                  setMessage('You are already subscribed!');
                } else {
                  response.json().then((data) => {
                    if (!data.error) {
                      setEmail('');
                      setMessage('Success! Thank you for subscribing!');
                    }
                  });
                }
              });
            }}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </Main>
  );
};

export default About;
