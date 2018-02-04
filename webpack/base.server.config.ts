import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackNodeExternals from 'webpack-node-externals';

const baseServerConfig: webpack.Configuration = {
  entry: path.resolve(__dirname, '../server/index.ts'),
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../tsconfig.client.json'),
        },
        test: /\.tsx?$/,
      },
    ],
  },
  node: {
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/server'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.pug', '.js'],
  },
  target: 'node',
};

export default baseServerConfig;
