import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyD48TSHPlzBRm5tDLAPIqRu7BP8j4YYZ5w",
  authDomain: "pui-hw6-cae35.firebaseapp.com",
  projectId: "pui-hw6-cae35",
  storageBucket: "pui-hw6-cae35.appspot.com",
  messagingSenderId: "944398229479",
  appId: "1:944398229479:web:1815b7cbfaa59751c82742",
  measurementId: "G-1ENFQKJ6K1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

root.render(
  <GoogleOAuthProvider clientId="641453912860-jc7kvkudjuq00oin52vb9hhl70oah730.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default db;
