// import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // SecureStore.setItemAsync("token", "test");

    setIsLoading(false);
  }, []);

  return {
    isLogin,
    isLoading,
  };
};
