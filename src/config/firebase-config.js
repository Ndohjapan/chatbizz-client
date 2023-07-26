// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5sJBQmFAY2NIYf2i7_PJ1svsUntnUBes",
  authDomain: "chatbizz-aisupport.firebaseapp.com",
  projectId: "chatbizz-aisupport",
  storageBucket: "chatbizz-aisupport.appspot.com",
  messagingSenderId: "124172059542",
  appId: "1:124172059542:web:a0aa600f79413e6ce253b7",
  measurementId: "G-3N0BC94MSY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;