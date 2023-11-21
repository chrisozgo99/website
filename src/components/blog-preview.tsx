/* eslint-disable @typescript-eslint/naming-convention */
import Image from 'next/image';
import React from 'react';

interface BlogPreviewProps {
  title: string;
  primary_author: any;
  feature_image: string;
  feature_image_alt: string;
  published_at: string;
  reading_time: string;
  excerpt: string;
  primary_tag: any;
}

export default function BlogPreview(props: BlogPreviewProps) {
  const {
    title,
    primary_author,
    feature_image,
    feature_image_alt,
    published_at,
    reading_time,
    excerpt,
    primary_tag,
  } = props;
  return (
    <div className="w-full border-gray-500 sm:w-[453px] sm:border">
      <div>
        <Image
          className="h-[340px] w-[453px] object-cover"
          width={453}
          height={340}
          loader={({ src, width }) => `${src}?w=${width}`}
          src={feature_image}
          alt={feature_image_alt || title}
        />
      </div>
      <div className="px-[30px] pb-[25px] pt-7">
        <div className="mb-3 flex flex-row justify-between">
          <div className="flex flex-row">
            <div>
              <Image
                className="rounded-full"
                width={32}
                height={32}
                loader={({ src, width }) => `${src}?w=${width}`}
                src={primary_author.profile_image}
                alt={primary_author.name}
              />
            </div>
            <div className="ml-3 items-center">
              <div>
                <div className="font-avenir text-xs">{primary_author.name}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-avenir text-xs">
                  {new Date(
                    0,
                    new Date(published_at).getMonth()
                  ).toLocaleString('en', { month: 'long' })}{' '}
                  {new Date(published_at).getDate()}
                  {new Date(published_at).getFullYear() !==
                    new Date().getFullYear() &&
                    `, ${new Date(published_at).getFullYear()}`}
                  {` · ${reading_time} min`}
                </div>
                <div />
              </div>
            </div>
          </div>
          {primary_tag?.name && (
            <div>
              <p className="w-fit bg-gray-600 px-3 py-[6px] font-avenir text-[14px] text-white">
                {primary_tag?.name}
              </p>
            </div>
          )}
        </div>
        <div className="mb-2 line-clamp-2 h-[78px] font-raleway text-[1.625rem] font-thin">
          <h1>{title}</h1>
        </div>
        <div className="line-clamp-2 h-12 w-full font-avenir text-base font-thin">
          <h2>{excerpt}</h2>
        </div>
      </div>
    </div>
  );
}
