import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Connection } from 'typeorm';

import { userQuery } from './queries/User';

import * as UserGraphql from './schemas/User.graphql';
import * as QueryGraphql from './schemas/Query.graphql';

const typeDefs = [UserGraphql, QueryGraphql];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      user: userQuery,
    },
  },
});
