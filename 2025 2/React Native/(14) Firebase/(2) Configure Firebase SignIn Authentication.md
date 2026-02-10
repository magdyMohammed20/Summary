(1) Configure Authentication Using Firebase
----------------------------------------------
==> In Firebase Console In Side Nav Select Authentication
==> Then Select 'Email/Password' Then Enable Only 'Email/Password' And Click 'Save'
==> Then 'Email/Password' Considered As Provider And Will Appears On Front Of You
==> Then Click On 'Users' Tab Above To Add New User Manually Then Enter Email And Password Of User


(2) Configure The Auth In The Config File
--------------------------------------------

    src/config/firebaseConfig.ts
    -------------------------------

    import { initializeApp } from 'firebase/app';
    import { getAuth } from "firebase/auth"; // 1- Import getAuth

    const firebaseConfig = {
        apiKey: 'AIzaSyBoHt6SI2qoygzttiFoKwMX_aFTzCR20Cs',
        authDomain: 'rn-project-f2751.firebaseapp.com',
        projectId: 'rn-project-f2751',
        storageBucket: 'rn-project-f2751.firebasestorage.app',
        messagingSenderId: '567555539279',
        appId: '1:567555539279:web:24a7197ea4d07189aec53a',
    };

    const app = initializeApp(firebaseConfig);

    // 2- Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    // 3- Export auth
    export { auth } 


(3) Handle Sign In Process For Redux Toolkit (For Test The Login Use The User That We Add Manually)
-------------------------------------------------

    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from '../../config/firebaseConfig' // 1- Import The Exported Auth From 'firebaseConfig.ts'

    interface stateType { email: string, password: string, isLoading: boolean, error: any, token: string }

    interface SignInUserType { email: string, password: string }


    const initialState: stateType = {
        email: '',
        password: '',
        isLoading: true,
        error: null,
        token: ''
    }

    export const signIn = createAsyncThunk(
        "auth/signIn",
        async (data: SignInUserType, { rejectWithValue }) => {
            try {

                // 2- Handle Sign In Here And Return The User Data
                const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
                const token = await userCredential.user.getIdToken()

                return {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    token,
                };

            } catch (error: any) {

                // 3- Handle Errors
                let errorMsg;

                switch (error.code) {
                    case 'auth/invalid-credential':
                        errorMsg = 'Invalid Credentials'
                        break;
                    case 'auth/invalid-email':
                        errorMsg = 'Invalid Email'
                        break;
                    case 'auth/invalid-password':
                        errorMsg = 'Invalid Password'
                        break;
                }
                return rejectWithValue(errorMsg);
            }
        }
    );

 
    export const authSlice = createSlice({
        name: 'AuthSlice',
        initialState,
        reducers: {

            logout: (state) => {
                state.email = ''
                state.token = ''
                state.isLoading = false
            },
            clearError: (state) => {
                state.error = null;
            }
        }, extraReducers: (builder) => {

            // 4- Handle Extra Reducer For SignIn Process And Set Token If Fulfilled
            builder
                .addCase(signIn.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(signIn.fulfilled, (state, action) => {
                    console.log('------ action --------')
                    console.log(action)
                    state.token = action.payload.token;
                    state.isLoading = false;
                })
                .addCase(signIn.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload as string;
                });
        },


    })


    export const { logout, clearError } = authSlice.actions
    export default authSlice.reducer


(4) For Show The Error Message We Can Handle In The useEffect Inside Any Page
---------------------------------------------------------------------------------

    useEffect(() => {
        if (error) {
            Alert.alert("Login Failed", error, [
                {
                    text: "OK",
                    onPress: () => dispatch(clearError()),
                },
            ]);
        }
    }, [dispatch, error]);