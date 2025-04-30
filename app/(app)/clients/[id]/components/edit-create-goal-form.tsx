import { Button } from "@/components/ui/button";
import CardSeparator from "@/components/ui/card-separator";
import { Form } from "@/components/ui/form";
import RHFDateTimePicker from "@/components/ui/form/rhf-date-time.picker";
import RHFInput from "@/components/ui/form/rhf-input";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import { Platform, ScrollView, View } from "react-native";

import { goalsProvider } from "@/dbProvider";
import { tGoalsRes } from "@/ts/goals";
import { useRouter } from "expo-router";
import { EmojiPopup } from "react-native-emoji-popup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { useQueryClient } from "@tanstack/react-query";

export default function EditGoalForm({
  isEditing,
  goal,
  clientId,
}: {
  isEditing: boolean;
  goal?: tGoalsRes;
  clientId: string;
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: goal?.name || "",
      complete_to_date: goal?.complete_to_date
        ? new Date(goal.complete_to_date)
        : new Date(),
      icon_emoji: goal?.icon_emoji || "🏋️",
      status: goal?.status || "incomplete",
    },
  });

  const emojiValue = form.watch("icon_emoji");

  const handleSubmit = async (formData: any) => {
    try {
      const payload = { ...formData, customer_id: clientId };
      const id = isEditing ? goal!.id : await goalsProvider.create(payload);

      if (isEditing) {
        await goalsProvider.update(id, payload);
      }

      // Update the list of goals
      queryClient.setQueryData<tGoalsRes[]>(
        ["clients-goals", clientId],
        (prev = []) =>
          isEditing
            ? prev.map((g) => (g.id === id ? { ...g, ...payload } : g))
            : [...prev, { ...payload, id }]
      );

      // If we edited, also update the single-goal cache
      if (isEditing) {
        queryClient.setQueryData<tGoalsRes>(
          ["client-goal", clientId, id],
          (prev) => ({ ...prev!, ...payload })
        );
      }

      toast.success(isEditing ? "Cíl upraven" : "Cíl vytvořen");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error(`Nepodařilo se ${isEditing ? "upravit" : "vytvořit"} cíl`);
    }
  };

  return (
    <View
      style={{
        paddingBottom:
          Platform.OS === "ios" && false ? insets.bottom * 2.5 : insets.bottom,
      }}
      className="flex-1 pt-0 mt-0"
    >
      <ScrollView contentContainerClassName="flex-1" className="flex-1">
        <Text className="font-semibold text-xl px-container">
          {isEditing ? "Uprav" : "Vytvoř nový"} cíl
        </Text>
        <View>
          <Form {...form}>
            <View className="mt-4 gap-6">
              <EmojiPopup
                onEmojiSelected={(emoji) => form.setValue("icon_emoji", emoji)}
              >
                <View className="w-40 h-40 rounded-3xl bg-muted self-center flex items-center justify-center">
                  <Text className="text-6xl">{emojiValue}</Text>
                </View>
              </EmojiPopup>
              <View className="px-container">
                <RHFInput
                  containerClassName="border-0 border-b mx-container"
                  inputClassName="text-center !text-2xl"
                  name="name"
                  placeholder="Název cíle"
                />
              </View>
              <CardSeparator className="py-4" />
              <View className="px-container gap-6">
                <RHFDateTimePicker
                  label="Kdy chceš cíl dokončit"
                  name="complete_to_date"
                />

                {/* <RHFNativeSelect
                  label="Stav cíle"
                  options={[
                    {
                      label: "Nedokončeno",
                      value: "incomplete",
                    },
                    {
                      label: "Dokončeno",
                      value: "complete",
                    },
                  ]}
                  name="status"
                /> */}
              </View>
            </View>
          </Form>
        </View>
      </ScrollView>
      <View className="px-container py-4">
        <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button>
      </View>
    </View>
  );
}
