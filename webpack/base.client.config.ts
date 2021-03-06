import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const baseClientConfig: webpack.Configuration = {
  context: path.resolve(__dirname, '../client'),
  entry: ['./index.tsx'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'style-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-cssnext')(),
                ],
              },
            },
          ],
        }),
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../client/tsconfig.json'),
            },
          },
        ],
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx?$/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/assets',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextWebpackPlugin('bundle.css'),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  target: 'web',
};

export default baseClientConfig;
