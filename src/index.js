import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { GET_FORM } from "./graphql/queries";
import typeDefs from "./graphql/typeDefs";

const apolloClient = new ApolloClient({
  typeDefs,
  link: createHttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache({ addTypename: true }),
  name: "example-web-client",
  resolvers: {
    Mutation: {
      setForm: (_, { userName, email }, { cache }) => {
        const data = cache.readQuery({ query: GET_FORM }) || [];

        if (!userName || !email) {
          return null;
        }

        cache.writeQuery({
          query: GET_FORM,
          data: {
            userName,
            email,
          },
        });

        return null;
      },
    },
  },
});

apolloClient.writeQuery({
  query: gql`
    query GetInitialState {
      userName
      email
    }
  `,
  data: {
    userName: "jupiter5",
    email: "",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
