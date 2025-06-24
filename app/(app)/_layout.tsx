import { useAuth } from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";

const AuthLayout = () => {
  const { isLogin, isLoading } = useAuth();

  // if (!isLogin) {
  //   return <Redirect href="/login" />;
  // }

  if (isLoading) return null;

  return !isLogin ? <Redirect href="/login" /> : <Slot />;
};

export default AuthLayout;
