
// const fs = require('fs-extra')
// const jsonData = JSON.parse(fs.readFileSync('static/TaskDataFormat.json'))

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'},
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-1.12.4.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' }
    ],
    bodyAttrs: {
      class: 'bg-light'
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/T_TaskFileLoader.js', mode: 'server' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  env: {
    // jsonData: jsonData,
  }
}
