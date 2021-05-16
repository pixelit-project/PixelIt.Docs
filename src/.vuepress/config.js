const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Bastelbunker.de die Dokumentation',
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
    repo: 'https://github.com/o0shojo0o/doc',
    editLinks: true,
    docsDir: 'src',
    //editLinkText: '',
    lastUpdated: false,
    //nav: [],
    sidebar: [
      {
        title: 'Pixel It',   // required
        path: '/pixelit',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/pixelit/',
          '/pixelit/firmware',
          '/pixelit/hardware',
          '/pixelit/webinterface',
          '/pixelit/api',
          '/pixelit/tools',
        ]
      },
      {
        title: 'ioBroker PixelIt',   // required
        path: '/ioBroker_pixelit',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [      
          'ioBroker_pixelit/',
          'ioBroker_pixelit/options',             
        ]
      },
      {
        title: 'ioBroker Seq',   // required
        path: '/ioBroker_seq',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/ioBroker_seq/',   
          '/ioBroker_seq/options',        
        ]
      },
      {
        title: 'ioBroker Traccar',   // required
        path: '/ioBroker_traccar',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/ioBroker_traccar/',          
        ]
      },
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-smooth-scroll',
    '@vuepress/back-to-top',
    ['vuepress-plugin-code-copy', {staticIcon: true}],
    ['vuepress-plugin-matomo', {'siteId': 8,'trackerUrl': "https://matomo.dietru.de/"}],
  ]
}
