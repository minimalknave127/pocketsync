import RHFInput from "@/components/ui/form/rhf-input";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { Text } from "@/components/ui/text";
import { difficultyTypesSelect } from "@/lib/selectData";
import React from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { EmojiPopup } from "react-native-emoji-popup";

export default function CreateEditHeaderFormCard({
  name,
  placeholder,
  subHeader,
}: {
  name: string;
  placeholder?: string;
  subHeader?: React.ReactNode;
}) {
  const form = useFormContext();

  const emojiValue = form.watch("icon_emoji");
  return (
    <View className="flex flex-col px-container">
      <View className="mt-4 flex flex-row gap-5 ">
        <EmojiPopup
          onEmojiSelected={(emoji) => form.setValue("icon_emoji", emoji)}
        >
          <View className="w-[70px] h-[70px] rounded-3xl bg-muted self-center flex items-center justify-center">
            <Text className="text-3xl">{emojiValue}</Text>
          </View>
        </EmojiPopup>
        <View className="flex-1">
          <RHFInput
            containerClassName="border-0 border-b mx-container"
            name={name}
            placeholder={placeholder}
          />
        </View>
      </View>
      {subHeader && subHeader}
    </View>
  );
}
