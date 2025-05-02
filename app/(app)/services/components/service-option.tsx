import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { Grip } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useIsActive, useReorderableDrag } from "react-native-reorderable-list";

export default function ServiceOption({ title }) {
  const drag = useReorderableDrag();
  const isActive = useIsActive();

  return (
    <TouchableOpacity
      className="px-container flex-row items-center justify-between py-4 active:bg-muted/20"
      activeOpacity={1}
      onLongPress={() => {
        drag();
        if (Platform.OS === "ios") {
          Haptics.selectionAsync();
        }
      }}
      disabled={isActive}
    >
      <View className="flex flex-row gap-2 items-center px-container">
        <Icon
          icon={Grip}
          className="text-muted-foreground"
          width={18}
          height={18}
        />
        <Text className="text-base w-full flex-wrap shrink">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
