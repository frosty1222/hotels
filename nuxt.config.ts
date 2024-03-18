// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        "~/assets/css/tailwind.css",
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/i18n",
        "@pinia/nuxt",
        '@pinia-plugin-persistedstate/nuxt',
        "nuxt-icon"
    ],

    piniaPersistedstate: {
        cookieOptions: {
          sameSite: 'strict',
        },
      },
      vite: {
        optimizeDeps: {
          include: process.env.NODE_ENV === 'development' ? ['naive-ui'] : [],
        },
        plugins: [
          Components({
            resolvers: [NaiveUiResolver()],
          }),
        ],
      },
    i18n: {
        locales: [
            {
                code: 'vi',
                iso: 'vi-VN',
                name: 'Tiếng Việt',
                file: 'vi.js',
            },
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en.js',
            },
        ],
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'en',
    },
    plugins: [
        '~/plugins/vue-tailwind-datepicker.js',
    ],
    router: {
        options: {
            linkActiveClass: "active",
            linkExactActiveClass: "active",
            scrollBehaviorType: "auto",
        },
    },
    routeRules: {
        '/login': { ssr: false },
        '/cms/**': { ssr: false },
      },
    runtimeConfig: {
        public: {
            baseURL: "",
            apiKeyGoogleMap: "",
        },
    },
})
