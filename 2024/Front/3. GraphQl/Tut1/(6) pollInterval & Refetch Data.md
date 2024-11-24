## (1) pollInterval & Refetch Data

==> pollInterval : Used To Refetch Data After Each Specific Time
==> refetch() : Used To Refetch Data Again

    useData.jsx
    --------------

    import { useQuery, gql } from "@apollo/client";
    import { useDataContext } from "../context/appContext";
    const GET_DATA = gql`
    query {
        characters {
        info {
            count
        }
        results {
            id
            name
            image
        }
        }
    }
    `;

    export const useData = () => {
    // Refetch And pollInterval Here
    const { data, loading, error, refetch } = useQuery(GET_DATA, {
        pollInterval: 5000,
    });

    const { setCharacters } = useDataContext();
    if (data) {
        setCharacters(data?.characters);
    }
    return { data, loading, error, refetch };
    };


    Component.jsx
    --------------

    import { Link } from "react-router-dom";
    import { useData } from "../hooks/useData"; // 1- Import The Hook

    const Component = () => {
    // 2- Use The Hook And Own Data
    const obj = useData();
    const { error, data, loading, refetch } = obj;

    if (error) {
        return <>error!!</>;
    }

    if (loading) {
        return <>Loading...</>;
    }

    if (data) {
        const {
        characters: { results },
        } = data;
        return (
        <div className="grid-container">
            <button onClick={() => refetch()}>Refresh</button>
            {results.map((item) => (
            <div key={item.id}>
                <Link key={item.id} to={`/${item.id}`}>
                <img src={item.image} />
                <h5>{item.name}</h5>
                </Link>
            </div>
            ))}
        </div>
        );
    }
    };

    export default Component;
