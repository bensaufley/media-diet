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
    devtool: 'source-map',
    plugins: [
      ...baseServerConfig.plugins!,
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
    ],
  },
];

export default developmentConfig;
