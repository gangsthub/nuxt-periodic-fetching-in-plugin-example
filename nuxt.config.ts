// https://v3.nuxtjs.org/api/configuration/nuxt.config
import UaModule from './modules/ua/module';

export default defineNuxtConfig({
  modules: [UaModule],
  ua: {
    baseUrl: 'https://httpbin.org/get',
  },
});
