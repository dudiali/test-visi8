import { useAppSelector } from "@/hooks/reduxHooks";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const token = useAppSelector((state) => state.session.token);

  return !token ? (
    <Redirect href="/login" />
  ) : (
    <Stack
      screenOptions={{
        animation: "ios_from_right",
        headerShown: false,
      }}
    />
  );
};

export default AuthLayout;
