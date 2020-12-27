// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Robert McFarlin',
  plugins: [{
    use: '@gridsome/source-filesystem',
    options: {
      typeName: 'Resource',
      path: './Content/Resources/**/*.md',
      remark: {
        
        }
    }
  },
  {
    use: '@gridsome/source-filesystem',
    options: {
      typeName: 'Post',
      path: './Content/Blog/**/*.md',
      remark: {
        
        }
    }
  }],
  siteUrl: 'https://rmcfarlin.github.io',
}
