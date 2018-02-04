// From https://dev-blog.apollodata.com/graphql-tools-a-simpler-way-to-create-graphql-apis-eadf018f3766

import { makeExecutableSchema } from 'graphql-tools';

// Construct a schema using the GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};

// Get a GraphQL.js Schema object
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
