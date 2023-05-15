import { useRouter } from 'next/router';

import Card from '@/components/card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Projects = () => {
  const router = useRouter();
  const apps = [
    {
      name: 'Schooled',
      description: 'Personalized college tours for prospective students',
      image: `${router.basePath}/assets/images/schooled.png`,
    },
    {
      name: 'Paul Easton Basketball',
      description:
        'World-class basketball training experience delivered by Paul Easton',
      image: `${router.basePath}/assets/images/pauleaston.png`,
    },
    {
      name: 'StrobeLite Sports Training',
      description: 'Perceptual cognitive training during workouts for athletes',
      image: `${router.basePath}/assets/images/strobelite.png`,
    },
  ];

  const work = [
    {
      name: 'Glide',
      description: 'No-code progressive web apps using spreadsheets',
      image: `${router.basePath}/assets/images/glide.png`,
    },
    {
      name: 'Greenzie',
      description: 'Autonomous lawnmower software for commercial mowers',
      image: `${router.basePath}/assets/images/greenzie.png`,
    },
    {
      name: 'Brewsy',
      description: 'DIY kit to make your own wine or cider in just 5 days',
      image: `${router.basePath}/assets/images/brewsy.png`,
    },
  ];

  const seekDiscomfort = [
    {
      name: 'Seek Discomfort Club',
      description:
        'Empowering 500+ students at Georgia Tech to get out of their comfort zone',
      image: `${router.basePath}/assets/images/sdc.png`,
      background: '#1527B6',
    },
    {
      name: 'SEED',
      description:
        'Seeking discomfort and leadership development for 20 first-year students',
      image: `${router.basePath}/assets/images/seed.png`,
      background: '#FFFFFF',
    },
    {
      name: 'Project 30',
      description:
        'Doing something out of my comfort zone every day for 30 days',
      image: `${router.basePath}/assets/images/project30.png`,
    },
  ];

  const tank = [
    {
      name: 'Team Tank',
      description:
        'Endurance racing brand worn by dozens of marathon and Ironman finishers',
      image: `${router.basePath}/assets/images/teamtank.png`,
      background: '#000000',
    },
    {
      name: 'Tank Travels',
      description:
        'My global quest to understand various cultures, the human condition, and myself',
      image: `${router.basePath}/assets/images/tanktravels.png`,
    },
    {
      name: 'Think Tank',
      description:
        'Blog posts about startups, coding, foreign policy, fitness, and much more!',
      image: `${router.basePath}/assets/images/thinktank.png`,
      background: '#000000',
    },
  ];

  return (
    <Main meta={<Meta title="Projects" description="Projects" />}>
      <div className="w-full justify-center">
        <div className="">
          <h1 className="text-center font-raleway text-4.5xl font-bold">
            Projects
          </h1>
        </div>
        <div>
          <h1 className="my-12 text-center font-avenir text-[1.625rem]">
            My Apps
          </h1>
          <div className="flex justify-evenly">
            {apps.map((app) => (
              <div key={app.name}>
                <Card
                  description={app.description}
                  name={app.name}
                  image={app.image}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="my-12 text-center font-avenir text-[1.625rem]">
            Work Experience
          </h1>
          <div className="flex justify-evenly">
            {work.map((app) => (
              <div key={app.name}>
                <Card
                  description={app.description}
                  name={app.name}
                  image={app.image}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="my-12 text-center font-avenir text-[1.625rem]">
            Seek Discomfort
          </h1>
          <div className="flex justify-evenly">
            {seekDiscomfort.map((app) => (
              <div key={app.name}>
                <Card
                  description={app.description}
                  name={app.name}
                  image={app.image}
                  background={app?.background}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="my-12 text-center font-avenir text-[1.625rem]">
            Tank Brand
          </h1>
          <div className="flex justify-evenly">
            {tank.map((app) => (
              <div key={app.name}>
                <Card
                  description={app.description}
                  name={app.name}
                  image={app.image}
                  background={app?.background}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Projects;
