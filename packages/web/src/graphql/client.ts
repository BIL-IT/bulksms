import { ApolloClient, InMemoryCache } from "@apollo/client";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/graphql"
      : "https://sms.bil.local:2001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
