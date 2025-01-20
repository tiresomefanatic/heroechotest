export default defineNuxtRouteMiddleware((to) => {
  // Redirect root path to content/index
  if (to.path === '/') {
    return navigateTo('/content/index')
  }
})
