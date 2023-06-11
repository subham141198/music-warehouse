
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERI ,
  appId: import.meta.env.VITE_APPID,
};



 const app = initializeApp(firebaseConfig)
 export  const auth = getAuth(app)
 export default app