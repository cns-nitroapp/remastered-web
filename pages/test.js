import cache from "memory-cache";

const cachedFetch = async (url) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const hours = 24;
    const response = await fetch(url);
    const data = await response.json();
    cache.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
};

const regularFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


export default function Home({ data }) {
  return (
    <div>
      { data }
    </div>
  );
}

// Get serverside props
export async function getServerSideProps() {
  const data = await cachedFetch('https://api.remastered.nitroapp.de/overview');
  return {
    props: {
      transactionData: data.transactions.transactions,
      global: data.global["stats"],
    }
  }
}