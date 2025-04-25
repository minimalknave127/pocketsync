import { Form } from "@/components/ui/form";
import RHFDateTimePicker from "@/components/ui/form/rhf-date-time.picker";
import RHFInput from "@/components/ui/form/rhf-input";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function EditGoal() {
  const form = useForm({
    defaultValues: {
      name: "",
      complete_to_date: new Date(),
    },
  });
  return (
    <View>
      <Text className="font-semibold text-xl px-container">Cíl</Text>
      <Form {...form}>
        <View className="px-container mt-4 gap-6">
          <RHFInput
            containerClassName="border-0 border-b"
            inputClassName="text-center !text-2xl"
            name="name"
            placeholder="Název cíle"
          />
          <RHFDateTimePicker label="Deadline" name="complete_to_date" />
        </View>
      </Form>
    </View>
  );
}
