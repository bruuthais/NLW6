import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWitHGoogle: () => Promise<void>;

}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user) {
        const {displayName, photoURL, uid} = user
       if (!displayName || !photoURL) {
        throw new Error ("Missing information from google account");
      }
    
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
    })
  
    return () => {
      unsubscribe();
    }
  }, [])
  
  async function signInWitHGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    const result = await auth.signInWithPopup(provider)
  
        if (result.user) {
          const {displayName, photoURL, uid} = result.user
         if (!displayName || !photoURL) {
          throw new Error ("Missing information from google account");
        }
      
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
  }
  

  return (
    <AuthContext.Provider value={{user, signInWitHGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;