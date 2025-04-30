import DumbbellHand from "@/assets/icons/dumbell-hand";
import Signal1 from "@/assets/icons/signal-1";
import Signal2 from "@/assets/icons/signal-2";
import Signal3 from "@/assets/icons/signal-3";
import { Icon } from "@/components/icon";
import StatusPill from "@/components/statusPill";
import TextIconPill from "@/components/textIconPill";
import { Text } from "@/components/ui/text";
import { difficultyTypesData } from "@/lib/selectData";
import { tWorkoutDifficultyType, tWorkoutsResponse } from "@/ts/workouts";
import { Link } from "expo-router";
import { ChevronRight, Clock10, HandCoins } from "lucide-react-native";
import React, { ComponentType } from "react";
import { Image, Pressable, View } from "react-native";

export default function WorkoutCard({
  workout,
}: {
  workout: tWorkoutsResponse;
}) {
  return (
    <Link href={`/workouts/${workout.id}`} asChild>
      <Pressable className="flex flex-row items-center justify-between px-container py-5">
        <View className="flex flex-col gap-2">
          <View className="flex flex-col">
            <View className="flex flex-row gap-2">
              <Text className="font-medium">{workout.name}</Text>
              <StatusPill text={"Aktivni"} variant={"success"} />
            </View>
            <Text>{workout.notes}</Text>
          </View>
          <View className="flex flex-row gap-2.5">
            <TextIconPill
              text={difficultyTypesData[workout.difficulty].cs}
              icon={HandCoins}
            />
            <TextIconPill
              text={`${workout.steps_count} cviků`}
              icon={Clock10}
            />
          </View>
        </View>

        <Icon
          icon={ChevronRight}
          width={24}
          height={24}
          className="text-muted-foreground"
        />
      </Pressable>
    </Link>
  );
}
