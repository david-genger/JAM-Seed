const {
    join
  } = require('path');
  const Path = require('path');
  const Webpack = require('webpack')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  
  const paths = require('./paths.js')
  
  const config = {
    entry: {
      main: join(paths.webpackSource, 'js', 'main.js')
    },
    output: {
      path: paths.webpackDestination,
      publicPath: paths.webpackPublicPath,
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader', 'postcss-loader']
          })
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /fontawesome[\s\S]*.svg$/,
          loader: 'file-loader',
          options: {
            name: 'webfonts/[name].[ext]'
          }
        },
        {
          test: /\.svg$/,
          use: 'svg-url-loader'
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'webfonts/[name].[ext]',
          }
        },
        {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: '$'
            },
            {
              loader: 'expose-loader',
              options: 'jQuery'
            }
          ]
        },
        {
          test: require.resolve('turbolinks'),
          use: [{
              loader: 'expose-loader',
              options: 'Turbolinks'
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'page.css',
        allChunks: true
      }),
      new Webpack.ProvidePlugin(
        {
        $: "jquery",
        jQuery: "jquery"
      }
    )
    ],
    resolve: {
      alias: {
        "TweenLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      }
    },
  }
  
  module.exports = config;