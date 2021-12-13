import Head from 'next/head'
import { ChevronLeftIcon, BadgeCheckIcon, UserIcon, ChipIcon } from '@heroicons/react/solid';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import cachedFetch from '../../libs/fetch';

/*
<a href={"/uuid/" + x.sender.uuid} className="hover:text-indigo-700 transition-all">{x.sender.name}</a>
<a href={"/uuid/" + x.receiver.uuid} className="hover:text-indigo-700 transition-all">{x.receiver.name}</a>
*/

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

export default function Home({ transactionData }) {

    const router = useRouter();
    const loading = () => toast.loading("Loading...", { autoClose: true, duration: 1700 });

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

  <div className="flex flex-wrap max-w-4xl md:mt-32 transition-all lg:px-18 cursor-default justify-around md:justify-between w-full md:px-5">
        <div className="text-center py-2">
          <div className="md:text-left text-center">
            <h1 className="text-4xl font-semibold text-black" onClick={() => router.push("/")}>
              Transaction
            </h1>
            <p className="text-lg text-black pt-1 font-normal">
              { router.query.id }
            </p>
          </div>
        </div>
        <div className="flex text-center h-10 mt-6 md:mt-0">
          <button
            type="button"
            className="flex items-center pl-5 pr-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-almostblack hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:bg-black transition duration-150 ease-in-out"
            onClick={() => router.push("/")}
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>
      </div>

        <div className="flex flex-wrap max-w-4xl mt-12 transition-all lg:px-18 px-5 cursor-default">
        <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white hover:bg-lightgrey transition-all hover:ring-2 hover:ring-indigo-500">
            <a
              className="p-6 text-left w-48 rounded-xl hidden md:table-cell"
            >
              <h3 className="text-xl font-bold">{ transactionData.transaction[0].sender.name }</h3>
              <p className="mt-1 text-md">
                Sender
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl hidden md:table-cell"
            >
              <h3 className="text-xl font-bold">{ transactionData.transaction[0].receiver.name }</h3>
              <p className="mt-1 text-md">
                Recipient
              </p>
            </a>

            <a
              className="p-6 text-left w-48 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ format(transactionData.transaction[0].amount) } CRD</h3>
              <p className="mt-1 text-md">
                Amount
              </p>
            </a>
          </div>
          <div className="w-full flex flex-wrap items-left mt-8 mb-8">
          <a className="text-left">
              <h3 className="text-lg font-medium">Sender</h3>
            </a>
            <div className="border rounded-xl w-full flex flex-wrap text-left justify-around bg-white lg:visible mt-10 p-6 transition-all hover:ring-2 hover:ring-indigo-500">
              <table className="table-auto w-full">
                        <tbody className="text-md divide">
                        <tr>
                                <td className="p-5 whitespace-nowrap mb-5 font-medium">
                                    <div className="flex items-center">
                                        {
                                            transactionData.transaction[0].sender.name === "Nitroapp" ? (
                                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src="https://i.imgur.com/0FocYBV.png" width="32" height="32"></img></div>
                                            ) : (
                                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src={"https://visage.surgeplay.com/face/32/" + transactionData.transaction[0].sender.uuid} width="32" height="32"></img></div>
                                            )
                                        }
                                        {
                                            transactionData.transaction[0].sender.name === "Nitroapp" ? (
                                              <div className="font-medium text-gray-800 pb-2">{ transactionData.transaction[0].sender.name }<BadgeCheckIcon className="ml-1 inline-block w-5 text-indigo-500" /></div>
                                            ) : (
                                              <div className="font-medium text-gray-800 pb-2">{ transactionData.transaction[0].sender.name }</div>
                                            )
                                        }
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-left pb-2">{ transactionData.transaction[0].sender.uuid }</div>
                                </td>
                                {
                                  transactionData.transaction[0].sender.name === "Nitroapp" ? (
                                    <td className="p-2 whitespace-nowrap">
                                      <div className="font-medium text-gray-800 pb-2">
                                      <p className="md:inline-block hidden">Computer</p>
                                        <ChipIcon className="ml-2 w-5 text-indigo-500" />
                                      </div>
                                    </td>
                                  ) : (
                                    <td className="p-2 whitespace-nowrap">
                                      <div className="font-medium text-gray-800 pb-2">
                                      <p className="md:inline-block hidden">Player</p>
                                        <UserIcon className="ml-2 inline-block w-5 text-indigo-500" />
                                      </div>
                                    </td>
                                  )
                                }
                            </tr>
                        </tbody>
                    </table>

            </div>
          </div>
          <div className="w-full flex flex-wrap items-left mt-0 mb-28">
          <a className="text-left">
              <h3 className="text-lg font-medium">Recipient</h3>
            </a>
            <div className="border rounded-xl w-full flex flex-wrap text-left justify-around bg-white lg:visible mt-10 p-6 transition-all hover:ring-2 hover:ring-indigo-500">
              <table className="table-auto w-full">
                        <tbody className="text-md divide">
                        <tr>
                                <td className="p-5 whitespace-nowrap mb-5 font-medium">
                                    <div className="flex items-center">
                                      {
                                          transactionData.transaction[0].receiver.name === "Nitroapp" ? (
                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src="https://i.imgur.com/0FocYBV.png" width="32" height="32"></img></div>
                                          ) : (
                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src={"https://visage.surgeplay.com/face/32/" + transactionData.transaction[0].receiver.uuid} width="32" height="32"></img></div>
                                          )
                                      }
                                      {
                                            transactionData.transaction[0].receiver.name === "Nitroapp" ? (
                                              <div className="font-medium text-gray-800 pb-2">{ transactionData.transaction[0].receiver.name }<BadgeCheckIcon className="ml-1 inline-block w-5 text-indigo-500" /></div>
                                            ) : (
                                              <div className="font-medium text-gray-800 pb-2">{ transactionData.transaction[0].receiver.name }</div>
                                            )
                                        }
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-left pb-2">{ transactionData.transaction[0].receiver.uuid }</div>
                                </td>
                                {
                                  transactionData.transaction[0].receiver.name === "Nitroapp" ? (
                                    <td className="p-2 whitespace-nowrap">
                                      <div className="font-medium text-gray-800 pb-2">
                                        <p className="md:inline-block hidden">Computer</p>
                                        <ChipIcon className="ml-2 inline-block w-5 text-indigo-500" />
                                      </div>
                                    </td>
                                  ) : (
                                    <td className="p-2 whitespace-nowrap">
                                      <div className="font-medium text-gray-800 pb-2">
                                      <p className="md:inline-block hidden">Player</p>
                                        <UserIcon className="ml-2 inline-block w-5 text-indigo-500" />
                                      </div>
                                    </td>
                                  )
                                }
                            </tr>
                        </tbody>
                    </table>

            </div>
            <div className="w-full flex flex-wrap items-center justify-around mt-7">
            <a
              className="p-4 text-left w-half rounded-xl"
            >
              <p className="mt-1 text-md font-medium">
                Transaction executed: <p className="inline-block font-normal">{ transactionData.transaction[0].timestamp }</p>
              </p>
            </a>

            <a
              className="p-4 text-left w-half rounded-xl"
            >
              <p className="mt-1 text-md font-medium">
                Lookup requested: <p className="inline-block font-normal">{ transactionData.timestamp }</p>
              </p>
            </a>
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {

  const id = query.id;
  const data = await cachedFetch(`https://api.remastered.nitroapp.de/transactions/${id}`);

  return {
    props: {
      transactionData: data,
    }
  }
}
