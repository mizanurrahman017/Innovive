// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN8W2tdVL12TgN8tHvVrPrhFs8FzBnd74",
  authDomain: "innovive-76a01.firebaseapp.com",
  projectId: "innovive-76a01",
  storageBucket: "innovive-76a01.appspot.com",
  messagingSenderId: "373504096796",
  appId: "1:373504096796:web:8615b195773ba2e0bdbdd9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);