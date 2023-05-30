import React from 'react';

interface SubscribeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Subscribe(props: SubscribeProps) {
  const { open, setOpen } = props;

  return (
    <div className="fixed bottom-0 right-0">
      <button
        type="button"
        className="bottom-0 right-0 mb-6 mr-6 rounded-full bg-[#FF1A75] px-4 py-3 shadow-2xl shadow-slate-700 transition-all duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="mr-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="13" cy="13" r="12.5" stroke="white" />
              <circle cx="13" cy="10" r="6" stroke="white" />
              <path
                d="M5 22V22C9.41828 17.5817 16.5817 17.5817 21 22V22"
                stroke="white"
              />
            </svg>
          </div>
          <div className="flex">
            <h1 className="items-center justify-center font-helvetica text-sm font-bold text-white">
              Subscribe
            </h1>
          </div>
        </div>
      </button>
    </div>
  );
}
