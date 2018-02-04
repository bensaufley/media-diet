import * as webpack from 'webpack';

import productionConfig from './production.config';

const [prodClientConfig, prodServerConfig] = productionConfig;

const testConfig: webpack.Configuration[] = [
  {
    ...prodClientConfig,
  },
  {
    ...prodServerConfig,
  },
];

export default testConfig;
