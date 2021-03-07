import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = new HttpLink({
  credentials: "include",
  uri: "http://localhost:3000/graphql",
});

const headersLink = new ApolloLink((operation, forward) => forward(operation));

const link = ApolloLink.from([headersLink, httpLink]);

export default new ApolloClient({ cache: new InMemoryCache(), link });
