(1) Steps Of Use Firebase
---------------------------
==> Go To google and enter firebase site then go to console
==> create the project then add new app 'web' Then Will Get Initial Values For 'firebaseConfig.js' And Another Way Can Open The App From Dashboard And Click On Settings Icon To Get The Config File Too
==> Install 'expo firebase' (npx expo install firebase)
==> Go To 'https://docs.expo.dev/guides/using-firebase/' For Get 'firebaseConfig.js' Then Add The Initial Values That Got Before

    src/config/firebaseConfig.ts
    ----------------------------------

    import { initializeApp } from 'firebase/app';

    // Optionally import the services that you want to use
    // import {...} from 'firebase/auth';
    // import {...} from 'firebase/database';
    // import {...} from 'firebase/firestore';
    // import {...} from 'firebase/functions';
    // import {...} from 'firebase/storage';

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: 'AIzaSyBoHt6SI2qoygzttiFoKwMX_aFTzCR20Cs',
        authDomain: 'rn-project-f2751.firebaseapp.com',
        //databaseURL: 'https://project-id.firebaseio.com',
        projectId: 'rn-project-f2751',
        storageBucket: 'rn-project-f2751.firebasestorage.app',
        messagingSenderId: '567555539279',
        appId: '1:567555539279:web:24a7197ea4d07189aec53a',
        //measurementId: 'G-measurement-id',
    };

    const app = initializeApp(firebaseConfig);

