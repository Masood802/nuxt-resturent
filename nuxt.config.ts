// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['nvd-u/u-core.scss'],
  components: [
    { path: 'components', pathPrefix: false },
    {path:'node_modules/nvd-u/components',pathPrefix:false}
  ],
  devtools: { enabled: false },
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
      script: [
       {src:"https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC4800J442xrkb5zUzGSEHA5GHHnMmccgc"}
      ]
    },
  },
})
