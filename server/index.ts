import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import * as Koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as koaMount from 'koa-mount';
import * as KoaRouter from 'koa-router';
import * as koaStatic from 'koa-static';
import * as path from 'path';
import * as webpack from 'webpack';

import { schema } from './graphql-stub';
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
  const wp: typeof webpack = require('webpack');
  const compiler: webpack.Compiler = wp(require('../webpack/development.config').default);
  const koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

  app.use(koaWebpackDevMiddleware(compiler, {}));
}

app.use(koaMount('/assets', assets));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  context.body = prerender(context);
});

app.listen(80);
