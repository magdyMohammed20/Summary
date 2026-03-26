(1) Install Async AsyncStorage
--------------------------------
==> npm install @react-native-async-storage/async-storage

(2) Usage (In sometimes Can Be Async)
----------------------------------------

    import AsyncStorage from '@react-native-async-storage/async-storage';

    // Set
    AsyncStorage.setItem('my_key' , value) 

    // Get
    AsyncStorage.getItem('my_key')

    // Clear
    AsyncStorage.clear()
