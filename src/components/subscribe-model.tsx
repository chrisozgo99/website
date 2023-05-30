import React from 'react';

interface SubscribeModalProps {
  email: string;
  setEmail: (email: string) => void;
  open: boolean;
  onClick: () => void;
}

export default function SubscribeModal(props: SubscribeModalProps) {
  const { email, open, onClick, setEmail } = props;

  return (
    <div>
      {open && (
        <div className="m-auto h-full w-full">
          <div className="fixed inset-0 m-auto h-[50%] w-10/12 items-center justify-center overflow-y-auto rounded-3xl shadow-2xl shadow-slate-700 transition-opacity duration-500">
            <div className="m-auto h-full bg-white">
              <div className="mb-3 pt-4 text-center font-helvetica text-xl font-bold">
                <h3>Subscribe to Think Tank</h3>
              </div>
              <div className="mb-3 text-center font-avenir text-base">
                <h3>
                  Get the latest posts delivered right to your inbox. No spam.
                </h3>
              </div>
              <div className="justify-center">
                <div className="flex justify-center">
                  <input
                    className="w-1/2 rounded-lg border-2 border-gray-300 px-4 py-2 font-avenir text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
                    type="text"
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
                    className="rounded-lg bg-[#FF1A75] px-4 py-2 font-avenir text-base text-white hover:cursor-pointer"
                    onClick={onClick}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
