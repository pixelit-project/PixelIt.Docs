const {
  description
} = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'PixelIt Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'PixelIt Documentation',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/pixelit-project/Docs',
    editLinks: true,
    docsDir: 'src',
    //editLinkText: '',
    lastUpdated: false,
    //nav: [],
    sidebar: [{
      title: 'PixelIt', // required
      path: '/', // optional, link of the title, which should be an absolute path and must exist
      collapsable: true, // optional, defaults to true
      sidebarDepth: 1, // optional, defaults to 1
      children: [
        '/',
        '/firmware',
        '/hardware',
        '/webinterface',
        '/api',
        '/tools',
        '/nodered',
        '/iobroker',
      ]
    }]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-smooth-scroll',
    '@vuepress/back-to-top',
    ['vuepress-plugin-code-copy', {
      staticIcon: true
    }],
    ['vuepress-plugin-matomo', {
      'siteId': 8,
      'trackerUrl': "https://matomo.dietru.de/"
    }],
  ]
}