import {
  cacheExchange,
  NullArray,
  Resolver,
  Variables,
  Cache,
} from "@urql/exchange-graphcache";
import Router from "next/router";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import gql from "graphql-tag";
import { isServer } from "./isServer";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "products"
    );

    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;

      const data = cache.resolve(key, "products") as string[];
      const _hasMore = cache.resolve(key, "hasMore");

      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedProducts",
      hasMore,
      products: results,
    };
  };
};

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "getProducts"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getProducts", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedProducts: () => null,
          Image: () => null,
        },
        resolvers: {
          Query: {
            getProducts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            vote: (_result, args, cache, info) => {
              const { productId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Product {
                    id
                    points
                    downPoints
                    voteStatus
                  }
                `,
                { id: productId } as any
              );

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                if (value) {
                  cache.writeFragment(
                    gql`
                      fragment __ on Product {
                        points
                        voteStatus
                      }
                    `,
                    {
                      id: productId,
                      points: data.points + 1,
                      voteStatus: value,
                    } as any
                  );
                } else {
                  cache.writeFragment(
                    gql`
                      fragment ___ on Product {
                        downPoints
                        voteStatus
                      }
                    `,
                    {
                      id: productId,
                      downPoints: data.downPoints + 1,
                      voteStatus: value,
                    } as any
                  );
                }
              }
            },

            createProduct: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },

            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return { me: result.login.user };
                  }
                }
              );
            },

            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return { me: result.register.user };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
