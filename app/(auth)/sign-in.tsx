import { useSession } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { authProvider } from "@/dbProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { toast } from "sonner-native";

import zod from "zod";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();
  const validationSchema = zod.object({
    email: zod.string().email("Zadejte platný email"),
    password: zod.string(),
  });
  const form = useForm({
    defaultValues: {
      email: "tadeas.s@g.com",
      password: "GloB1234",
    },
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();

  async function handleSubmit(data: any) {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log("sign up error", error);
      setLoading(false);
      toast.error("Whoops! Špatný email nebo heslo");
    }
  }
  return (
    <Screen className="px-container">
      <Text className="font-semibold text-xl">Přihlaš se 👋</Text>

      <Form {...form}>
        <View className="mt-6 gap-4 flex-1">
          <RHFInput
            label="Email"
            name="email"
            placeholder="Tvůj email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          <RHFInput
            label="Heslo"
            name="password"
            keyboardType="email-address"
            placeholder="Tvoje heslo"
            secureTextEntry
          />
        </View>
        <Button
          isLoading={loading}
          onPress={form.handleSubmit(handleSubmit)}
          className="mt-6"
        >
          Přihlásit se
        </Button>
      </Form>
    </Screen>
  );
}
