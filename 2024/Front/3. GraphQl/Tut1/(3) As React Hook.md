## (1) As React Hook

    hooks/useData.jsx
    --------------------

    import { useQuery, gql } from "@apollo/client";

    const GET_DATA = gql`
        query {
            locations {
                results {
                    id
                    dimension
                }
            }
        }
    `;

    export const useData = () => {
        const { data, loading, error } = useQuery(GET_DATA);

        return { data, loading, error };
    };


    components/Component.jsx
    ----------------------------

    import { useData } from "../hooks/useData"; // 1- Import The Hook

    const Component = () => {
    // 2- Use The Hook And Own Data
    const obj = useData();
    const { error, data, loading } = obj;

    if (error) {
        return <>error!!</>;
    }

    if (loading) {
        return <>Loading...</>;
    }

    if (data) {
        const {
            locations: { results },
        } = data;
        return (
            <div>
                {
                    results.map((item) => (
                        <div key={item.id}>{item.dimension}</div>
                    ))
                }
            </div>
        );
    }
    };

    export default Component;
