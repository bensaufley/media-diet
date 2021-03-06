import * as webpack from 'webpack';

import baseClientConfig from './base.client.config';
import baseServerConfig from './base.server.config';

const productionConfig: webpack.Configuration[] = [
  {
    ...baseClientConfig,
  },
  {
    ...baseServerConfig,
  },
];

export default productionConfig;
