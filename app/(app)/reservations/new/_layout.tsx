import BackBtn from "@/components/nav/back-btn";
import { Stack } from "expo-router";

export default function NewEventLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="page1"
        options={{
          title: "Vyberte klienta",
          headerLeft: () => <BackBtn />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="page2"
        options={{
          title: "Vyberte službu",
          headerLeft: () => <BackBtn />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="page3"
        options={{
          title: "Vyberte datum",
          headerLeft: () => <BackBtn />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="page4"
        options={{
          title: "Přehled rezervace",
          headerLeft: () => <BackBtn />,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
