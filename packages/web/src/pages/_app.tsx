import { Navbar } from "@/components";
import { client } from "@/graphql";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/sideNav";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  return (
    <ApolloProvider client={client}>
      <main
        className={`${theme === "dark" && "dark"} text-foreground flex min-h-screen gap-7`}
      >
        {/* <Navbar theme={theme} setTheme={setTheme} /> */}
        <SideNav />
        <Component {...pageProps} />
      </main>
      <Toaster />
    </ApolloProvider>
  );
}
