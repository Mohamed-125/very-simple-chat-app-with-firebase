import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbVGF0av9kRoZxGSNdxlnG-vrgt-3amPw",
  authDomain: "chat-app-f9601.firebaseapp.com",
  projectId: "chat-app-f9601",
  storageBucket: "chat-app-f9601.appspot.com",
  messagingSenderId: "888370962940",
  appId: "1:888370962940:web:23274a0f67c8ae97555279",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
