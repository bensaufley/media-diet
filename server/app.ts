import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import * as Koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as koaMount from 'koa-mount';
import * as KoaRouter from 'koa-router';
import * as koaStatic from 'koa-static';
import * as path from 'path';
import * as typeorm from 'typeorm';
import * as webpack from 'webpack';

import schema from './graphql/schema';
import prerender from './prerender';

const app = new Koa();
const assets = new Koa();
const router = new KoaRouter();

assets.use(koaStatic(path.resolve(__dirname, '../client/')));

router.post('/graphql', koaBodyparser(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

if (process.env.NODE_ENV === 'development') {
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
}

if (process.env.NODE_ENV === 'development') {
  // TODO: Find a real solution for the problem this solves
  const processBadDirname = (obj: any): any => {
    switch (obj.constructor.name) {
      case 'Array': {
        return obj.reduce(
          (arr: any[], val: any) => ([
            ...arr,
            processBadDirname(val),
          ]),
          [] as any[],
        );
      }
      case 'Object': {
        return Object.entries(obj).reduce(
          (acc: object, [key, val]: [string, any]) => ({
            ...acc,
            [key]: processBadDirname(val),
          }),
          {} as any);
      }
      case 'String': {
        return obj.replace(/\/dist(?=\/)/, '');
      }
      default: {
        return obj;
      }
    }
  };

  const wp: typeof webpack = require('webpack');
  let clientConfig: webpack.Configuration = require('../webpack/development.config').default[0];
  clientConfig = processBadDirname(clientConfig);
  const compiler: webpack.Compiler = wp(clientConfig);
  const koaWebpack = require('koa-webpack')({
    compiler,
    dev: { host: '0.0.0.0', logLevel: 'trace', publicPath: clientConfig.output!.publicPath },
    hot: { host: '0.0.0.0', logLevel: 'trace', port: 8788 },
  });

  app.use(koaWebpack);
}

app.use(koaMount('/assets', assets));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  context.body = prerender(context);
});

export default app;
