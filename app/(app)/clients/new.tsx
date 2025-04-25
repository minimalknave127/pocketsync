import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import { Input } from "@/components/ui/input";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";
import GSDateTimePicker from "@/components/ui/date-time-picker";
import RHFDateTimePicker from "@/components/ui/form/rhf-date-time.picker";
import CardSeparator from "@/components/ui/card-separator";
import { useRouter } from "expo-router";
import { clientProvider } from "@/dbProvider";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RHFCheckbox from "@/components/ui/form/rhf-checkbox";
import { useQueryClient } from "@tanstack/react-query";

export default function NewClient() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const schema = zod.object({
    email: zod
      .string()
      .email("Musí být platný email")
      .max(200, "Maximální délka je 200 znaků"),
    username: zod
      .string()
      .min(1, "Zadejte jméno")
      .max(100, "Maximální délka je 100 znaků"),
    birthdate: zod
      .date()
      .refine((date) => date.getTime() < new Date().getTime(), {
        message: "Datum narození musí být v minulosti",
      })
      .optional(),
    send_email: zod.boolean().optional(),
    weight: zod.coerce.number().optional(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      birthdate: new Date(),
      send_email: false,
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const res = await clientProvider.createClient(data);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Klient úspěšně vytvořen");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Nepodařilo se vytvořit klienta");
    }
    setLoading(false);
  }

  return (
    <Screen className="pt-0">
      <ScrollView className="mt-2 flex-1" contentContainerClassName="pt-4">
        <Form {...form}>
          <View className="gap-6 px-container">
            <RHFInput
              required
              name="email"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              textContentType="emailAddress"
            />
            <RHFInput required name="username" label="Jméno" />
            {/* <RHFInput name="birthdate" /> */}
            <RHFDateTimePicker
              // maximumDate={new Date()}
              label="Datum narození"
              name="birthdate"
            />
            <RHFCheckbox
              name="send_email"
              fillColor="#26C195"
              text="Odeslat klientovi email"
              textComponent={
                <View className="ms-3">
                  <Text>Odeslat klientovi email</Text>
                  <Text className="text-sm text-muted-foreground">
                    Klient dostane email o pozvání do aplikace
                  </Text>
                </View>
              }
            />
          </View>
          <CardSeparator className="my-4" />
          <View className="px-container">
            <RHFInput
              required
              name="weight"
              label="Váha klienta"
              placeholder="0 kg"
            />
          </View>
        </Form>
      </ScrollView>
      <View className="px-container mb-2">
        <Button isLoading={loading} onPress={form.handleSubmit(onSubmit)}>
          Vytvořit
        </Button>
      </View>
    </Screen>
  );
}
