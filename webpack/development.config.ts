import * as webpack from 'webpack';

import baseClientConfig from './base.client.config';
import baseServerConfig from './base.server.config';

const developmentConfig: webpack.Configuration[] = [
  {
    ...baseClientConfig,
    devtool: 'source-map',
  },
  {
    ...baseServerConfig,
    devtool: 'inline-source-map',
    plugins: [
      ...baseServerConfig.plugins!,
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
];

export default developmentConfig;
