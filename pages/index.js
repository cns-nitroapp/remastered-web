import Head from 'next/head'
import { RefreshIcon, SearchIcon, BadgeCheckIcon } from '@heroicons/react/solid';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import cachedFetch from '../libs/fetch';

/*
<a href={"/uuid/" + x.sender.uuid} className="hover:text-indigo-700 transition-all">{x.sender.name}</a>
<a href={"/uuid/" + x.receiver.uuid} className="hover:text-indigo-700 transition-all">{x.receiver.name}</a>
*/

const soon = () => toast.error('Feature coming soon', { icon: "⏳",  style: { fontWeight: "bold" } });
const loading = () => toast.loading("Loading...", { autoClose: true, duration: 1700 });


function format(number) {
  var Begriff = number.toString();
  var nBegriff = "";
  for (var i = Begriff.length - 3; i >0; i-=3){
    var sub = Begriff.substr(i, 3);
    if (nBegriff) nBegriff = "." + nBegriff;
    nBegriff =sub  +nBegriff;
  }
  if (nBegriff) nBegriff = "." + nBegriff;
  nBegriff = Begriff.substr(0, (3+i)) + nBegriff;
  return nBegriff;
}

export default function Home({ transactionList, global }) {

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightgrey">
      <Head>
        <title>Nitroapp: Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

<img src="/black-transparent.png" alt="Nitroapp Logo" className="h-20 mt-5 lg:ml-2 mb-5 md:absolute md:top-5 md:left-5 focus:outline-none hover:ring-2 hover:ring-offset-2 rounded-xl transition-all" onClick={() => router.push("/")}/>

      <div className="flex flex-wrap max-w-4xl md:mt-32 transition-all lg:px-18 cursor-default justify-around md:justify-between md:px-5 w-full">
        <div className="text-center py-2">
          <div className="md:text-left text-center">
            <h1 className="text-4xl font-semibold text-black">
              Home
            </h1>
            <p className="text-lg text-black pt-1 font-medium">
              General Overview
            </p>
          </div>
        </div>
        <div className="text-center h-10 hidden md:flex">
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
            onClick={() => router.push("/"), loading}
          >
            <RefreshIcon className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

        <div className="flex flex-wrap max-w-4xl mt-12 transition-all lg:px-18 px-5 cursor-default">
        <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white hover:bg-lightgrey transition-all hover:ring-2 hover:ring-indigo-500">
            <a
              className="p-6 text-left w-52 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ format(global[0].total) } CRD</h3>
              <p className="mt-1 text-md">
                Total
              </p>
            </a>

            <a
              className="p-6 text-left w-52 rounded-xl hidden md:table-cell"
            >
              <h3 className="text-xl font-bold">{ format(global[0].average) } CRD</h3>
              <p className="mt-1 text-md">
                Average
              </p>
            </a>

            <a
              className="p-6 text-left w-32 rounded-xl hidden md:table-cell"
            >
              <h3 className="text-xl font-bold">{ format( global[0].amount ) }</h3>
              <p className="mt-1 text-md">
                Players
              </p>
            </a>
          </div>
          <div className="w-full flex flex-wrap items-left md:mt-28 mb-28 mt-16">
            <a className="text-left">
              <h3 className="text-lg font-medium">Latest transactions</h3>
            </a>
            <div className="border rounded-xl w-full flex flex-wrap text-left justify-around bg-white lg:visible transition-all mt-10 p-6">
              <table className="table-auto w-full">
                        <thead className="text-md font-semibold">
                            <tr className="mb-5">
                                <th className="p-5 whitespace-nowrap">
                                    <div className="font-semibold text-left">From</div>
                                </th>
                                <th className="p-5 whitespace-nowrap hidden md:table-cell">
                                    <div className="font-semibold text-left">To</div>
                                </th>
                                <th className="p-0 whitespace-nowrap">
                                    <div className="font-semibold text-left">Amount</div>
                                </th>
                                <th className="p-0 whitespace-nowrap hidden md:table-cell">
                                    <div className="font-semibold text-center">ID</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-md divide">
                        {transactionList.transactions.map((x, i) => <tr key={i} className="cursor-pointer" onClick={ () => router.push("/transactions/" + x._id) }>
                                <td className="p-5 whitespace-nowrap mb-5 font-medium">
                                    <div className="flex items-center">
                                        {
                                            x.sender.name === "Nitroapp" ? (
                                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src="https://i.imgur.com/0FocYBV.png" width="32" height="32"></img></div>
                                            ) : (
                                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src={"https://visage.surgeplay.com/face/32/" + x.sender.uuid} width="32" height="32"></img></div>
                                            )
                                        }
                                        {
                                          x.sender.name === "Nitroapp" ? (
                                            <div className="font-medium text-gray-800 pb-2 hover:text-indigo-500 hover:transition-all">{x.sender.name}<BadgeCheckIcon className="ml-1 inline-block w-5 text-indigo-500" /></div>
                                          ) : (
                                            <div className="font-medium text-gray-800 pb-2 hover:text-indigo-500 hover:transition-all">{x.sender.name}</div>
                                          )
                                        }
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap hidden md:table-cell">
                                  <div className="text-left pb-2 hover:text-indigo-500 hover:transition-all">{x.receiver.name}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500 pb-2 hover:text-green-600 hover:transition-all">{ format(x.amount) } CRD</div>
                                </td>
                                <td className="p-2 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-center hover:text-indigo-500 transition-all pb-2" >{x._id}</div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await cachedFetch('https://api.remastered.nitroapp.de/overview');
  return {
    props: {
      transactionList: data.transactions,
      global: data.global["stats"],
    }
  }
}
