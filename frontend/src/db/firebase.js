import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB6z4y9f1VoXmAN_nSw5Isn3syPwURXf68",
    authDomain: "aqua-overseas-d33d4.firebaseapp.com",
    projectId: "aqua-overseas-d33d4",
    storageBucket: "aqua-overseas-d33d4.firebasestorage.app",
    messagingSenderId: "197658395233",
    appId: "1:197658395233:web:68b6cbad8e9b1cfafa2020",
    measurementId: "G-XP9GM4CF4T"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };