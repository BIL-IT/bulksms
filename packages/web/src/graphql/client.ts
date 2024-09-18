import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/graphql"
      : "https://sms.bil.local:2001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
