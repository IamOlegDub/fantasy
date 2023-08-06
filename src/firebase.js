// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyAbCe1Sl1rZvPJH5DeJNquQzuMkU8HatOs',
    authDomain: 'fantasy-project-90a01.firebaseapp.com',
    databaseURL:
        'https://fantasy-project-90a01-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'fantasy-project-90a01',
    storageBucket: 'fantasy-project-90a01.appspot.com',
    messagingSenderId: '838607645899',
    appId: '1:838607645899:web:3a90dd52dad7f20ae77f4e',
    measurementId: 'G-6BP2JZLF23',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
