import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "@/utils/tokenRefresh/tokenRefreshLink";
import { getCookie, setCookie } from "cookies-next";

const backendUri = "http://localhost:4000/graphql";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  const cache = new InMemoryCache({});
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const retryLink = new RetryLink({ attempts: { max: 4 } });
  const httpLink = createHttpLink({
    uri: backendUri,
  });

  const isTokenValid = (currentToken: string | null) => {
    if (currentToken) {
      const currentParts = currentToken
        .split(".")
        .map((part) =>
          Buffer.from(
            part.replace(/-/g, "+").replace(/_/g, "/"),
            "base64",
          ).toString(),
        );
      const timeNow = new Date();
      const payload = JSON.parse(currentParts[1]);
      const expireDate = new Date(payload.exp * 1000);
      if (expireDate < timeNow) {
        return false;
      }
      return true;
    }
    return true;
  };

  const authLink = setContext((_, { headers }) => {
    const token = getCookie("accessToken");

    // this first if statement allows to use access tokens from queries
    if (headers?.authorization) {
      return {
        headers: {
          ...headers,
        },
      };
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  });

  const refreshLink = new TokenRefreshLink({
    isTokenValidOrUndefined: () => {
      const accessToken = getCookie("accessToken") as string;
      return isTokenValid(accessToken) || typeof accessToken !== "string";
    },
    fetchAccessToken: () => {
      const refreshToken = getCookie("refreshToken") as string;
      return fetch(backendUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "mutation Refresh($refreshToken: String!) {refresh(refreshToken: $refreshToken) {refreshToken, accessToken}}",
          variables: { refreshToken: refreshToken },
        }),
      });
    },
    handleFetch: ({ accessToken, refreshToken }) => {
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
    },
    accessTokenField: "refresh",
  });

  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: ApolloLink.from([
        refreshLink,
        authLink,
        errorLink,
        retryLink,
        httpLink,
      ]),
      cache,
    });
  }

  return client;
};
