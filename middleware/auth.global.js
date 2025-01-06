export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (!userStore.user && to.path !== '/auth' && to.path !== '/') {
    return navigateTo('/auth');
  } else if (userStore.user && to.path === '/auth') {
    return navigateTo('/');
  }
});
