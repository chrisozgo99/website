/* eslint-disable no-nested-ternary */
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Subscribe from '@/components/subscribe';
import SubscribeModal from '@/components/subscribe-modal';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { Project as Prj, ProjectsObj } from '../projects';
import { projects } from '../projects';

type ProjectsUrl = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ProjectsUrl> = async () => {
  const prjs = projects();

  const paths: {
    params: {
      slug: string;
    };
  }[] = [];

  prjs.apps.forEach((app) => {
    paths.push({
      params: {
        slug: app.slug,
      },
    });
  });

  prjs.work.forEach((work) => {
    paths.push({
      params: {
        slug: work.slug,
      },
    });
  });

  prjs.seekDiscomfort.forEach((sd) => {
    paths.push({
      params: {
        slug: sd.slug,
      },
    });
  });

  prjs.tank.forEach((tank) => {
    paths.push({
      params: {
        slug: tank.slug,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const prjs: ProjectsObj = projects();

  const proj: Prj | undefined =
    prjs.apps.find((app) => app.slug === context.params?.slug) ||
    prjs.work.find((work) => work.slug === context.params?.slug) ||
    prjs.seekDiscomfort.find((sd) => sd.slug === context.params?.slug) ||
    prjs.tank.find((tank) => tank.slug === context.params?.slug);

  if (!proj) {
    return {
      notFound: true,
    };
  }

  return {
    props: { proj },
  };
};

const Project = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { proj }: { proj: Prj } = props as any;

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <Main meta={<Meta title={proj.name} description={proj.description} />}>
      <div className="mx-10">
        <div className="mb-4 font-avenir text-4.5xl font-bold">{proj.name}</div>
        <div className="mb-4 whitespace-pre-wrap font-avenir text-base sm:w-2/3">
          {proj.synopsis}
        </div>
        {proj.stack && (
          <div className="my-4 sm:w-2/3">
            {proj.stack.map((tech) => {
              return (
                <div
                  key={tech}
                  className="my-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {tech}
                </div>
              );
            })}
          </div>
        )}
        {proj.stack && proj.deliverable ? (
          <div className="mb-8 flex w-full justify-center sm:mb-0">
            <a
              href={proj.deliverable}
              target="_blank"
              rel="noopener noreferrer"
              className="font-avenir text-2xl font-bold text-white"
            >
              <div className="flex w-fit flex-row items-center justify-center rounded-xl bg-black px-14 py-4 shadow-md shadow-slate-400">
                View it live
              </div>
            </a>
          </div>
        ) : proj.deliverable ? (
          <div className="mb-8 flex w-full justify-center sm:mb-0">
            <a
              href={proj.deliverable}
              target="_blank"
              rel="noopener noreferrer"
              className="font-avenir text-2xl font-bold text-white"
            >
              <div className="flex w-fit flex-row items-center justify-center rounded-xl bg-black px-14 py-4 shadow-md shadow-slate-400">
                Learn more
              </div>
            </a>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="bg-gray-400 pb-3">
        {proj.customerDiscovery && (
          <div className="mt-8 w-full items-center pt-8 sm:my-8 sm:flex sm:flex-row sm:py-8">
            <div className="mx-6 justify-center sm:w-2/3">
              <Image
                priority
                width={1000}
                height={600}
                className="rounded-2xl"
                src={`${router.basePath}/assets/images/${proj.slug}/0.png`}
                alt={proj.name}
              />
            </div>
            <div className="mx-6 sm:w-1/3">
              <div className="mt-4 whitespace-pre-wrap font-avenir text-sm">
                {proj.customerDiscovery}
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col-reverse items-center sm:my-8 sm:flex-row sm:pt-8">
          <div className="mx-6 sm:w-1/3">
            <div className="whitespace-pre-wrap font-avenir text-sm">
              {proj.product}
            </div>
          </div>
          <div className="mx-6 my-8 justify-center sm:w-2/3">
            <Image
              width={1000}
              height={600}
              className="rounded-2xl"
              src={`${router.basePath}/assets/images/${proj.slug}/1.png`}
              alt={proj.name}
            />
          </div>
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

export default Project;
