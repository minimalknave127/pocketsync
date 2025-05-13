import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { Grip, Pencil } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useIsActive, useReorderableDrag } from "react-native-reorderable-list";

export default function ServiceOption({
  id,
  title,
  description,
  onPress,
}: {
  id: string;
  title: string;
  description: string;
  onPress?: (val: string) => void;
}) {
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
      <View className="flex flex-row items-center justify-between w-full px-container ">
        <View className="flex flex-row gap-4 items-center flex-1">
          <Icon
            icon={Grip}
            className="text-muted-foreground"
            width={18}
            height={18}
          />
          <View className="flex-1">
            <Text className="text-base w-full flex-wrap shrink">{title}</Text>
            {description && (
              <Text className="text-sm w-full flex-wrap flex-1 shrink text-slate-600">
                {description}
              </Text>
            )}
          </View>
        </View>
        {onPress && (
          <Button variant="ghost" size="icon" onPress={() => onPress(id)}>
            <Icon
              icon={Pencil}
              className="text-muted-foreground"
              width={18}
              height={18}
            />
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
}
