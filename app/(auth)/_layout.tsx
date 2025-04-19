import { useSession } from "@/auth/auth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useSession();
  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
