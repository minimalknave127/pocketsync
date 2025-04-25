import { Button } from "@/components/ui/button";
import CardSeparator from "@/components/ui/card-separator";
import { Form } from "@/components/ui/form";
import RHFDateTimePicker from "@/components/ui/form/rhf-date-time.picker";
import RHFInput from "@/components/ui/form/rhf-input";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmojiPopup } from "react-native-emoji-popup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function EditGoal() {
  const form = useForm({
    defaultValues: {
      name: "",
      complete_to_date: new Date(),
      emoji: "🏋️",
      status: "incomplete",
    },
  });
  const emojiValue = form.watch("emoji");
  const insets = useSafeAreaInsets();
  const { nested, goal } = useLocalSearchParams();

  const isEditing = goal !== "new";

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
                onEmojiSelected={(emoji) => form.setValue("emoji", emoji)}
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
        <Button>Vytvořit</Button>
      </View>
    </View>
  );
}
