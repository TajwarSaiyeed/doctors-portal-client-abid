import React, { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLoginSignin = (Provider) => {
    setLoading(true);
    return signInWithPopup(auth, Provider);
  };
  const createUserWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const update = (updateUser) => {
    return updateProfile(auth.currentUser, updateUser);
  };
  const loginUserWIthEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser === null || currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    googleLoginSignin,
    createUserWithEmailPassword,
    update,
    loginUserWIthEmailPassword,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;