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

export default function NewClient() {
  const router = useRouter();
  const schema = zod.object({
    email: zod.string().email("Musí být platný email"),
    firstname: zod.string().min(1, "Zadejte jméno"),
    lastname: zod.string().min(1, "Zadejte příjmení"),
    birthdate: zod
      .date()
      .refine((date) => date.getTime() < new Date().getTime(), {
        message: "Datum narození musí být v minulosti",
      }),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      birthdate: new Date(),
    },
    resolver: zodResolver(schema),
  });
  function onSubmit(data: any) {
    console.log("submit values", data);
    toast.success("Klient úspěšně vytvořen");
    router.back();
  }
  return (
    <Screen className="pt-0">
      <ScrollView className="mt-2 flex-1" contentContainerClassName="pt-4">
        <Form {...form}>
          <View className="gap-4 px-container">
            <RHFInput required name="email" label="Email" />
            <RHFInput required name="firstname" label="Jméno" />
            <RHFInput required name="lastname" label="Příjmení" />
            {/* <RHFInput name="birthdate" /> */}
            <RHFDateTimePicker
              maximumDate={new Date()}
              label="Datum narození"
              name="birthdate"
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
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text>Vytvořit</Text>
        </Button>
      </View>
    </Screen>
  );
}
