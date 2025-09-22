import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2bnFfkLX2VpZ1FXOFG-5M51HL9fEoaOc",
  authDomain: "jn-goals.firebaseapp.com",
  projectId: "jn-goals",
  storageBucket: "jn-goals.firebasestorage.app",
  messagingSenderId: "987462477452",
  appId: "1:987462477452:web:bd47835f829de9820d3da9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);