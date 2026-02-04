(1) Handle Async Action In Redux Toolkit
------------------------------------------

    /src/store/slices/cartSlice.ts
    --------------------------------

    import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
    import axios from "axios";

    interface stateType { cart: Array<{}>, books: Array<{}>, isLoading: boolean, error: any }

    // 1- Add Required State
    const initialState: stateType = {
        cart: [],
        books: [],
        isLoading: false,
        error: null
    }

    // 2- Create Fetch Cart Async Request
    export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
        const response = await axios('https://dummyjson.com/carts')
        console.log(JSON.stringify(response, null, 3))
        return response.data
    })

    // 3- Create Fetch Books Async Request
    export const fetchBooks = createAsyncThunk('book/fetchBooks', async () => {
        const response = await axios('https://697a768b0e6ff62c3c59782e.mockapi.io/api/v1/books')
        console.log(JSON.stringify(response, null, 3))
        return response.data
    })


    export const cartSlice = createSlice({
        name: 'counterSlice',
        initialState,
        reducers: {
            add: (state, action: PayloadAction<object>) => {
                state.cart.push(action.payload)
            }
        },

        // 4- Add The Extra Reducers with builders
        extraReducers: (builder) => {

            // Cart Builder
            builder.addCase(fetchCart.pending, (state) => {
                state.isLoading = true
            }),
                builder.addCase(fetchCart.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.cart = action.payload
                }),
                builder.addCase(fetchCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message
                })

                ,

                // Books Builder
                builder.addCase(fetchBooks.pending, (state) => {
                    state.isLoading = true
                }).addCase(fetchBooks.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.books = action.payload
                }).addCase(fetchBooks.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message
                })


        }
    })


    export const { add } = cartSlice.actions
    export default cartSlice.reducer


    src/screens/HomeScreen.tsx
    -----------------------------

    import { ScrollView, StyleSheet, Text, View } from 'react-native'
    import React from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { AppDispatch, RootState } from '../store/store'
    import { Button } from '@react-navigation/elements'
    import { fetchBooks, fetchCart } from '../store/slices/cartSlice'
    //import { increment, decrement, incrementByNumber } from '../store/slices/counterSlice'
    const HomeScreen = () => {

        //const counter = useSelector((state: RootState) => state.counter.value)
        const dispatch = useDispatch<AppDispatch>()

        const cart = useSelector((state: RootState) => state.cart.cart);
        const books = useSelector((state: RootState) => state.cart.books);
        const isLoading = useSelector((state: RootState) => state.cart.isLoading);
        const error = useSelector((state: RootState) => state.cart.error);

        const handleFetch = () => {
            dispatch(fetchCart())
        }

        const handleFetchBooks = () => {
            dispatch(fetchBooks())
        }
        return (
            <ScrollView>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 200 }}>
                    <Button onPressIn={handleFetch}>Get Cart</Button>
                    <Button onPressIn={handleFetchBooks}>Get Books</Button>
                </View>

                <Text>{JSON.stringify(cart)}</Text>
                <Text>{JSON.stringify(books)}</Text>
                
            </ScrollView>
        )
    }

    export default HomeScreen