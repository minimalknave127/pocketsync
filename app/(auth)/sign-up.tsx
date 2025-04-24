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
  const { signUp } = useSession();
  const validationSchema = zod.object({
    email: zod.string().email("Zadejte platný email"),
    password: zod
      .string()
      .min(8, "Heslo musí mít alespoň 8 znaků")
      .regex(/[a-zA-Z]/, "Heslo musí obsahovat alespoň jedno písmeno")
      .regex(/[0-9]/, "Heslo musí obsahovat alespoň jedno číslo"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();

  async function handleSubmit(data: any) {
    try {
      setLoading(true);
      await signUp(data.email, data.password);
      setLoading(false);
      toast.success("Úspěšně jsi se zaregistroval");
      router.push("/");
    } catch (error) {
      console.log("sign up error", error);
      setLoading(false);
      toast.error("Whoops! Registrace nevyšla. 😔", {
        description: "Zkus to znovu za chvíli!",
      });
    }
  }
  return (
    <Screen className="px-container">
      <Text className="font-semibold text-xl">Registruj se 👋</Text>

      <Form {...form}>
        <View className="mt-6 gap-4 flex-1">
          <RHFInput
            label="Email"
            name="email"
            keyboardType="email-address"
            placeholder="Tvůj email"
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
          Pokračovat
        </Button>
      </Form>
    </Screen>
  );
}
