(1) First step is to install redux
------------------------------------
==> npm install @reduxjs/toolkit react-redux

(2) second step is to Create a Redux Store
-------------------------------------------

    src/store/store.js
    --------------------

    import { configureStore } from "@reduxjs/toolkit";

    export const store = configureStore({
        reducer: {}
    })

    // types
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch


(3) third step is to provide Redux Store to react
--------------------------------------------------

    App.tsx
    --------

    import { StatusBar } from 'expo-status-bar';
    import { View } from 'react-native';
    import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
    import BottomTabs from './src/navigation/BottomTabs';
    import { Provider } from 'react-redux'; // 1- provider
    import { store } from './src/store/store'; // 2- store


    export default function App() {

        // 3- wrap app with provider and pass store
        return (
            <Provider store= { store } >
                <View style={ styles.container }>
                    <NavigationContainer theme={
                            {
                                ...DefaultTheme,
                                colors: {
                                    ...DefaultTheme.colors,
                                    background: '#ffffff',
                                },
                            }
                    }>
                    <BottomTabs />
                    </NavigationContainer>
                    <StatusBar style = "auto" />
                </View>
            </Provider>
        );
    }


(4) create the slices
-----------------------

    src/store/slices/counterSlice.ts
    ----------------------------------

    import { createSlice } from "@reduxjs/toolkit";

    interface stateType { value: number }

    const initialState: stateType = {
        value: 0
    }

    export const counterSlice = createSlice({
        name: 'counterSlice',
        initialState,
        reducers: {
            increment: (state) => {
                state.value += 1
            },
            decrement: (state) => {
                state.value -= 1
            }
        }
    })


    export const { increment, decrement } = counterSlice.actions
    export default counterSlice.reducer



(5) Add slice reducer to the store
------------------------------------

    /src/store.ts
    --------------

    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from './slices/counterSlice'


    export const store = configureStore({
        reducer: {
            counter: counterReducer
        }
    })

    // types
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch


(6) last step is to use the state and actions
----------------------------------------------


    src/screens/HomeScreen.tsx
    -----------------------------

    import {  Text, View } from 'react-native'
    import { useDispatch, useSelector } from 'react-redux'
    import { RootState } from '../store/store'
    import { Button } from '@react-navigation/elements'
    import { increment, decrement } from '../store/slices/counterSlice'
    const HomeScreen = () => {

        const counter = useSelector((state: RootState) => state.counter.value)
        const dispatch = useDispatch<AppDispatch>()

        return (
            <View style= { styles.container } >
                <Text style={ { fontSize: 20 } }> Counter : { counter } </Text>

                <View style = {{ flexDirection: "row", gap: 15, marginTop: 20 }}>

                    <Button onPressIn={ () => dispatch(increment()) }> Add </Button>
                    <Button onPressIn = {() => dispatch(decrement())}> sub </Button>
                </View>
            </View>
        )
    }

    export default HomeScreen

(7) combineReducers
--------------------

    store.ts
    ---------

    import { combineReducers, configureStore } from "@reduxjs/toolkit";
    import counterReducer from './slices/counterSlice'


    const allReducers = combineReducers({
        counter: counterReducer
    })

    export const store = configureStore({
        reducer: allReducers

    })

    // types
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch