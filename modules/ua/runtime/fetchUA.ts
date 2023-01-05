import { Ref } from 'nuxt/dist/app/compat/capi';

export let UA = '';

export const getUA = (
  $fetch: (url: string) => Promise<any>,
  url: string
): Promise<{ ua: string }> => {
  const fetchUA = async () => {
    const res = await $fetch(url);
    console.count('fetching');

    // this is just related to this specific API
    UA = res.headers['User-Agent'];
  };

  const periodicFetchUA = async () => {
    await fetchUA();

    setInterval(() => fetchUA(), 5000);
    return { ua: UA };
  };

  return periodicFetchUA();
};
