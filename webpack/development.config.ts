import * as webpack from 'webpack';

import baseClientConfig from './base.client.config';
import baseServerConfig from './base.server.config';

const developmentConfig = [
  {
    ...baseClientConfig,
  },
  {
    ...baseServerConfig,
  },
];

export default developmentConfig;
