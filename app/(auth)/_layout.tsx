import { useAppSelector } from "@/hooks/reduxHooks";
import { setToken } from "@/state/sessionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthLayout = () => {
  const token = useAppSelector((state) => state.session.token);
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        dispatch(setToken(value));
      } else {
        dispatch(setToken(null));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && token) {
      router.replace("/(app)");
    }
  }, [token, isReady]);

  // if (!isReady) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  if (token) {
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
