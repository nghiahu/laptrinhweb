import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "m26-project-d5afd.firebaseapp.com",
  projectId: "m26-project-d5afd",
  storageBucket: "m26-project-d5afd.appspot.com",
  messagingSenderId: "500638045266",
  appId: "1:500638045266:web:09b1cc0238f91b07a3bb8b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };