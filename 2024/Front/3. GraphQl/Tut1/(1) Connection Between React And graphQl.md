## (1) Connection Between React And graphQl

==> in react project install (@apollo/client) [npm i @apollo/client] For Connect Between React and graphQl
==> in react project install (graphql) [npm i graphql]

## (2) In [index.js] Setup Connection

    index.js
    -------------

    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App.jsx";
    import "./index.css";
    import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"; // 1- Import this

    // 2- Setup Client
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    // 3- Wrap With ClientProvider
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </React.StrictMode>
    );
