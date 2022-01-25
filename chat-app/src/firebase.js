import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDnG7ZC6pmXWWzPYFyP8ol0Zu_xvRhyIQ",
  authDomain: "react-firebase-chat-app-ebe69.firebaseapp.com",
  databaseURL:
    "https://react-firebase-chat-app-ebe69-default-rtdb.firebaseio.com",
  projectId: "react-firebase-chat-app-ebe69",
  storageBucket: "react-firebase-chat-app-ebe69.appspot.com",
  messagingSenderId: "433156650411",
  appId: "1:433156650411:web:6ac8b07b113c98495aceee",
  measurementId: "G-7PNG11HDPN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
