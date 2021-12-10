import Head from 'next/head'
import { ChevronLeftIcon } from '@heroicons/react/solid';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

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

<img src="/black-transparent.png" alt="Nitroapp Logo" className="h-20 lg:ml-2 mb-5 absolute top-5 left-5 hover:bg-gray-200 rounded-xl transition-all" onClick={() => router.push("/")}/>

      <div className="flex flex-wrap max-w-4xl mt-32 transition-all lg:px-18 cursor-default justify-between w-full px-5">
        <div className="text-center py-2">
          <div className="text-left">
            <h1 className="text-4xl font-semibold text-black">
              Transaction
            </h1>
            <p className="text-lg text-black pt-1 font-normal">
              { router.query.id }
            </p>
          </div>
        </div>
        <div className="flex text-center h-10">
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
        <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white hover:bg-lightgrey lg:visible invisible transition-all hover:ring-2 hover:ring-indigo-500">
            <a
              className="p-6 text-left w-52 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ format(global[0].total) } CRD</h3>
              <p className="mt-1 text-md">
                Total
              </p>
            </a>

            <a
              className="p-6 text-left w-52 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ format(global[0].average) } CRD</h3>
              <p className="mt-1 text-md">
                Average
              </p>
            </a>

            <a
              className="p-6 text-left w-32 rounded-xl"
            >
              <h3 className="text-xl font-bold">{ global[0].amount }</h3>
              <p className="mt-1 text-md">
                Players
              </p>
            </a>
          </div>
          <div className="w-full flex flex-wrap items-left mt-8 mb-28">
            <div className="border rounded-xl w-full flex flex-wrap text-left justify-around bg-white lg:visible transition-all mt-10 p-6">
              <table className="table-auto w-full">
                        <tbody className="text-md divide">
                        {transactionList.transactions.map((x, i) => <tr key={i} className="cursor-pointer" onClick={ () => router.push("/transactions/" + x._id) }>
                                <td className="p-5 whitespace-nowrap mb-5 font-medium">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all" src={"https://visage.surgeplay.com/face/32/" + x.sender.uuid} width="32" height="32"></img></div>
                                        <div className="font-medium text-gray-800 pb-2">{x.sender.name}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left pb-2">{x.receiver.name}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500 pb-2">{x.amount} CRD</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
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
