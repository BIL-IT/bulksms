import { client } from "@/graphql";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/sideNav";
import StatusComponent from "@/components/status";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  return (
    <ApolloProvider client={client}>
      <main
        className={`${theme === "dark" && "dark"} text-foreground flex min-h-screen gap-7`}
      >
        <StatusComponent />
        <SideNav />
        <Component {...pageProps} />
      </main>
      <Toaster />
    </ApolloProvider>
  );
}
