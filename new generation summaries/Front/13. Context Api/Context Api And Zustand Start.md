(1) Without Context Api See The Props Drill
----------------------------------------------

    import { useReducer, useState } from 'react';

    const Button = ({setCounter}) => {
        return <button onClick={() => setCounter(v => v + 1)}>Add One</button>
    }

    const DisplayCounter = ({ counter }) => {
        return <div>Counter: {counter}</div>
    }
    export default function Home() {
    const [counter , setCounter] = useState(0)  
        return (
            <div>
                <Button setCounter={setCounter} />
                <DisplayCounter counter={counter}/>
            </div>

        )
    }


(2) Use Context Api
----------------------

    import { createContext, useContext, useState } from 'react';

    // 1- Create CounterContext
    const CounterContext = createContext(null)

    // 2- Create CounterContextProvider
    const CounterContextProvider = ({children}) => {
        return <CounterContext.Provider value={useState(0)}>
            {children}
        </CounterContext.Provider>
    }

    // 3- Use The CounterContext Within useContext
    const Button = () => {
        const [, setCounter] = useContext(CounterContext)
        return <button onClick={() => setCounter(v => v + 1)}>Add One</button>
    }

    // 4- Use The CounterContext Within useContext
    const DisplayCounter = () => {
        const [counter] = useContext(CounterContext)
        return <div>Counter: {counter}</div>
    }

    // 5- Wrap The Parent With CounterContextProvider
    export default function Home() {
    
    return (
        <CounterContextProvider>
            <Button  />
            <DisplayCounter />
        </CounterContextProvider>
    )
    }


(3) Context Api With useReducer
---------------------------------

    import { createContext, useContext, useReducer } from 'react';

    // 1- Create CounterContext
    const CounterContext = createContext(null)

    // 2- Create Reducer Function
    const reducer = (state, action) => {
        switch (action.type) {
            case 'add': 
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    }
    // 3- Create CounterContextProvider With useReducer
    const CounterContextProvider = ({children}) => {
        return <CounterContext.Provider value={useReducer(reducer , 0)}>
            {children}
        </CounterContext.Provider>
    }

    // 4- Dispatch Add Action Here 
    const ButtonAdd = () => {
        const [, dispatch] = useContext(CounterContext)
        return <button onClick={() => dispatch({type: 'add'} , 0)}>Add One</button>
    }

    // 4- Dispatch Sub Action Here 
    const ButtonSub = () => {
        const [, dispatch] = useContext(CounterContext)
        return <button onClick={() => dispatch({type: 'sub'} , 0)}>Sub One</button>
    }


    // 5- Use The CounterContext Within useContext
    const DisplayCounter = () => {
        const [counter] = useContext(CounterContext)
        return <div>Counter: {counter}</div>
    }

    // 6- Wrap The Parent With CounterContextProvider
    export default function Home() {
    
        return (
            <CounterContextProvider>
                <div>
                    <ButtonAdd />
                </div>
                <div>
                    <ButtonSub  />
                </div>
                <div>
                    <DisplayCounter />
                </div>
            </CounterContextProvider>
        )
    }


(4) Zustand State Management
---------------------------------

    utils/store.js
    ------------------
        

    import { create } from 'zustand'

    const useStore = create(set => ({
        user: '',
        isLogged: false,
        login: () => set(state => ({isLogged: true, user: 'Magdy'})),
        logout: () => set(state => ({isLogged: false,user: '' })),
        counter: 0
    }))

    export default useStore
    

    ecommerce/page.jsx
    --------------------
        
    import useStore from "@/utils/store"

    const Auth = () => {
        const {login , logout , isLogged} = useStore(state => state)
    
        return(
            <div>
                {!isLogged &&  <button onClick={login}>Login</button>}
                {isLogged && <button onClick={logout}>LogOut</button>}
            </div>
        )
    }

    const CartCounter = () => {
        const counter = useStore(state => state.counter)
        return <div>Counter : {counter}</div>
    }

    const User = () => {
        const user = useStore(state => state.user)
        return <div>User : {user}</div>
    }


    const Ecommerce = () => {
        const isLogged = useStore(state => state.isLogged)
    return (
        <div>
            <Auth />
            {
                !!isLogged && (<div>
                        <User/>
                        <CartCounter/>
                </div>)
            }
        </div>
    )
    }

    export default Ecommerce


(5) Optimize Zustand Store By Export Actions
------------------------------------------------

    utils/store.js
    ------------------
        
    import { create } from 'zustand'

    const useStore = create(set => ({
        user: '',
        isLogged: false,
        login: () => set(state => ({isLogged: true, user: 'Magdy'})),
        logout: () => set(state => ({isLogged: false,user: '' })),
        counter: 0
    }))
    
    /////////////////// Here ////////////////////////////
    export const useLogin = () => useStore(state => state.login)
    export const useLogOut = () => useStore(state => state.logout)
    export const useUser = () => useStore(state => state.user)
    export const useIsLogged = () => useStore(state => state.isLogged)
    export const useCounter = () => useStore(state => state.counter)
    
    export default useStore     
        
        
    ecommerce/page.jsx
    --------------------
        
    import { useLogOut , useLogin , useIsLogged , useCounter , useUser } from "@/utils/store";
    const Auth = () => {
        const isLogged = useIsLogged()
        
        ////////////////// Here ////////////////////
        const login = useLogin();
        const logout = useLogOut()
        return(
            <div>
                {!isLogged &&  <button onClick={login}>Login</button>}
                {isLogged && <button onClick={logout}>LogOut</button>}
            </div>
        )
    }
    
    const CartCounter = () => {
        const counter = useCounter()
        return <div>Counter : {counter}</div>
    }
    
    const User = () => {
        const user = useUser()
        return <div>User : {user}</div>
    }
    
    
    const Ecommerce = () => {
        const isLogged = useIsLogged()
      return (
        <div>
              <Auth />
              {
                  !!isLogged && (<div>
                        <User/>
                        <CartCounter/>
                  </div>)
              }
        </div>
      )
    }
    
    export default Ecommerce