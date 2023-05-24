import Link from 'next/link';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';

import Card from '@/components/card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export interface Project {
  name: string;
  description: string;
  image: string;
  background?: string;
  slug: string;
  synopsis: string;
  customerDiscovery?: string;
  product?: string;
  stack?: string[];
  deliverable?: string;
}

export interface ProjectsObj {
  apps: Project[];
  work: Project[];
  seekDiscomfort: Project[];
  tank: Project[];
}

export const projects = (
  route: NextRouter | { basePath: string } = { basePath: '' }
): ProjectsObj => {
  return {
    apps: [
      {
        name: 'Schooled',
        description: 'Personalized college tours for prospective students',
        image: `${route?.basePath}/assets/images/schooled.png`,
        slug: 'schooled',
        synopsis:
          'Schooled connects prospective students with current students at the universities they are considering who shared similar interests to' +
          ' get a feel for what college is really like.',
        customerDiscovery:
          'We conducted over 200 customer discovery interviews with prospective students, current students, ' +
          'and parents to understand the problems they were facing.\n\nAfter learning that prospective families had issues with getting ' +
          'the clarity they needed to make a college decision, we began to offer personalized tours to families who were visiting Georgia Tech.' +
          '\n\nWe did this via a Calendly link advertised on Facebook and even approaching families who had just finished their admissions ' +
          'tours. After offering our tours, we would give families a link to a GoFundMe if they felt that our tour was worth paying for. ' +
          'Families paid us an average of over $50 per tour.',
        product:
          'We built a mobile app that allowed prospective students to get matched with current students at their dream schools ' +
          'and schedule a personalized tour of the campus. The app had the functionality to schedule tours, chat ' +
          'with current students, and process payments as well as a matching algorithm based on interests.' +
          '\n\nFor a version of the app that would be sold to admissions departments, we also built out a web app ' +
          'that allowed administrators to manage their students and their tours.',
        stack: [
          'TypeScript',
          'JavaScript',
          'React Native',
          'React',
          'Firebase',
          'Stripe',
          'Vercel',
          'Google Cloud Platform',
          'Google Maps API',
        ],
        deliverable:
          'https://apps.apple.com/us/app/schooled-personalized-tours/id1619886184',
      },
      {
        name: 'Paul Easton Basketball',
        description:
          'World-class basketball training experience delivered by Paul Easton',
        image: `${route?.basePath}/assets/images/pauleaston.png`,
        slug: 'paul-easton',
        synopsis:
          'The Paul Easton Basketball app allows world-renowned basketball trainer Paul Easton to deliver his top-notch basketball training experience in an accessible and ' +
          'affordable way to youth basketball players all over the world.',
        customerDiscovery:
          'Paul Easton is a basketball trainer who has trained people just starting out all the way to the NBA. ' +
          'He has hundreds of thousands of followers on social media, and when COVID hit, he was looking for a way to continue to train people ' +
          'remotely. He wanted to create a platform that would allow him to deliver his training experience to people all over the world, and make ' +
          'a high quality basketball training experience accessible and affordable to everyone.\n\n' +
          'We had Paul start offering his service for free during COVID to an email list of over 1,000 of his followers. ' +
          "We then interviewed them to understand what they liked and didn't like about the experience. We found that they loved the " +
          'content that Paul was delivering, but they wanted a more personalized experience such as asking Paul questions ' +
          'and getting feedback on their game in real-time. They also wanted to receive new content on a regular basis to keep ' +
          'them engaged and coming back for more.',
        product:
          'We built a mobile app that allowed Paul to deliver his training experience to people all over the world. ' +
          "The app had the functionality to watch Paul's training videos, record yourself doing the drills, and get feedback from Paul " +
          'on your game. It also had a Jumpshot Tutor as well as weekly tips and live Zoom workouts.\n\nWhile Paul charges over $100 an hour ' +
          'for his in-person training, we were able to offer his training experience for just $9.99 a month, making it accessible to everyone.' +
          " We also built a web app that allowed Paul to manage his content and his assistant trainers.\n\nIn all, Paul's app has thousands of downlaods " +
          'and has generated over $10,000 in revenue.',
        stack: [
          'JavaScript',
          'React Native',
          'React',
          'Firebase',
          'Amazon Web Services',
          'Netlify',
        ],
        deliverable:
          'https://apps.apple.com/us/app/paul-easton-basketball/id1572211821',
      },
      {
        name: 'StrobeLite Sports Training',
        description:
          'Perceptual cognitive training during workouts for athletes',
        image: `${route?.basePath}/assets/images/strobelite.png`,
        slug: 'strobe-lite',
        synopsis:
          'StrobeLite is a perceptual cognitive training app that allows athletes to train their brain to react faster and make better ' +
          'in-game decisions.',
        customerDiscovery:
          'I was an aspiring college basketball player who was always looking for ways to improve my game. Because I was willing to do ' +
          'whatever it took to get better, I found myself in the gym by myself a lot.\n\nThe difficulty with working out by yourself is that ' +
          "you don't have anyone to push you, and you don't have anyone to compete against. I wanted to create a way to bring my workouts " +
          'closer to the intensity that I would experience with a personal trainer or a teammate. I also noticed that a lot of trainers ' +
          "would have their athletes doing pre-set drills that didn't really translate to the game.\n\nI wanted to create a way to make " +
          'workouts more game-like and more fun. After reading a research paper on perceptual cognitive training, I realized that this ' +
          'was my opportunity to solve both of these problems.',
        product:
          'I built a mobile app that allowed athletes to train their brain while they train their body. The app allows you to ' +
          'select different visual stimuli and assign them to different movements. ' +
          'After setting up the duration of the workout, as well as the rest time between each flash, StrobeLite randomly serves you ' +
          'the colors, forcing the athlete to react to them in real-time.\n\nThe app also features community videos, where users can ' +
          'share their workouts for each respective sport. StrobeLite has over 5,000 downloads and was featured on SportTechie. Nowadays, ' +
          'there are many apps that offer perceptual cognitive training, but StrobeLite was the first to market.',
        stack: ['JavaScript', 'React Native', 'Meteor', 'MongoDB', 'Cordova'],
        deliverable:
          'https://apps.apple.com/ca/app/strobelite-sports-training/id1447905400',
      },
    ],
    work: [
      {
        name: 'Glide',
        description: 'No-code progressive web apps using spreadsheets',
        image: `${route?.basePath}/assets/images/glide.png`,
        slug: 'glide',
        synopsis:
          'Glide is a no-code platform that allows you to build mobile apps using just a spreadsheet. ',
        product:
          'I worked on the Activation team, which was responsible for getting new users to build their first app.\n\n' +
          'I made major improvements to the onboarding flow, which is the first experience that users have with Glide.\n\n' +
          'I also built out features that made it easier for users to make Excel calculations within their spreadsheets.',
        deliverable: 'https://www.glideapps.com/',
        stack: [
          'JavaScript',
          'React',
          'Redux',
          'Node.js',
          'Firebase',
          'PostgreSQL',
          'Google Cloud Platform',
          'Stripe',
        ],
      },
      {
        name: 'Greenzie',
        description: 'Autonomous lawnmower software for commercial mowers',
        image: `${route?.basePath}/assets/images/greenzie.png`,
        slug: 'greenzie',
        synopsis:
          'Greenzie is an autonomous lawnmower software company that allows commercial mowers to automate their mowing operations.',
        product:
          'While at Greenzie, I worked on a few different projects.\n\nI conducted research to determine the best way to revamp their ' +
          'obstacle detection system, which resulted in migrating from a PointCloud solution to a Computer Vision solution in use today. ' +
          '\n\nI also built out the beginnings of a mowing progress monitor that would allow users to see the progress of their mows in real-time, ' +
          'as well as enable the team to make better striping and path planning decisions.\n\nFinally, I built out a feature that would allow ' +
          'for smart path planning based on any obstacles detected during the boundary mapping process.',
        deliverable: 'https://www.greenzie.com/',
        stack: ['C/C++', 'Python', 'OpenCV', 'ROS', 'RVIZ', 'Gazebo'],
      },
      {
        name: 'Brewsy',
        description: 'DIY kit to make your own wine or cider in just 5 days',
        image: `${route?.basePath}/assets/images/brewsy.png`,
        slug: 'brewsy',
        synopsis:
          'Brewsy is a DIY kit that allows you to make your own wine or cider in just 5 days.',
        product:
          'I was the first technical hire at Brewsy, and I was responsible for building out their entire mobile app. The app allowed users get instructions on ' +
          'how to make their wine or cider, as well as track the progress of their brew. The app also featured a social feed where users could share their ' +
          'creations, publish their recipes, and react to other users posts.\n\nThe app has thousands of downloads and receives 5-10 posts daily.',
        deliverable: 'https://apps.apple.com/us/app/brewsy/id1577125379',
        stack: ['JavaScript', 'React Native', 'Firebase', 'Shopify'],
      },
    ],
    seekDiscomfort: [
      {
        name: 'Seek Discomfort Club',
        description:
          'Empowering 500+ students at Georgia Tech to get out of their comfort zone',
        image: `${route?.basePath}/assets/images/sdc.png`,
        background: '#1527B6',
        slug: 'seek-discomfort-club',
        synopsis:
          'Seek Discomfort Club empowers students at Georgia Tech to get out of their comfort zone in order to grow as people and leaders. ' +
          'We do this by hosting weekly events that challenge students in a variety of ways. Some of our most popular events include ' +
          'skydiving, sunrise hikes, polar plunges, and open mic nights.\n\nI was the founder of Seek Discomfort Club back in 2020 and ' +
          'the club has since grown to over 500 members. We have had people complete Ironman Triathlons, start their own businesses, and ' +
          'give TedX talks with the help of the club and our community.',
        customerDiscovery:
          'My freshman year of college, I was looking for an outlet on campus to empower me to get out of my comfort zone and was shocked ' +
          'to find that there was nothing like that at Georgia Tech. I wanted to create a community of people who were willing to challenge ' +
          'themselves and grow as people and leaders, but I also wanted to make sure that I was qualified to lead such a community.\n\nSo, I decided ' +
          'to train for a marathon, despite never having ran more than two miles in my life. Through the process of training for the marathon, ' +
          'I was able to find clarity on how I wanted this community to look and feel.\n\nDespite starting the club during the height of the pandemic, ' +
          'we focused on in-person events that would allow people to connect with each other, and the greater Georgia Tech community in valuable ways.',
        product:
          'As we grew, the structure of the club and its place on campus became more formalized. In the early days, we concentrated on doing a ' +
          'lot of events that were very visible on campus in order to attract new members. Some of these events included ' +
          'dancing with strangers in public, leaving encouraging sticky notes in the library, and handing out rubber ducks to strangers. ' +
          '\n\nWe made sure to keep interactions with the community extremely positive and high-energy in order to attract new members. ' +
          'We also made sure to do plenty of collaborative events with other clubs on campus in order to broaden our impact. ' +
          '\n\nAs leadership changed hands, dynamic new ways of challenging our members were introduced. I am proud to say that the club ' +
          'only continued to grow in size and impact after I stepped down as president, which is a testament to the club attracting ' +
          'the right kind of people and creating a culture that is conducive to growth.',
        deliverable: 'https://www.instagram.com/gtseekdiscomfort/',
      },
      {
        name: 'SEED',
        description:
          'Seeking discomfort and leadership development for 20 first-year students',
        image: `${route?.basePath}/assets/images/seed.png`,
        background: '#FFFFFF',
        slug: 'seed',
        synopsis:
          'SEED is a leadership development program for first-year students at Georgia Tech. We take 20 students on a year-long journey ' +
          'of self-discovery and leadership development. We do this by challenging them to get out of their comfort zone and grow as people ' +
          'and leaders. We do this by hosting weekly events that challenge students in a variety of ways.\n\nThrough SEED, students have ' +
          'ran their first marathon, broken Guinness World Records, and even open up about their sexuality for the first time.',
        customerDiscovery:
          'As Seek Discomfort Club grew, I wanted to create a pipeline of students who could lead the club and continue to grow it ' +
          'for years to come. I also acknowledged that the most difficult parts of running Seek Discomfort Club were getting high ' +
          'attendance at events and finding the funding to afford high quality events.\n\nCombined with the understanding that first-year ' +
          'students are looking for opportunities that will provide them a memorable college experience, I decided to create a leadership ' +
          'development program for first-year students that would challenge them to get out of their comfort zone and grow as people and leaders.' +
          'SEED was born out of this idea. We were fortunate enough to partner with Leadership Education and Development (LEAD) at Georgia Tech ' +
          'which provided us with funding, a staff advisor, and countless hours of support and guidance.',
        product:
          'SEEDlings, as we call them, are selected through a competitive application process. Around 20 students are selected each year and are mentored by 4-5 upperclassmen.' +
          'We then host weekly meetings centered around leadership topics, and weekly events that challenge students to get out of their ' +
          'comfort zone. One of the most popular parts of our weekly meetings were the Grapevine Talks where each week, a SEEDling would ' +
          'talk about any topic of their choosing for about 5 minutes.\n\nSEEDlings asked us not to tell them what the weekly events were ' +
          'until they arrived, which was a testament to the trust that our community had, and the growth mindset that they had developed. ' +
          'We did a variety of events that contained exposure to the areas of social, physical, and mental discomfort, as well as targeted ' +
          'teamwork and leadership development.\n\nSome of our most popular events included Toastmasters, Sharing our Biggest Insecurities with ' +
          'Strangers, and backpacking. Outside of our weekly meetings and events, we also hosted informal hangouts, office hours, and ' +
          'one-on-one meetings with SEEDlings to make sure that they were getting the most out of the program.\n\nOur inaugural year ' +
          'culminated in a multiple day effort to break the Guinness World Record for the Longest Hopscotch Game. We successfully chalked ' +
          'and hopped our 4.2 mile course, and the event was not only featured on Georgia Tech social media, but also on CNN, Morning Brew, and CBC Radio. ' +
          'Leadership has since changed hands multiple times, but the program continues to grow and impact the lives of first-year students ' +
          'and SEEDlings have gone on to become leaders in SEED, Seek Discomfort Club, and beyond.',
        deliverable: 'https://seedgatech.wixsite.com/home',
      },
      {
        name: 'Project 30',
        description:
          'Doing something out of my comfort zone every day for 30 days',
        image: `${route?.basePath}/assets/images/project30.png`,
        slug: 'project-30',
        synopsis:
          'Project 30 was a 30-day challenge that I did with a friend where we did something out of our comfort zone every day for a month. ' +
          'It was the most impactful month of my life. Each day was incredibly novel, exciting, and uncomfortable, which served as a catalyst ' +
          'for rewiring the neuroplasticity of my brain to be more comfortable with discomfort.',
        customerDiscovery:
          'Some of the most memorable days of Project 30 included: ' +
          "\n\t- Day 2: Dancing with Strangers Like Nobody's Watching\n\t- Day 3: Ice Bath Challenge\n\t- Day 5: Creating a Painting and" +
          " Getting it Displayed in Atlanta\n\t- Day 7: Sharing My Biggest Insecurities with Strangers\n\t- Day 10: Play Frisbee with Georgia Tech's President Cabrera" +
          '\n\t- Day 13: Eat a Ghost Pepper\n\t- Day 16: Handcuffing Myself to my Best Friend for 24 Hours\n\t- Day 19: Make a Mixtape' +
          '\n\t- Day 23: Texting Compliments to Random Contacts\n\t- Day 24: Polar Plunge\n\t- Day 29: Jump off a 10 Meter High Dive\n',
        product:
          'The best part of the challenge was not any individual day, but the fact that we were able to string these days together without ' +
          'missing a single day. This allowed us to build momentum and create a habit of getting out of our comfort zone.\n\nAs a result of ' +
          'not wanting the excitement to end, within a few days of Project 30 ending, I started a 7 month journey of training for an Ironman ' +
          'Triathlon, which was the single most rewarding experience of my life. It could not have been possible without the momentum and mindset that ' +
          'started in Project 30.',
        deliverable: 'https://www.youtube.com/channel/UC-_XI3luFJUYfJMyR_LGZXg',
      },
    ],
    tank: [
      {
        name: 'Team Tank',
        description:
          'Endurance racing brand worn by dozens of marathon and Ironman finishers',
        image: `${route?.basePath}/assets/images/teamtank.png`,
        background: '#000000',
        slug: 'team-tank',
        synopsis:
          'Team Tank is an endurance racing brand that I conceptualized to bring together a community of people who emobody the spirit of ' +
          'being a tank, and are competing in endurance races. The brand has been worn by dozens of half-marathon, marathon, half-Ironman, ' +
          'and Ironman finishers, as well as their supporters.',
        product:
          'Being a tank is a mindset. It means giving everything in front of you your best shot, and not being afraid to fail. Whether you ' +
          'are running a marathon, starting a business, or giving a speech to a large audience, being a tank means that you are willing to put yourself out there ' +
          'and give it everything you have. It represents the mindset to keep moving forward despite the obstacles in your way, push through adversity, ' +
          "and never give up. In a society that loves to give up when things get hard, being a tank means that that's when you're just getting started.",
        customerDiscovery:
          'One tank is strong, but a team of tanks is unstoppable.\n\n' +
          'Under the Team Tank brand, 17 people ran their first half or full marathon in the 2022 Publix Atlanta Marathon, and an additional 12 ' +
          'did the same in the 2023 Publix Atlanta Marathon. The brand has also been worn by finishers of 6 half or full Ironman finishers and their ' +
          'support teams. Leading up to every race, we designed a commemorative shirt that was worn by the team.',
      },
      {
        name: 'Tank Travels',
        description:
          'My global quest to understand various cultures, the human condition, and myself',
        image: `${route?.basePath}/assets/images/tanktravels.png`,
        slug: 'tank-travels',
        synopsis:
          'Tank Travels is a blog that I started to document my travels around the world. While traveling, I write weekly blogs posts about ' +
          'my experiences, lessons learned, and thoughts on the world.',
        product:
          'Being a tank is a mindset. It means giving everything in front of you your best shot, and not being afraid to fail. Whether you ' +
          'are running a marathon, starting a business, or giving a speech to a large audience, being a tank means that you are willing to put yourself out there ' +
          'and give it everything you have. It represents the mindset to keep moving forward despite the obstacles in your way, push through adversity, ' +
          "and never give up. In a society that loves to give up when things get hard, being a tank means that that's when you're just getting started.",
        customerDiscovery:
          'While I was on a semester abroad in Singapore, I wanted a way to enable my friends to keep up with my travels without having to ' +
          'constantly call and text them individually. Out of this need, Tank Travels was born.\n\nI started writing weekly blog posts about my ' +
          'time in Asia, while embedding pictures and videos to make it more engaging. What started as simply a way to keep my friends ' +
          'updated on my travels turned into an accountability mechanism for me to make the most of my time abroad. I wanted to make sure ' +
          'that I was doing something interesting every week so that I would have something to write about. I also wanted to make sure that ' +
          'I was reflecting on my experiences and learning from them.\n\nI found that writing about my experiences helped me to internalize ' +
          'them and learn from them in a way that I would not have otherwise.',
        deliverable: 'https://chrisozgo.substack.com/',
      },
      {
        name: 'Think Tank',
        description:
          'Blog posts about startups, coding, foreign policy, fitness, and much more!',
        image: `${route?.basePath}/assets/images/thinktank.png`,
        background: '#000000',
        slug: 'think-tank',
        synopsis:
          'Think Tank is a blog that I started to share my thoughts and experiences with the world. Expanding on the original Tank Travels ' +
          'blog, Think Tank covers a wide variety of topics, including startups, coding, foreign policy, fitness, and much more!',
        product:
          'Being a tank is a mindset. It means giving everything in front of you your best shot, and not being afraid to fail. Whether you ' +
          'are running a marathon, starting a business, or giving a speech to a large audience, being a tank means that you are willing to put yourself out there ' +
          'and give it everything you have. It represents the mindset to keep moving forward despite the obstacles in your way, push through adversity, ' +
          "and never give up. In a society that loves to give up when things get hard, being a tank means that that's when you're just getting started.",
        deliverable: 'https://chrisozgo.com/blog',
      },
    ],
  };
};

const Projects = () => {
  const router = useRouter();

  const prjcts = projects(router);

  return (
    <Main meta={<Meta title="Projects" description="Projects" />}>
      <div className="w-full justify-center">
        <div className="">
          <h1 className="mb-8 text-center font-raleway text-3xl font-bold sm:text-4.5xl">
            Projects
          </h1>
        </div>
        <div>
          <h1 className="mt-6 text-center font-avenir text-[1.625rem] sm:my-12">
            My Apps
          </h1>
          <div className="m-auto table align-middle sm:flex sm:justify-evenly">
            {prjcts.apps.map((app) => (
              <div className="my-8" key={app.name}>
                <Link href={`/projects/${app.slug}`}>
                  <Card
                    description={app.description}
                    name={app.name}
                    image={app.image}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mt-6 text-center font-avenir text-[1.625rem] sm:my-12">
            Work Experience
          </h1>
          <div className="m-auto table align-middle sm:flex sm:justify-evenly">
            {prjcts.work.map((app) => (
              <div className="my-8" key={app.name}>
                <Link href={`/projects/${app.slug}`}>
                  <Card
                    description={app.description}
                    name={app.name}
                    image={app.image}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mt-6 text-center font-avenir text-[1.625rem] sm:my-12">
            Seek Discomfort
          </h1>
          <div className="m-auto table align-middle sm:flex sm:justify-evenly">
            {prjcts.seekDiscomfort.map((app) => (
              <div className="my-8" key={app.name}>
                <Link href={`/projects/${app.slug}`}>
                  <Card
                    description={app.description}
                    name={app.name}
                    image={app.image}
                    background={app.background}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mt-6 text-center font-avenir text-[1.625rem] sm:my-12">
            Tank Brand
          </h1>
          <div className="m-auto table align-middle sm:flex sm:justify-evenly">
            {prjcts.tank.map((app) => (
              <div className="my-8" key={app.name}>
                <Link href={`/projects/${app.slug}`}>
                  <Card
                    description={app.description}
                    name={app.name}
                    image={app.image}
                    background={app.background}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Projects;
