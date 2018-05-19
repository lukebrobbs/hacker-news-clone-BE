const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;
//implementation of GraphQl schema
const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews clone",
    feed: () => links,
    link: (root, args) => links.filter(link => link.id === args.id)[0]
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const link = {
        id: args.id,
        description: args.description,
        url: args.url
      };
      const index = links.map(link => link.id).indexOf(args.id);
      links[index] = link;
      return link;
    },
    deleteLink: (root, args) => {
      const index = links.map(link => link.id).indexOf(args.id);
      const link = links[index];
      links.splice(index, 1);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
