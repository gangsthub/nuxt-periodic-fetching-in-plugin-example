import { ref } from 'vue';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  // fetching UA API with `useAsyncData`
  const fetchUA = async (baseUrl: string) => {
    const { data } = await useAsyncData<any>('ua', () => $fetch(baseUrl));

    return data.value.headers['User-Agent'];
  };

  const config = useRuntimeConfig();
  const baseUrl = config.public.uaBaseUrl;
  const UA = ref('');

  if (process.server) {
    // fetch UA on server-side
    const ua = await fetchUA(baseUrl);
    // Save UA to payload
    nuxtApp.payload.UA = ua;

    // Set UA, so it's available in the server-side
    UA.value = ua;
  } else if (nuxtApp.payload && nuxtApp.payload.UA) {
    // Retrieve UA from payload
    UA.value = nuxtApp.payload.UA;
  }

  if (process.client) {
    // fetch UA periodically, on client-side
    setInterval(async () => {
      const ua = await fetchUA(baseUrl);

      console.count('UA periodic fetching in client');

      UA.value = ua;
    }, 5000);
  }

  return {
    provide: {
      ua: UA,
    },
  };
});
