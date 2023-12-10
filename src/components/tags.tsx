import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import type { SearchBoxProps } from 'react-instantsearch';
import { SearchBox } from 'react-instantsearch';

import { DropdownMenu } from '@/components/dropdown';
import { tagHierarchy } from '@/utils/tags';

interface TagsProps {
  tags: any;
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
  dropdownTag: string | undefined;
  setDropdownTag: (dropdownTag: undefined) => void;
  setSelectedTag: (selectedTag: undefined) => void;
  setRefresh: (refresh: boolean) => void;
}

export function Tags({
  tags,
  showDropdown,
  setShowDropdown,
  dropdownTag,
  setDropdownTag,
  setSelectedTag,
  setRefresh,
  ...props
}: TagsProps) {
  const router = useRouter();
  return (
    <div>
      <div
        id="tags"
        className="items-center sm:ml-4 sm:flex sm:w-full sm:flex-row sm:overflow-x-scroll"
      >
        <style>
          {`
            @media (min-width: 640px) {
              div#tags {
                overflow: initial;
              }
            }
          `}
        </style>
        <div className="flex w-full flex-row overflow-x-scroll pr-4" id="tags">
          {['All Posts', ...tags].map((tag: any) => {
            return (
              <div
                key={tag.replace(/\s+/g, '-').toLowerCase()}
                className={`${
                  showDropdown &&
                  dropdownTag === tag &&
                  tag !== 'All Posts' &&
                  'bg-gray-400'
                } px-5`}
              >
                <Link
                  onMouseEnter={() => {
                    setShowDropdown(true);
                    setDropdownTag(tag);
                  }}
                  onMouseLeave={() => {
                    setShowDropdown(false);
                    setDropdownTag(undefined);
                  }}
                  href={{
                    pathname:
                      tag === 'All Posts'
                        ? `/blog`
                        : `/blog/${tag.replace(/\s+/g, '-').toLowerCase()}`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTag(tag);
                    setRefresh(true);
                    router.push(
                      tag === 'All Posts'
                        ? `/blog#tags`
                        : `/blog/${tag.replace(/\s+/g, '-').toLowerCase()}#tags`
                    );
                  }}
                >
                  {tag === 'All Posts' ? (
                    <h2 className="flex w-max py-4 text-center font-avenir text-lg sm:py-7 sm:text-center">
                      {tag}
                    </h2>
                  ) : (
                    <h2
                      className={`py-4 text-center font-avenir text-lg sm:py-7  ${
                        showDropdown && dropdownTag === tag && 'bg-gray-400'
                      } sm:text-center`}
                    >
                      {tag}
                    </h2>
                  )}
                </Link>
                {showDropdown && dropdownTag === tag && tag !== 'All Posts' && (
                  <div
                    onMouseEnter={() => {
                      setShowDropdown(true);
                      setDropdownTag(tag);
                    }}
                    onMouseLeave={() => {
                      setShowDropdown(false);
                      setDropdownTag(undefined);
                    }}
                    className="absolute z-50 mx-[-100px] border-[1px] border-gray-400 sm:absolute sm:mx-[-20px]"
                  >
                    <DropdownMenu
                      dropdownItems={tagHierarchy[tag]}
                      setRefresh={setRefresh}
                      setSelectedTag={setSelectedTag}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden w-full flex-row justify-center border py-2 sm:mr-4 sm:flex sm:w-1/2 sm:justify-end sm:border-0">
          <SearchBox
            classNames={{
              root: 'display-flex flex-row justify-center border-2 border-gray-400 rounded-md outline-none mr-4',
              input:
                'pl-4 pt-2 pb-2 text-sm placeholder-gray-400 outline-none rounded-md',
              form: 'flex flex-row justify-center rounded-md',
              submit: 'p-2 text-sm outline-none rounded-md',
              reset: 'hidden',
              loadingIndicator: 'hidden',
            }}
            placeholder="Search"
            {...(props as SearchBoxProps)}
          />
        </div>
      </div>
      <div className="flex w-full flex-row justify-center border py-2 sm:mr-4 sm:hidden sm:w-1/2 sm:justify-end sm:border-0">
        <SearchBox
          classNames={{
            root: 'display-flex flex-row justify-center border-2 border-gray-400 rounded-md outline-none mr-4',
            input:
              'pl-4 pt-2 pb-2 text-sm placeholder-gray-400 outline-none rounded-md',
            form: 'flex flex-row justify-center rounded-md',
            submit: 'p-2 text-sm outline-none rounded-md',
            reset: 'hidden',
            loadingIndicator: 'hidden',
          }}
          placeholder="Search"
          {...(props as SearchBoxProps)}
        />
      </div>
    </div>
  );
}
