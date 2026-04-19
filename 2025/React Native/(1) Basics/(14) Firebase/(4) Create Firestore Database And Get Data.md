(1) Create Firestore Database For Creating Products Table
-----------------------------------------------------------
==> In Firebase Console go to 'Firestore Database' Then Click On 'Create Database'
==> Then Select 'Standard Editions' Then Select The Location Then Select 'Start in production mode' And Click 'Create' Button
==> Then Click 'Start Collection' And Enter 'Collection ID' [EX: products] 
==> Then Enter All Required Fields And Data Then Click 'Save' To Create The Collection And Document
==> Then You Can Add More Products By "Add Document"


(2) Handle Get Data From Firestore
-------------------------------------
==> First Step: from 'firestoreConfig' Export 'db'

    firestoreConfig.ts
    ----------------------

    import { initializeApp } from 'firebase/app';
    import { getAuth } from "firebase/auth";
    import { getFirestore } from 'firebase/firestore'; // 1- Import getFireStore

    const firebaseConfig = {
        apiKey: 'AIzaSyBoHt6SI2qoygzttiFoKwMX_aFTzCR20Cs',
        authDomain: 'rn-project-f2751.firebaseapp.com',
        projectId: 'rn-project-f2751',
        storageBucket: 'rn-project-f2751.firebasestorage.app',
        messagingSenderId: '567555539279',
        appId: '1:567555539279:web:24a7197ea4d07189aec53a',
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    // 2- Export db Instance To Use In Redux Slice
    export const db = getFirestore(app);

    export { auth }


==> Create 'products' Slice 


    store/slices/productsSlice.ts
    ----------------------------------


    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
    import { Product } from "../../types/product"
    import { collection, getDocs } from "firebase/firestore"
    import { db } from "../../config/firebaseConfig"

    interface ProductsDataTypes {
        data: Array<Product>,
        error: any,
        isLoading: Boolean,
    }


    const initialState: ProductsDataTypes = {
        data: [],
        error: null,
        isLoading: false
    }


    export const fetchProducts = createAsyncThunk('products/fetchData', async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'))

            const products = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            return products
        } catch (error: any) {
            rejectWithValue(error)
        }

    })


    const productSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {
            clearProducts: (state) => {
                state.data = []
            }
        },
        extraReducers: (builder) => {
            builder.addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchProducts.fulfilled, (state, action: any) => {
                state.data = action.payload
                state.isLoading = false
                state.error = null
            }).addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as string
                state.isLoading = false
            })
        }
    })


    export default productSlice.reducer

==> Import productSlice In The Store


    store/store.ts
    ------------------

    import AsyncStorage from "@react-native-async-storage/async-storage";
    import { combineReducers, configureStore } from "@reduxjs/toolkit";
    import cartReducer from "./slices/cartSlice";
    import authReducer from "./slices/AuthSlice";
    import productsSlice from './slices/productsSlice' // 1- Import

    import {
        persistStore,
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
    } from "redux-persist";

    const persistConfig = {
        key: "root",
        storage: AsyncStorage,
        whitelist: ["auth"],
    };

    const rootReducer = combineReducers({
        cart: cartReducer,
        auth: authReducer,
        products: productsSlice // 2- Set Here
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    });

    export const persistor = persistStore(store);
    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;




==> Then Call The fetchProducts In It's Own Page And Access The 'products' And Pass To Flatlist



(3) If Request Not Fired Must Go To 'firebase console' Then Enter To 'firestore database' Then Enter To Rules 
    And Can Remove Line Of 'rules_version = '2';' To Enable Read And Write But It's Not Safe
    Or Enable Access Products Like This Code


    rules_version = '2';

    service cloud.firestore {
        match/databases/{database}/documents {

            // Products collection: public read
            match/products/{productId} {
                allow read: if true;
                allow write: if request.auth != null;
            }

            // All other collections: require authentication
            match/{document=**} {
                allow read, write: if request.auth != null;
            }
        }
    }
