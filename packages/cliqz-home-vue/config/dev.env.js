var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  test: [/\.vue$/, /\.scss$/],
  use: {
    loader: 'vue-loader',
    options: {
      loaders: {
        scss: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    }
  }
})
