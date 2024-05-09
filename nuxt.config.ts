// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: ['nvd-u/u-core.scss'],
  components: [
    { path: 'components', pathPrefix: false },
    {path:'node_modules/nvd-u/components',pathPrefix:false}
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nuxt APP",
      meta: [{ name: "description", content: "Everything about Nuxt 3" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
})
