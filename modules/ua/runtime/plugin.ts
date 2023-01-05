import { log } from 'console';
import { getUA } from './fetchUA';

// initialised empty
let UA = '';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  const baseUrl = config.public.uaBaseUrl;

  if (process.server) {
    const { ua } = await getUA($fetch, baseUrl);

    nuxtApp.payload.UA = ua;
  } else if (nuxtApp.payload && nuxtApp.payload.UA) {
    UA = nuxtApp.payload.UA;
  }

  return {
    provide: {
      ua: UA,
    },
  };
});
