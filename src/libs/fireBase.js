import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIRE_API,
  authDomain: "food-order-app-419019.firebaseapp.com",
  projectId: "food-order-app-419019",
  storageBucket: "food-order-app-419019.appspot.com",
  messagingSenderId: "240399708955",
  appId: "1:240399708955:web:eb368faec7cecf994a19be",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
