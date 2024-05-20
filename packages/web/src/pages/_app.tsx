import { Navbar } from "@/components";
import { client } from "@/graphql";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  return (
    <ApolloProvider client={client}>
      <main
        className={`${theme === "dark" && "dark"} text-foreground flex flex-col min-h-screen [&>section]:flex-1`}
      >
        <Navbar theme={theme} setTheme={setTheme} />
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
