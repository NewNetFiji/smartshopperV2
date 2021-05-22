import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import type { AppProps /*, AppContext */ } from "next/app";
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from "../src/generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
               {query: MeDocument},
               _result,
               (result,query)=> {
                if (result.login.errors){
                  return query
                }else {
                 return { me: result.login.user}
                }
               }
            )
          },

          register: (_result, args, cache, info) => {
            
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
               {query: MeDocument},
               _result,
               (result,query)=> {
                if (result.register.errors){
                  return query
                }else {
                 return { me: result.register.user}
                }
               }
            )
          }
        },
      },
    }),
    fetchExchange,
  ],
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider value={client}>
      <React.Fragment>
        <Head>
          <title>Smart Shopper Fj</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
