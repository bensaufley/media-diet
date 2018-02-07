import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackNodeExternals from 'webpack-node-externals';

const baseServerConfig: webpack.Configuration = {
  context: path.resolve(__dirname, '../server'),
  entry: ['./index.ts'],
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
          configFile: path.resolve(__dirname, '../server/tsconfig.json'),
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
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.IgnorePlugin(/\.css$/),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.pug', '.js'],
  },
  target: 'node',
};

export default baseServerConfig;
