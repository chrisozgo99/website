import React, { useState } from 'react';

interface SearchProps {
  onSearch: (search: string) => void;
}

const Search = (props: SearchProps) => {
  const { onSearch } = props;
  const [search, setSearch] = useState('');

  return (
    <section id="" className="mr-4">
      <div className="rounded-md border border-gray-300">
        <header className="flex flex-row items-center">
          <span className="" />
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch(search);
              }
            }}
            name="search"
            className="mr-2 w-fit px-6 py-2 text-sm outline-none"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="px-6 text-sm"
            onClick={() => onSearch(search)}
            aria-label="Search"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="9.69491"
                cy="8.69491"
                r="6.69491"
                stroke="#999999"
                stroke-width="2"
              />
              <line
                x1="14.545"
                y1="13.3154"
                x2="22.7067"
                y2="21.477"
                stroke="#999999"
                stroke-width="2"
              />
            </svg>
          </button>
        </header>
      </div>
    </section>
  );
};

export default Search;
