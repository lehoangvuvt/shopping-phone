import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCE-S1TBZ1Im0ml9FRQlYxfpN_8m0y-91U",
    authDomain: "upload-picture-898ad.firebaseapp.com",
    databaseURL: "https://upload-picture-898ad.firebaseio.com",
    projectId: "upload-picture-898ad",
    storageBucket: "upload-picture-898ad.appspot.com",
    messagingSenderId: "343730985770",
    appId: "1:343730985770:web:9bfcbd2d1c2cdb9e761c53",
    measurementId: "G-W2SNX613BZ"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };