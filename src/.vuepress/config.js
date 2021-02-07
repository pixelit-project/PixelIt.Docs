const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Bastelbunkers Dokumentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description:  'Bastelbunkers Dokumentation',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    //repo: '',
    //editLinks: false,
    //docsDir: '',
    //editLinkText: '',
    //lastUpdated: true,
    //nav: [],
    sidebar: [
      //{
      //  title: 'Home',   // required
      //  path: '/',      // optional, link of the title, which should be an absolute path and must exist
      //  collapsable: false, // optional, defaults to true
      //  sidebarDepth: 0,    // optional, defaults to 1       
      //},
      {
        title: 'Pixel It',   // required
        path: '/pixelIt',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/pixelIt/software',
          '/pixelIt/hardware',
          '/pixelIt/api',
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

