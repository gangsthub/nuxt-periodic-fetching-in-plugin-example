import { Ref } from 'nuxt/dist/app/compat/capi';

type Fetch = (url: string) => Promise<any>;

let UA = '';

const fetchUA = async ($fetch: Fetch, apiUrl: string) => {
  const res = await $fetch(apiUrl);
  console.count('fetching');

  // this is just related to this specific API
  UA = res.headers['User-Agent'];
};

const periodicFetchUA = async ($fetch: Fetch, apiUrl: string) => {
  await fetchUA($fetch, apiUrl);

  setInterval(() => fetchUA($fetch, apiUrl), 5000);
  return { ua: UA };
};

export const getUA = (
  $fetch: Fetch,
  apiUrl: string
): Promise<{ ua: string }> => {
  return periodicFetchUA($fetch, apiUrl);
};
