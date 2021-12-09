import Head from 'next/head'
import { RefreshIcon, SearchIcon } from '@heroicons/react/solid';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightgrey">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-lightgrey">
      <img src="/black-transparent.png" alt="Nitroapp Logo" className="h-20 lg:ml-2 mb-5 absolute top-5 left-5" />

        <div className="flex flex-wrap max-w-4xl mt-6 absolute top-24 transition-all lg:px-20 px-5">
          <div className="mb-10 text-left">
            <span className="sm:ml-3 absolute right-20 invisible lg:visible justify-around flex flex-wrap">
              <button
                type="button"
                className="flex items-center mr-4 pl-5 pr-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-almostblack hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:bg-black transition duration-150 ease-in-out"
              >
                <SearchIcon className="w-5 h-5 mr-1" />
                Lookup
              </button>
              <button
                type="button"
                className="flex items-center pl-5 pr-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-indigo-600 transition duration-150 ease-in-out"
              >
                <RefreshIcon className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </span>
            <h1 className="text-4xl font-semibold text-black">
              Home
            </h1>
            <p className="text-lg text-black pt-1 font-medium">
              General overview
            </p>
          </div>
          <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white hover:bg-darkgrey lg:visible invisible">
            <a
              className="p-6 text-left w-48 rounded-xl pointer-events-none"
            >
              <h3 className="text-xl font-bold">1.000.000</h3>
              <p className="mt-1 text-md">
                Price
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl pointer-events-none"
            >
              <h3 className="text-xl font-bold">500.000</h3>
              <p className="mt-1 text-md">
                Average
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl pointer-events-none"
            >
              <h3 className="text-xl font-bold">24</h3>
              <p className="mt-1 text-md">
                Players
              </p>
            </a>
          </div>
        </div>

      </main>
    </div>
  )
}
