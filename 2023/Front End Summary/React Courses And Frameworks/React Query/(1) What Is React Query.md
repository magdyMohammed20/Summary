(1) What Is React Query
--------------------------
==>  data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze

(2) Why React Query
---------------------
==> Since React Is UI Lib So There Is No Pattern For Data Fetching
==> To Not Use UseEffect And React State In Data Fetching Process

(3) Installation
-----------------
==> Create React App Normally [npx create-react-app react-query-demo]
==> Install React Query [npm i react-query]
==> Install Json Server For Make Simple API [yarn add json-server]
==> Create "db.json" File And Add This Command In Package.json ["json-serve" : "json-server --watch db.json --port 4000"] Then Run [yarn json-serve] At Cmd

    db.json
    --------

    {
        "superHeros": [
            {
                "id": "1",
                "name": "Patman"
            },
            {
                "id": "1",
                "name": "SuperMan"
            }
        ]
    }



