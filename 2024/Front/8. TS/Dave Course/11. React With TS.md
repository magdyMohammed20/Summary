(1) Create React Project (npm create vite@latest) And Select 'React' Framework And 'Typescript' Then Run (npm i) And Start Server (npm run dev)

(2) Create Component With Types

    import { ReactElement } from "react"

    type HeadingTitle = { title: string } // Create Props Type

    // Use Props Type And Add 'ReactElement' Type For React Component
    const Heading = ({title} : HeadingTitle):ReactElement => {
        return (
            <div>
                {title}
            </div>
        )
    }

    export default Heading

(2) ReactNode Type (Uses With React Children)

    import { ReactNode } from "react"

    type sectionProps = {
        children?: ReactNode,
        title: string
    }
    const Section = ({children , title} : sectionProps):ReactElement => {
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    {children}
                </div>
            </div>
        )
    }

    export default Section


(3) useState Type

    import {ReactElement , useState} from 'react'

    const Counter = (): ReactElement => {
    const [counter , setCounter] = useState<number>(1)
        return (
            <div>
            {counter}
            <button onClick={() => setCounter(prev => prev + 1)}>Add</button>
            </div>
        )
    }

    export default Counter


(4) Setter As Props

    App.tsx
    -------------

    import './App.css'
    import Counter from './components/Counter'
    import { useState } from 'react'
    function App() {
    const [counter, setCounter] = useState<number>(0)
    
        return (
            <>
                <Counter counter={counter} setCounter={setCounter } />
            </>
        )
    }

    export default App


    counter.tsx
    ----------------

    import React, {ReactElement } from 'react'

    type counterProps = {
        setCounter : React.Dispatch<React.SetStateAction<number>> // This Is Setter Type
        counter: number
    }
    const Counter = ({ setCounter , counter } : counterProps): ReactElement => {
        return (
            <div>
                {counter}
                <button onClick={() => setCounter(prev => prev + 1)}>Add</button>
                <button onClick={() => setCounter(prev => prev - 1)}>Sub</button>
            </div>
        )
    }

    export default Counter