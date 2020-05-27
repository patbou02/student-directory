import firebase from "firebase";

// Web Application's Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjM-nUhVqhUHnvK1cYvMa9DJTQq6Vcp3E",
  authDomain: "student-directory-5c052.firebaseapp.com",
  databaseURL: "https://student-directory-5c052.firebaseio.com",
  projectId: "student-directory-5c052",
  storageBucket: "student-directory-5c052.appspot.com",
  messagingSenderId: "497091744361",
  appId: "1:497091744361:web:4688e5a31bc7e1b641c8f8"
};

// Initialize Firebase
const firebaseInstance = firebase.initializeApp(firebaseConfig).database();

export default firebaseInstance;