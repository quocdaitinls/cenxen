import React, {useEffect} from "react";
import {StoreProvider as GQLApisProvider} from "gql-apis-store";
import {Provider as StoreProvider} from "react-redux";
import store from "src/redux/store";
import {apisStore} from "@apis/gql";
import {SocketProvider} from "src/context/SocketContext";
import {QueryClient, QueryClientConfig, QueryClientProvider} from "react-query";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {defaultTheme} from "@themes";
import Head from "next/head";
import {AppProps} from "next/app";
import "@styles/global.css";

import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "src/utils/createEmotionCache";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const myQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {staleTime: 1000 * 20},
  },
};

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient(myQueryClientConfig)
  );

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <SocketProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <GQLApisProvider value={apisStore}>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  name='viewport'
                  content='initial-scale=1, width=device-width'
                />
              </Head>
              <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </GQLApisProvider>
        </QueryClientProvider>
      </StoreProvider>
    </SocketProvider>
  );
}

export default MyApp;
