import Link from 'next/link';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState('Subscribe!');

  return (
    <Main
      meta={<Meta title="Subscribe" description="Subscribe to Think Tank" />}
    >
      <div className="max-w-full justify-center sm:flex sm:flex-row sm:justify-evenly">
        <div className="mx-4 flex flex-col sm:ml-8">
          <div className="flex items-center justify-center sm:mr-4">
            <img
              src="/assets/images/thinktank.png"
              alt="Think Tank"
              className="h-[100px] w-[100px] sm:h-[135px] sm:w-[135px]"
            />
          </div>
          <div className="">
            <div>
              <h1 className="my-4 text-center font-raleway text-5xl font-black leading-[4.5rem] sm:text-6xl">
                Think Tank
                <br />
                by Chris Ozgo
              </h1>
            </div>
            <div>
              <h2 className="mb-4 text-center text-xl">
                All my thoughts in one place.
                <br />
                <br className="sm:hidden" />
                Join the community to get my posts delivered to your inbox!
                <br />
                👇🏼
              </h2>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-row justify-between rounded-lg border-2 border-[#FF1A75]">
                <input
                  className="mx-4 flex items-center text-lg focus:outline-none sm:min-w-[250px] sm:text-base"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className={`rounded-sm ${
                    subscribe === 'Subscribe!' ? 'bg-[#FF1A75]' : 'bg-[#e396b5]'
                  }  px-1 py-3 text-base font-bold text-white sm:px-5`}
                  type="button"
                  onClick={(e) => {
                    setSubscribe('Please wait...');
                    e.preventDefault();
                    const validateEmail = (val: string) => {
                      try {
                        return String(val)
                          .toLowerCase()
                          .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          );
                      } catch (err) {
                        return false;
                      }
                    };
                    if (validateEmail(email)) {
                      fetch('/api/subscribe', {
                        body: JSON.stringify({
                          email,
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        method: 'POST',
                      }).then((response) => {
                        if (!response.ok) {
                          setEmail('');
                          setMessage('You are already subscribed!');
                        } else {
                          response.json().then((data) => {
                            if (!data.error) {
                              setEmail('');
                              setMessage('Success! Thank you for subscribing!');
                            }
                          });
                        }
                        setSubscribe('Subscribe!');
                      });
                    } else {
                      setMessage('Please enter a valid email address');
                      setSubscribe('Subscribe!');
                    }
                  }}
                >
                  {subscribe}
                </button>
              </div>
              <div>
                <p className="mt-4 text-center text-lg font-bold text-[#FF1A75]">
                  {message}
                </p>
              </div>
              <div className="my-6 flex flex-col text-center sm:mb-0">
                <Link href="/blog" className="text-lg text-gray-700">
                  Let me read it first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Subscribe;
