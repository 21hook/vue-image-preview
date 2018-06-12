const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',// default env
  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-img-preview.min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { // opt for the loader
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      // load external styles
      // & <style> block in .vue files into internal styles
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader'],
      },
      // transform ES6 & <script> block in .js files
      // into the ES5 file
      {
        test: /\.js$/,
        loader: 'babel-loader',
         exclude: /node_modules/, // exclude the path; file tree traversal
        options: {
          presets: ['es2015'] // transform rule: ES6
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      { // module matching rules
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // match the font files
        loader: 'url-loader', // use the loader
        options: { // opt for the loader
          limit: 1000 // limit for data URL
        }
      }
    ]
  },
  plugins: [
    // expose the interface for the host app to instantiate
    new VueLoaderPlugin() // expose the interface for the client to use
  ],
  optimization: {
    minimize: true, // minimize the bundles using UglifyjsWebpackPlugin
    splitChunks: { // split common chunks(node modules) for multiple dependencies
      chunks: 'all', // for all chunks
      // name: 'vue-element-ui' // the name of the split chunk
    }
  },
  resolve: { // module resolve opt
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'] // automatically search the file extensions, when importing modules
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  console.log('inner hi')
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
console.log('hi');
