import { createContext,useEffect, useState } from "react";
import { createUserWithEmailAndPassword, FacebookAuthProvider,signInWithEmailAndPassword, signOut, signInWithPopup,onAuthStateChanged, GoogleAuthProvider,   } from "firebase/auth"
import {auth} from "../Firebase/Firebase.config"
export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider();
const facebookauthProvider =  new FacebookAuthProvider();




export function AuthProvider({children}){

    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    function SignUp(email, password){
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function Login(email, password){
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    function LogOut(){
        setloading(true)
        return signOut(auth)
    }

    function signInWithGoogle(){
        setloading(true)
        return signInWithPopup(auth,googleAuthProvider)
    }
    function signInWithFacebook(){
        setloading(true)
        return signInWithPopup(auth,facebookauthProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentuser) => {
            console.log('auth state change', currentuser);
            setuser(currentuser);
            setloading(false)
        });
        return unsubscribe;
      }, []);

      const value = {
        user,loading,SignUp,Login,LogOut,signInWithGoogle,signInWithFacebook
      };



    return <AuthContext.Provider  value={{...value}}>{children}</AuthContext.Provider>
}