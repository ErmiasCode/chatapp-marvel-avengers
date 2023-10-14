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
  apiKey: "AIzaSyA7WxqE2fINENgP9vkoVbBChKT5UlJ_kZI",
  authDomain: "whatsapp-clone-bb338.firebaseapp.com",
  projectId: "whatsapp-clone-bb338",
  storageBucket: "whatsapp-clone-bb338.appspot.com",
  messagingSenderId: "309734145947",
  appId: "1:309734145947:web:95744dc597742aa69d6b3e"
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