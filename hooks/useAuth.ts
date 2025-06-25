// import * as SecureStore from "expo-secure-store";
import { auth } from "@/lib/firebase";
import { clearToken, setToken } from "@/state/sessionSlice";
import { useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.session.token);
  const segments = useSegments();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = user.getIdToken();
        dispatch(setToken(userToken));
      } else {
        dispatch(clearToken());
      }
    });

    return unsub;
  }, []);

  return {
    isLogin,
    isLoading,
  };
};
