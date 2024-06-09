import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/graphql"
      : "https://172.16.16.108:2001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
