const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Markdown App',
    description:
      '',
    author: '',
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: 'gatsby-transformer-sharp',
    },
    {
      resolve:'gatsby-plugin-sharp',
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Markdown application with firebase',
        short_name: 'Markdown app',
        description: `The application does cool things and makes your life better.`,
        start_url: '/',
        lang: `en`,
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
  ],
}
