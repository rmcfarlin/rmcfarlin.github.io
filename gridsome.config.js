// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Robert McFarlin',
  plugins: [{
  //   use: '@gridsome/source-filesystem',
  //   options: {
  //     typeName: 'Resource',
  //     path: './Content/Resources/**/*.md',
  //     remark: {
        
  //       }
  //   }
  // },
  // {  {
    use: '@gridsome/source-contentful',
    options: {
      space: process.env.SPACEID, // required
      accessToken: process.env.TOKEN, // required
      host: 'cdn.contentful.com',
      environment: 'master',
      typeName: 'Contentful'
    }
  }],
  siteUrl: 'https://rmcfarlin.github.io',
  templates: {
    ContentfulBlog: '/blog/:slug',
    ContentfulBook: '/book/:slug',
    ContentfulValuation: '/valuation/:slug',
    ContentfulCertification: '/certification/:slug'
  }
}
