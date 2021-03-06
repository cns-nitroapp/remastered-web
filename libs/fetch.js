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

export default cachedFetch;