import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import { Layout } from "@/component/common/Layout";
import { QueryClientProvider, QueryErrorBoundary } from "@/component/common/ReactQuery";
import { ToastContainer, ToastProvider } from "@/component/common/Toast";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.getItem("pocket-dark-mode") === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <>
      <Head>
        <title>포켓약사</title>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes"
          name="viewport"
        />
      </Head>
      <QueryClientProvider hydrateState={pageProps.hydrateState}>
        <ToastProvider>
          <Layout>
            <QueryErrorBoundary>
              <ToastContainer />
              <Component {...pageProps} />
            </QueryErrorBoundary>
          </Layout>
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
}
