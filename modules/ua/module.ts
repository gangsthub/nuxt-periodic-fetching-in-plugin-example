import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

import { ModuleOptions } from './types.d';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'ua',
    configKey: 'ua',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options for your module
  defaults: {
    baseUrl: process.env.BASE_URL,
  },
  hooks: {},
  async setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.uaBaseUrl = moduleOptions.baseUrl

    addPlugin(resolve('./runtime/plugin'));
  },
});
