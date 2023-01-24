
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB4SiJDN4Ga7RCXnhZjE6eaMpnv2__0b_8",
  authDomain: "connected-c86f2.firebaseapp.com",
  projectId: "connected-c86f2",
  storageBucket: "connected-c86f2.appspot.com",
  messagingSenderId: "708782102993",
  appId: "1:708782102993:web:b6916f875c082049a2e8f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app)
