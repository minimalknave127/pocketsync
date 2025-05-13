import RHFInput from "@/components/ui/form/rhf-input";
import { Text } from "@/components/ui/text";
import React from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { EmojiPopup } from "react-native-emoji-popup";

export default function CreateEditHeaderFormCard({
  name,
  placeholder,
}: {
  name: string;
  placeholder?: string;
}) {
  const form = useFormContext();

  const emojiValue = form.watch("icon_emoji");
  return (
    <View className="mt-4 flex flex-row gap-5 px-container ">
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
  );
}
