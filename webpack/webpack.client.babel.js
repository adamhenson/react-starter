import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import webpack from 'webpack';
import postcssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import path from 'path';

import common, {
  babelLoaderOptions,
  cssLoaderOptions,
  urlLoaderOptions,
} from './common';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  name: 'client',
  entry: {
    client: [
      ...(!isProduction && ['webpack-hot-middleware/client']),
      './src/client',
    ],
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-router',
    //   'react-router-dom',
    //   'react-toolbox',
    // ],
  },
  output: {
    ...common.output,
    filename: `js/[name]${isProduction ? '.[chunkhash:8]' : ''}.js`,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: cssLoaderOptions,
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    postcssImport({}),
                    cssnext({
                      browsers: ['last 2 versions', '> 5%'],
                      features: {
                        customProperties: {},
                      },
                    }),
                  ];
                },
              },
            },
          ],
        }),
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/react-toolbox'),
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelLoaderOptions,
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: '> 1%, Last 2 versions',
                    },
                    modules: false,
                  },
                ],
                'react',
              ],
            },
          },
        ],
      },
      {
        exclude: /\.(css|js|json)$/,
        use: [
          {
            loader: 'url-loader',
            options: urlLoaderOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    ...common.plugins,
    ...(isProduction
      ? [
        new AssetsPlugin({
          filename: 'assets.json',
          path: common.output.path,
        }),
      ]
      : [new webpack.HotModuleReplacementPlugin()]
    ),
    new ExtractTextPlugin({
      allChunks: true,
      filename: `css/style${isProduction ? '.[contenthash:8]' : ''}.css`,
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // (choose the chunks, or omit for all chunks)
    //   names: 'client',

    //   // (use all children of the chunk)
    //   children: true,

    //   // (create an async commons chunk)
    //   async: true,

    //   // (2 children must share the module before it's separated)
    //   minChunks: 2,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: ({ resource }) => /node_modules/.test(resource),
    // }),
    new WebpackMd5Hash(),
  ],
  bail: isProduction,
};
