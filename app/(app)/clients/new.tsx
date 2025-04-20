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

export default function NewClient() {
  const schema = zod.object({
    email: zod.string().email("Musí být platný email"),
    firstname: zod.string().min(1, "Zadejte jméno"),
    lastname: zod.string().min(1, "Zadejte příjmení"),
  });
  const form = useForm({ resolver: zodResolver(schema) });
  function onSubmit(data: any) {
    console.log("submit values", data);
  }
  return (
    <Screen className="pt-0">
      <ScrollView
        className="px-container mt-2 flex-1"
        contentContainerClassName="pt-4"
      >
        <Form {...form}>
          <View className="gap-4">
            <RHFInput required name="email" label="Email" />
            <RHFInput required name="firstname" label="Jméno" />
            <RHFInput required name="lastname" label="Příjmení" />
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
