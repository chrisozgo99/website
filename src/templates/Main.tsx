import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="m-auto max-w-5xl overflow-x-auto antialiased">
    {props.meta}
    <div>
      <header className="pb-2 sm:mt-11 sm:pb-6">
        <div className="flex-wrap items-center justify-between sm:flex">
          <Link href="/">
            <h1 className="w-full text-center font-avenir text-2xl text-black sm:w-80 sm:max-w-xs sm:text-4.5xl">
              {AppConfig.title.toUpperCase()}
            </h1>
          </Link>
          <nav>
            <ul className="flex flex-wrap justify-evenly">
              <li className="sm:mr-6">
                <Link
                  href="/"
                  className="border-none font-avenir text-sm text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li className="sm:mr-6">
                <Link
                  href="/about/"
                  className="border-none font-avenir text-sm text-gray-700 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li className="sm:mr-6">
                <Link
                  href="/projects/"
                  className="border-none font-avenir text-sm text-gray-700 hover:text-gray-900"
                >
                  Projects
                </Link>
              </li>
              <li className="sm:mr-6">
                <Link
                  href="/blog/"
                  className="border-none font-avenir text-sm text-gray-700 hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          <div className="sm:w-80" />
        </div>
      </header>
      <div className="mx-6 border-b border-black" />

      <main className="py-4 text-xl sm:py-5">{props.children}</main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        <div className="pb-3">chrisozgo99@gmail.com</div>©
        {new Date().getFullYear()} {AppConfig.title}. Made with ❤️.
        <div>
          <a
            className="text-blue-600"
            href="https://github.com/chrisozgo99/website"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
        </div>
        <div className="mb-3" />
        <p>
          Boilerplate from{' '}
          <a href="https://creativedesignsguru.com">
            https://creativedesignsguru.com
          </a>
          .
        </p>
      </footer>
    </div>
  </div>
);

export { Main };
