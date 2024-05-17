// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhvDojb0r5uAFTFQtrpx_hSMDnR4-2UJ8",
  authDomain: "handmade-shop-420615.firebaseapp.com",
  projectId: "handmade-shop-420615",
  storageBucket: "handmade-shop-420615.appspot.com",
  messagingSenderId: "396878014048",
  appId: "1:396878014048:web:2e2eec286ee43ba9cb4505",
  measurementId: "G-T3LRPKXH41",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
