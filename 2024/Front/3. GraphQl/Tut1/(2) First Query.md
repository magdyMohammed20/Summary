## (1) First Query

    import { useQuery, gql } from "@apollo/client"; // 1- Import This

    // 2- Build Your Query
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

    const Component = () => {
        // Get Attributes
        const { error, data, loading } = useQuery(GET_DATA);

        // Handle Error And Loading And Display Data
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
