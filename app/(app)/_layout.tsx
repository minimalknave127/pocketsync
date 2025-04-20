import BackBtn from "@/components/nav/back-btn";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="clients/new"
        options={{
          title: "Nový klient",
          presentation: "modal",
          headerRight: () => <BackBtn isModal />,
        }}
      />
    </Stack>
  );
}
