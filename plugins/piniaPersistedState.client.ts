import { PiniaPluginContext } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(createPersistedState());
});
