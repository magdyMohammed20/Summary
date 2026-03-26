(1) SignOut From Firebase
------------------------------

    import { auth } from '../../config/firebaseConfig'
    import { signOut } from 'firebase/auth'


    // Used On Logout Button
    const handleLogout = async () => {
        dispatch(logout()) // For Reset User Data In Global Store
        signOut(auth)   // For Logout From Firebase
        await persistor.purge(); // For Reset And Remove Data From Presistor Of Redux Presist
    }
