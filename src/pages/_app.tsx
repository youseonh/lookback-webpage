import React, { FC } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@/src/styles/theme";
import { GlobalStyle } from "@/src/styles/global-style";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ConfigProvider } from "antd";
import Head from "next/head";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== "production" ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      <Hydrate state={pageProps.dehydratedProps}>
        <RecoilRoot>
          <ConfigProvider
            theme={{
              token: theme,
            }}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Head>
                <title>LookBack</title>
                <link rel="icon" href="favicon.ico" />
              </Head>
              <Component {...pageProps} />
            </ThemeProvider>
          </ConfigProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
