## (1) Fetch Data Using ID

==> Install React Router And Setup It

    main.jsx
    ------------

    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App.jsx";
    import "./index.css";
    import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"; // 1- Import this
    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    import Component from "./pages/Component.jsx";
    import ComponentDetails from "./pages/ComponentDetails.jsx";

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Component />,
        },
        {
            path: "/:id",
            element: <ComponentDetails />,
        },
    ]);
    // 2- Setup Client
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    // 3- Wrap With ClientProvider
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <RouterProvider router={router}>
                    <App />
                </RouterProvider>{" "}
            </ApolloProvider>
        </React.StrictMode>
    );

==> Create Fetch Data With Id Custom Hook

    useDataDetails.jsx
    --------------------

    import { gql, useQuery } from "@apollo/client";

    const GET_DETAILS = gql`
        query getCharacter($id: ID!) {
            character(id: $id) {
                id
                name
                image
            }
        }
    `;

    const useDataDetails = (id) => {
        const { data, error, loading } = useQuery(GET_DETAILS, {
            variables: {
                id
            },
        });

        return { data, error, loading };
    };

    export default useDataDetails;

==> Create Data With Id Route

    ComponentDetails.jsx
    -----------------------

    import { useParams } from "react-router-dom";
    import useDataDetails from "../hooks/useDataDetails";
    const ComponentDetails = () => {
        const { id } = useParams();

        const { data, error, loading } = useDataDetails(id);

        if (error) {
            return "Something went wrong";
        }

        if (loading) {
            return "Loading...";
        }

        if (data.character) {
            const {
                character: { name, image },
            } = data;

            return (
                <div>
                    <img src={image} />
                    <h5>{name}</h5>
                </div>
            );
        }
    };

    export default ComponentDetails;
