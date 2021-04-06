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

const offsetLimitPagination = {
  "keyArgs": [
    "conditions",
    ["name"]
  ],

  merge (existing = [], incoming = []) {

    return [
      ...existing,
      ...incoming
    ];

  }
};

const cache = new InMemoryCache({
  "typePolicies": {
    "Query": {
      "fields": {
        "albums": offsetLimitPagination,
        "artists": offsetLimitPagination
      }
    }
  }
});

export default new ApolloClient({
  cache,
  link
});
