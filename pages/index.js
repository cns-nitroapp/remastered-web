import Head from 'next/head'
import { RefreshIcon, SearchIcon } from '@heroicons/react/solid';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

/*
<a href={"/uuid/" + x.sender.uuid} className="hover:text-indigo-700 transition-all">{x.sender.name}</a>
<a href={"/uuid/" + x.receiver.uuid} className="hover:text-indigo-700 transition-all">{x.receiver.name}</a>
*/

const soon = () => toast.error('Feature coming soon', { icon: "⏳",  style: { fontWeight: "bold" } });
const loading = () => toast.loading("Refreshing...", { autoClose: true, duration: 1700 });

function refresh() {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
}

export default function Home({ transactionList, global }) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightgrey">
      <Head>
        <title>Nitroapp: Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-lightgrey">

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <img src="/black-transparent.png" alt="Nitroapp Logo" className="h-20 lg:ml-2 mb-5 absolute top-5 left-5" />

        <div className="flex flex-wrap max-w-4xl mt-6 absolute top-24 transition-all lg:px-20 px-5 cursor-default">
          <div className="mb-10 text-left">
            <span className="sm:ml-3 absolute right-20 invisible lg:visible justify-around flex flex-wrap">
              <button
                type="button"
                className="flex items-center mr-4 pl-5 pr-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-almostblack hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:bg-black transition duration-150 ease-in-out"
                onClick={soon}
              >
                <SearchIcon className="w-5 h-5 mr-1" />
                Lookup
              </button>
              <button
                type="button"
                className="flex items-center pl-5 pr-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-indigo-600 transition duration-150 ease-in-out"
                onClick={refresh(), loading}
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
          <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white hover:bg-lightgrey lg:visible invisible transition-all hover:ring-2 hover:ring-indigo-500">
            <a
              className="p-6 text-left w-48 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ global[0].total }</h3>
              <p className="mt-1 text-md">
                Total
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ global[0].average }</h3>
              <p className="mt-1 text-md">
                Average
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ global[0].amount }</h3>
              <p className="mt-1 text-md">
                Players
              </p>
            </a>
          </div>
          <div className="w-full flex flex-wrap items-left mt-10">
            <a className="text-left">
              <h3 className="text-lg font-medium">Last transactions</h3>
            </a>
            <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white lg:visible invisible transition-all mt-10 p-6">
            <a className="w-full flex flex-wrap justify-around p-3 mb-5 rounded-xl font-medium">
              <p>From</p>
              <p>to</p>
              <p>Amount</p>
              <p>Timestamp</p>
            </a>
            {transactionList.transactions.map((x, i) => <div key={i} className="w-full flex flex-wrap items-left justify-around p-3 m-2 border rounded-xl hover:bg-lightgrey hover:ring-2 hover:ring-indigo-500 transition-all hover:ring-offset-2">
              <a className="hover:text-indigo-700 transition-all">{x.sender.name}</a>
              <a className="hover:text-indigo-700 transition-all">{x.receiver.name}</a>
              <a>{x.amount}</a>
              <a>{x.timestamp}</a>
              </div>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const [tres, gres] = await Promise.all([
    fetch("https://api.remastered.nitroapp.de/transactions"),
    fetch("https://api.remastered.nitroapp.de/global")
  ]);
  const [transactionList, global] = await Promise.all([
    tres.json(),
    gres.json(),
  ]);
  return {
    props: {
      transactionList: transactionList,
      global: global['stats'],
    },
  };
};
