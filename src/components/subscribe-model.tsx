import React from 'react';

interface SubscribeModalProps {
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick: () => void;
}

export default function SubscribeModal(props: SubscribeModalProps) {
  const { email, open, message, setMessage, onClick, setEmail, setOpen } =
    props;

  return (
    <div>
      {open && (
        <div className="m-auto h-full w-full">
          <div className="fixed inset-0 m-auto w-full justify-center overflow-y-auto shadow-2xl shadow-slate-700 sm:h-2/3 sm:w-1/3 sm:rounded-3xl lg:w-1/3 2xl:h-1/2 2xl:w-1/4">
            <div className="flex h-full w-full flex-col items-center justify-center bg-white">
              <button
                type="button"
                className="absolute right-6 top-6"
                onClick={() => {
                  setMessage('');
                  setEmail('');
                  setOpen(!open);
                }}
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
              <div className="lg:mb-8">
                <div className="mx-8 mb-3 text-center font-helvetica text-3xl font-bold">
                  <h3>Subscribe to Think Tank</h3>
                </div>
                <div className="mx-8 text-center font-avenir text-base">
                  <h3>
                    Get the latest posts delivered right to your inbox. No spam.
                  </h3>
                </div>
              </div>

              <div className="mt-8 w-full">
                <div className="mb-4 flex justify-center">
                  <input
                    className="w-2/3 rounded-lg border-2 border-gray-300 px-4 py-2 font-avenir text-base sm:w-1/2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row justify-center">
                  <button
                    type="button"
                    disabled={email === ''}
                    className="w-2/3 rounded-lg bg-[#FF1A75] px-4 py-2 font-avenir text-base text-white hover:cursor-pointer sm:w-1/2"
                    onClick={(e) => {
                      e.preventDefault();
                      const validateEmail = (val: string) => {
                        return String(val)
                          .toLowerCase()
                          .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          );
                      };
                      if (validateEmail(email)) {
                        onClick();
                      } else {
                        setMessage('Please enter a valid email address');
                      }
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                <div className="mx-8 mt-4">
                  <p className="text-center font-avenir text-black">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
