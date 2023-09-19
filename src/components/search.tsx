import React from 'react';

const Search = () => {
  return (
    <section id="" className="mr-4">
      <div className="rounded-md border border-gray-300">
        <header className="items-center">
          <span className="" />
          <input
            name="search"
            className="my-1 mr-2 w-fit px-6 py-2 text-sm outline-none"
            type="text"
            placeholder="Search"
          />
          <button type="button" className="px-6 py-2 text-sm">
            <svg
              className="h-4 w-4 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M21 21l-4.35-4.35"
              />
            </svg>
          </button>
        </header>
      </div>
    </section>
  );
};

export default Search;
