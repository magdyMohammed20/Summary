(1) Handle Sign Up Process For Redux Toolkit
-------------------------------------------------

    store/authSlice.tsx
    -----------------------

    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from '../../config/firebaseConfig' // 1- Import The Exported Auth From 'firebaseConfig.ts'

    interface stateType { email: string, password: string, isLoading: boolean, error: any, token: string }


    interface SignUpUserType { userName: string, email: string, password: string }

    const initialState: stateType = {
        email: '',
        password: '',
        isLoading: false,
        error: null,
        token: ''
    }

    export const signUp = createAsyncThunk(
        "auth/signUp",
        async (data: SignUpUserType, { rejectWithValue }) => {
            try {

                await createUserWithEmailAndPassword(auth, data.email, data.password)
            
                
            } catch (error: any) {
                let errorMsg;
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMsg = 'User Already Exist'
                        break;
                    default:
                        errorMsg = error.code
                        break

                }
                return rejectWithValue(errorMsg);
            }
        }
    );

    export const authSlice = createSlice({
        name: 'AuthSlice',
        initialState,
        reducers: {
            clearError: (state) => {
                state.error = null;
            }
        }, extraReducers: (builder) => {
            builder
                .addCase(signUp.pending, (state) => {
                    console.log('22222222')
                    state.isLoading = true;
                    state.error = null;
                    console.log('1111111')
                })
                .addCase(signUp.fulfilled, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(signUp.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload as string;
                });


        },


    })


    export const { logout, clearError } = authSlice.actions
    export default authSlice.reducer



(2) Handle Sign Up In It's Component And Handle Redirect To Login After Sign Up
---------------------------------------------------------------------------------


    type SignUpFormValues = {
        userName: string;
        email: string;
        password: string;
    };

    const SignUpScreen = () => {

        const navigation = useNavigation<any>()
        const dispatch = useDispatch<AppDispatch>();
        
        const {
            control,
            handleSubmit,
            formState: { errors, isValid },
        } = useForm<SignUpFormValues>({
            resolver: yupResolver(signUpSchema),
            defaultValues: {
                userName: "",
                email: "",
                password: "",
            },
            mode: "onChange",
        });

        // Handle Call SignUp From Slice And Redirect
        const onSubmit = async (data: SignUpFormValues) => {

            const resultAction = await dispatch(signUp({ userName: data.userName, email: data.email, password: data.password }));
                if (signUp.fulfilled.match(resultAction)) {
                    // ✅ Signup succeeded
                    navigation.navigate('SignIn');
                }
        };


        


(3) If Note Any Loading Issue Must Reset The Presisting After logout
-------------------------------------------------------------------------

        store.ts
        -----------

        import AsyncStorage from "@react-native-async-storage/async-storage";
        import { combineReducers, configureStore } from "@reduxjs/toolkit";
        import cartReducer from "./slices/cartSlice";
        import authReducer from "./slices/AuthSlice";

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
            storage: AsyncStorage, // ✅ RN storage
            whitelist: ["auth"],   // persist auth only
        };

        const rootReducer = combineReducers({
            cart: cartReducer,
            auth: authReducer,
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

        export const persistor = persistStore(store); // 1- Export The presistor here
        export type RootState = ReturnType<typeof store.getState>;
        export type AppDispatch = typeof store.dispatch;


        ProfileScreen.tsx
        ---------------------

        const handleLogout = async () => {
            dispatch(logout())
            await persistor.purge();
        }