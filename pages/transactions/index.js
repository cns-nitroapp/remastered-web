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

export default function Home() {

  const router = useRouter();
  router.push("/");

}

