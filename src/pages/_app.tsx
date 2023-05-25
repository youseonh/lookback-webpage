import React, { FC } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/global-style";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={client}>
    {process.env.NODE_ENV !== "production" ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    <Hydrate state={pageProps.dehydratedProps}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Hydrate>
  </QueryClientProvider>
);

export default App;
