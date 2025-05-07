import { useSession } from "@/auth/auth";
import BackBtn from "@/components/nav/back-btn";
import DeleteGoal from "@/components/stack/delete-goal";
import { Text } from "@/components/ui/text";
import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WorkoutOptions from "./workouts/components/workout-steps";

export default function AppLayout() {
  const { user, isLoading } = useSession();
  if (isLoading) {
    return <Text>Načítám...</Text>;
  }
  if (!user) {
    return <Redirect href="/(auth)/welcome-screen" />;
  }
  return (
    <SafeAreaProvider>
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
          options={({ route }) => ({
            title: "",
            presentation: "fullScreenModal",
            headerLeft: () => <DeleteGoal route={route} />,
            headerRight: () => <BackBtn isModal />,
          })}
        />
        <Stack.Screen
          name="services/index"
          options={{
            title: "Služby",
          }}
        />
        <Stack.Screen
          name="services/[id]/index"
          options={({ route }) => ({
            title: "",
            headerLeft: () => <BackBtn />,
            headerRight: () => <WorkoutOptions route={route} />,
          })}
        />
        <Stack.Screen
          name="services/[id]/options/index"
          options={({ route }) => ({
            title: "",
            headerLeft: () => <BackBtn />,
          })}
        />
        <Stack.Screen
          name="workouts/index"
          options={{
            title: "Cvičení",
          }}
        />
        <Stack.Screen
          name="workouts/[id]/index"
          options={({ route }) => ({
            title: "",
            headerLeft: () => <BackBtn />,
            headerRight: () => <WorkoutOptions route={route} />,
          })}
        />
        <Stack.Screen
          name="workouts/[id]/edit/index"
          options={{
            title: "",
            // headerRight: () => <BackBtn />,
          }}
        />
        <Stack.Screen
          name="workouts/[id]/steps/index"
          options={({ route }) => ({
            title: "",
            headerLeft: () => <BackBtn />,
          })}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
