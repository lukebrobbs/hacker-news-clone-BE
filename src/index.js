const { GraphQLServer } = require("graphql-yoga");

//define GraphQL schema
const typeDefs = `
type Query {
  info:String!, 
  feed:[Link!]!
} 
type Link {
  id:ID!, 
  description:String!, 
  url:String!
}
type Mutation {
  post(url: String!, description: String!): Link!
}
`;

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

//implementation of GraphQl schema
const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews clone",
    feed: () => links
  },
  Link: {
    id: root => root.id,
    description: root => root.description,
    url: root => root.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
