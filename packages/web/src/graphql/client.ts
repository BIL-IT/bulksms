import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://172.16.40.21:2001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
