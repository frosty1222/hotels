export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (to.path.includes("/cms")) {
    if (!userStore.checkAuth()) return navigateTo("/login");
  }
});
