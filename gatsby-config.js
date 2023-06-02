require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Theme Machine`,
    version: `1.0.0`,
    description: `A React/Redux sandbox to play around with colors, fonts and sizing to quickly mock the CSS of your next project before writing any code. Spend less time writing and more time on what matters.`,
    author: `Eric Alain`,
    siteUrl: `https://ericalain.ca`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-redux-persist`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/createStore",
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
          // otherwise `JSON.parse` is used
          isJSON: true,
          unsafe: false,
          ignoreFunction: true
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: "__PRELOADED_STATE__"
      }
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `theme-machine`,
        short_name: `TM`,
        start_url: `/`,
        background_color: `#14213d`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#14213d`,
        display: `minimal-ui`,
        icons: [
          {
            src: `/src/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `any`
          },
          {
            src: `/src/images/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any`
          },
          {
            src: `/src/images/android-chrome-maskable-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/src/images/android-chrome-maskable-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any`
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-netlify`
  ]
}
