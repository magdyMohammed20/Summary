(1) Install TS Globally (npm i -g typescript)

(2) Compile TS File (tsc main.ts) Or (tsc main.ts -w) For Compile And Watch

(3) For Generate 'tsconfig.json' Run (tsc --init)

(4) Specify Root Directory And Out Directory So You Can Run [tsc -w] As You Specify Root And Out Directories

    -src
        -main.ts
    -build
        -index.html
        -js
            -main.js


    tsconfig.json
    -----------------

        "rootDir" : "./src"
        "outDir" : "./build/js"



(5) Make TS Compiles Specific TS Files In Specific Directory Only Add 'include' In 'tsconfig.json' And Prevent Compile TS Files In Another Directories 

    "include" : ["src"]


(6) in 'tsconfig.json' Disable Generate Js File If There Are Any Errors In TS File By Set ("noEmitOnError": true") In 'tsconfig.json' Or Run (tsc --noEmitOnError -w) When Watching Files