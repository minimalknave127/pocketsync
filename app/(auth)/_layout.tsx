import { useSession } from "@/auth/auth";
import BackBtn from "@/components/nav/back-btn";
import { Redirect, Stack } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

export default function AuthLayout() {
  const { user } = useSession();
  if (user) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
        <Stack>
          <Stack.Screen
            name="welcome-screen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerTitle: "",
              headerLeft: () => <BackBtn />,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              headerTitle: "",
              headerLeft: () => <BackBtn />,
            }}
          />
        </Stack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
