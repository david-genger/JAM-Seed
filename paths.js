const { resolve, join } = require('path')

const projectRoot = __dirname;

module.exports = {
  projectRoot,
  distribution: join(projectRoot, 'dist'),


  // Metalsmith
  metalsmithSource: 'pages',
  metalsmithDestination: join('dist'),

  // Webpack
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: '/assets/',

  // Server
  serverRoot: join(projectRoot, 'dist'),
  pageBasePath: process.env.NODE_ENV !== 'production' ? '' : '/metalsmith-webpack-suite'
}
