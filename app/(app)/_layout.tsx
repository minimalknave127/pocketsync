import { useSession } from "@/auth/auth";
import BackBtn from "@/components/nav/back-btn";
import { Text } from "@/components/ui/text";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { user, isLoading } = useSession();
  if (isLoading) {
    return <Text>Načítám...</Text>;
  }
  if (!user) {
    return <Redirect href="/(auth)/welcome-screen" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerLeft: () => <BackBtn />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="clients/new"
        options={{
          title: "Nový klient",
          presentation: "modal",
          headerRight: () => <BackBtn isModal />,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="clients/[id]/index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="clients/[id]/goals/index"
        options={{
          title: "",
          presentation: "modal",
          headerRight: () => <BackBtn isModal />,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="clients/[id]/goals/edit/[goal]"
        options={{
          title: "",
          presentation: "modal",
          headerRight: () => <BackBtn isModal />,
          headerLeft: null,
        }}
      />
    </Stack>
  );
}
