import React from 'react';

const Search = () => {
  return (
    <section id="q-search-wrapper" className="">
      <div className="">
        <header className="">
          <span className="" />
          <input
            id="q-search-input"
            name="search"
            className=""
            type="text"
            placeholder='Press "ctrl + k" to search'
            aria-label="Search"
            aria-describedby="q-search-list"
          />
          <button id="q-search-delete" type="button" className="">
            Search
          </button>
        </header>
      </div>
    </section>
  );
};

export default Search;
