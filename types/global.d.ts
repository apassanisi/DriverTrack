declare module 'vue' {
  interface ComponentCustomProperties {
    useApi: typeof import('@/composables/useApi').useApi;
  }
}
