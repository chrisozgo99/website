/* eslint-disable no-nested-ternary */
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

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

  return (
    <Main meta={<Meta title={proj.name} description={proj.description} />}>
      <div className="mx-10">
        <div className="mb-4 font-avenir text-4.5xl font-bold">{proj.name}</div>
        <div className="mb-4 w-2/3 whitespace-pre-wrap font-avenir text-base">
          {proj.synopsis}
        </div>
        {proj.stack && (
          <div className="my-4 w-2/3">
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
          <div className="flex w-full justify-center">
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
          <div className="flex w-full justify-center">
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
          <div className="my-8 flex w-full flex-row items-center py-8">
            <div className="mx-6 w-2/3 justify-center">
              <img
                className="rounded-2xl"
                src={`${router.basePath}/assets/images/${proj.slug}/0.png`}
                alt={proj.name}
              />
            </div>
            <div className="mx-6 w-1/3">
              <div className="whitespace-pre-wrap font-avenir text-sm">
                {proj.customerDiscovery}
              </div>
            </div>
          </div>
        )}
        <div className="my-8 flex w-full flex-row items-center pt-8">
          <div className="mx-6 w-1/3">
            <div className="whitespace-pre-wrap font-avenir text-sm">
              {proj.product}
            </div>
          </div>
          <div className="mx-6 my-8 w-2/3 justify-center">
            <img
              className="rounded-2xl"
              src={`${router.basePath}/assets/images/${proj.slug}/1.png`}
              alt={proj.name}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Project;
