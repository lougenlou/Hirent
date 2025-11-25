// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMoRBSX8rMcss_DMGulrW8E0lnKRBnjNc",
  authDomain: "hirent-c2c65.firebaseapp.com",
  projectId: "hirent-c2c65",
  storageBucket: "hirent-c2c65.firebasestorage.app",
  messagingSenderId: "973495366874",
  appId: "1:973495366874:web:2a4052d990f021e189e1e3",
  measurementId: "G-ZDJSFG16NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
