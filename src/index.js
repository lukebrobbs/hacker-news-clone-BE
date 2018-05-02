const { GraphQLServer } = require("graphql-yoga");

//define GraphQL schema
const typeDefs = `type Query {info:String!}`;

//implementation of GraphQl schema
const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews clone"
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
