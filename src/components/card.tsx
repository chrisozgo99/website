import React from 'react';

interface CardProps {
  name: string;
  description: string;
  image: string;
  background?: string;
}

export default function Card(props: CardProps) {
  const { name, description, image, background } = props;
  return (
    <div className="mx-3 cursor-pointer transition-all duration-500 hover:scale-105">
      <div
        className="z-0 h-[431px] w-[315px] rounded-3xl"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: background,
          backgroundPositionY: background && 'center',
        }}
      />
      <div className="z-10 mt-[-25px] max-w-[315px] rounded-b-3xl bg-gray-400">
        <div className="mx-5">
          <div className="mb-3 pt-4 font-helvetica text-xl font-bold">
            {name}
          </div>
          <div className="pb-6 font-helvetica text-sm font-light">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
