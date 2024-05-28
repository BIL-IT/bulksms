import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://172.16.40.25:3001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
