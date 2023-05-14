// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7bWS2kWe5XACI9v_Kkt5kJjnt4f5xkO4",
    authDomain: "blabber-71b2c.firebaseapp.com",
    projectId: "blabber-71b2c",
    storageBucket: "blabber-71b2c.appspot.com",
    messagingSenderId: "924299624839",
    appId: "1:924299624839:web:e68d831332d2158b859322",
    measurementId: "G-Z6J7HM7XMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app }