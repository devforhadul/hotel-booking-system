import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth } from "../Firebase/firebase.init";

import axios from "axios";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(Auth, email, password);
  };

  const createAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(Auth, (currentUser) => {
      //console.log("Now user: ",currentUser)

      axios
        .post("https://modern-hotel-booking-server-nine.vercel.app/jwt", { email: currentUser?.email })
        .then((res) => {
          localStorage.setItem('token', res?.data.token);
        });

      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe;
    };
  }, []);

  const userData = {
    user,
    loginWithEmail,
    createAccount,
    loading,
  };

  return <AuthContext value={userData}>{children}</AuthContext>;
};

export default AuthProvider;
