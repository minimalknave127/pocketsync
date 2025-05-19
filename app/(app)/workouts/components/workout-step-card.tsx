import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";
import { wokrkoutStepTypesData } from "@/lib/selectData";
import { tWorkoutStep, tWorkoutStepType } from "@/ts/workouts";
import * as Haptics from "expo-haptics";
import { Clock10, Grip } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useIsActive, useReorderableDrag } from "react-native-reorderable-list";

export default function WorkoutStep({ step }: { step: tWorkoutStep }) {
  const drag = useReorderableDrag();
  const isActive = useIsActive();
  const subTitle =
    step.duration && step.exercise_type === "time"
      ? `${step.duration} s`
      : `${step.repeat_count} x ${step.exercise_duration}`;
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
      {step.type === "rest" ? (
        <View className="flex-row items-center gap-1">
          <View className="flex-row items-center gap-2 flex-1">
            <Icon
              icon={Grip}
              width={18}
              height={18}
              className="text-muted-foreground"
            />
            <View className="flex-row items-center gap-1 ">
              <Icon
                icon={Clock10}
                width={15}
                height={15}
                className="text-[#1E293B]/70"
              />
              <View className="flex-row">
                <Text className="text-xs text-[#1E293B]/70">Přestávka</Text>
                <Text className="text-xs text-[#1E293B]">
                  {step.duration} s
                </Text>
              </View>
            </View>
            <View className="flex-1 h-[1px] bg-input" />
          </View>
        </View>
      ) : (
        <View className="flex flex-row gap-3 items-center flex-1">
          <Icon
            icon={Grip}
            width={18}
            height={18}
            className="text-muted-foreground"
          />
          <View className="flex-1 flex flex-col">
            <View className="flex-row items-center">
              <Text className="font-medium">{step.name}</Text>
              <Text className="text-sm"> - {subTitle}</Text>
            </View>

            <Text className="text-sm mt-2.5 w-full flex-wrap shrink">
              {step.description}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
