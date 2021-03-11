import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from "@apollo/client/core";

const httpLink = new HttpLink({
  "credentials": "include",
  "uri": import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URI
});

const headersLink = new ApolloLink((operation, forward) => forward(operation));

const link = ApolloLink.from([
  headersLink,
  httpLink
]);

export default new ApolloClient({
  "cache": new InMemoryCache(),
  link
});
