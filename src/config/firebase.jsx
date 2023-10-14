import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyB91Oen9vGPGMMg3AyDIXpFwfrnHCmdURs",
  authDomain: "chatapp-marvel-avengers.firebaseapp.com",
  projectId: "chatapp-marvel-avengers",
  storageBucket: "chatapp-marvel-avengers.appspot.com",
  messagingSenderId: "710290424889",
  appId: "1:710290424889:web:0c62d61c20168ba00e39e8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, user => {
	if(user != null) {
    //console.log("User", user)
  } else {
    console.log("No user")
  }
})

export { auth, provider };
export default db;