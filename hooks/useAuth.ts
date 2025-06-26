// import * as SecureStore from "expo-secure-store";
import { setToken } from "@/state/sessionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp } from "@react-native-firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState();
  const [error, setError] = useState<string>();
  const [secure, setSecure] = useState<boolean>(true);
  const dispatch = useDispatch();

  const signIn = async () => {
    setIsLoading(true);
    try {
      const authInstance = getAuth(getApp());
      const response = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const user = response.user;

      if (user) {
        console.log(user.uid);
        setIsLoading(false);
        dispatch(setToken(user.uid));
        await AsyncStorage.setItem("token", user.uid);
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  };

  return {
    isLoading,
    signIn,
    error,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    secure,
    setSecure,
  };
};
