## (1) useLazyQuery()

==> We Use It As useQuery() Executed At Begining Of Computer Rendering And We Want To Make Request If User Click a button

    Search.jsx
    -------------

    import { useState } from "react";
    import { gql, useLazyQuery } from "@apollo/client";
    import { Link } from "react-router-dom";

    // 1- Create The Filter Query
    const GET_FILTER_CHARS = gql`
        query getFilter($name: String!) {
            characters(filter: { name: $name }) {
                results {
                    id
                    name
                    image
                    episode {
                        name
                    }
                }
            }
        }
    `;
    const Search = () => {
    const [name, setName] = useState(""); // 2- Variable For Search Input

    // 3- Extract useLazyQuery() Get Function And Variables
    const [getCharacters, { data, loading, error, called }] = useLazyQuery(
        GET_FILTER_CHARS,
        {
            variables: {
                name,
            },
        }
    );

    // 4- For Input Change
    const onChange = (val) => {
        setName(val);
    };

    return (
        <div style={{ margin: "20px 0" }}>
            <div>
                <input
                    type="text"
                    name="search"
                    value={name}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button onClick={() => getCharacters()}>Search</button>
            </div>

        {error && <div>Error!!</div>}
        {loading && <div>Loading...</div>}
        {data && called && (
            <div style={{ margin: "20px 0" }}>
                {called && <> Results : {data.characters.results?.length}</>}
                <div className="grid-container2">
                    {data.characters.results.map((item) => (
                        <div key={item.id}>
                            <Link key={item.id} to={`/${item.id}`}>
                                <img src={item.image} />
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </div>
    );
    };

    export default Search;
