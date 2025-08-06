import React from 'react';

interface SubscribeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SubscribeModal(props: SubscribeModalProps) {
  const { open, setOpen } = props;

  return (
    <div>
      {open && (
        <div className="m-auto size-full">
          <div className="fixed inset-0 m-auto w-full justify-center overflow-y-auto shadow-2xl shadow-slate-700 sm:h-3/4 sm:w-1/2 sm:rounded-3xl 2xl:h-1/2 2xl:w-1/4">
            <button
              type="button"
              className="absolute right-6 top-6"
              onClick={() => {
                setOpen(!open);
              }}
              aria-label="Close modal"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L21.7579 22"
                  stroke="#999999"
                  stroke-linecap="round"
                />
                <path
                  d="M22 1L1 21.7875"
                  stroke="#999999"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div className="flex size-full flex-col items-center justify-center bg-white">
              <iframe
                src="https://embeds.beehiiv.com/6d734579-85cc-4d58-855a-cd8e7adc8497"
                data-test-id="beehiiv-embed"
                width="100%"
                height="320"
                title="Subscribe to Think Tank"
                frameBorder="0"
                scrolling="no"
                style={{
                  borderRadius: '4px',
                  margin: '0',
                  backgroundColor: 'transparent',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
