import DumbbellHand from "@/assets/icons/dumbell-hand";
import Signal1 from "@/assets/icons/signal-1";
import Signal2 from "@/assets/icons/signal-2";
import Signal3 from "@/assets/icons/signal-3";
import { Icon } from "@/components/icon";
import TextIconPill from "@/components/TextIconPill";
import { Text } from "@/components/ui/text";
import { difficultyTypesData } from "@/lib/selectData";
import { tWorkoutDifficultyType, tWorkoutsResponse } from "@/ts/workouts";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
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
        <View className="flex flex-row gap-4 items-center">
          <Image
            src="https://v3apparel.com/cdn/shop/articles/Get_Fit_in_Just_10_Minutes_-_Full-Body_Workout_for_Busy_Women_-_V3_Apparel_seamless_workout_leggings_gym_tights_fitness_sports_bras_tank_tops_and_t_shirts.jpg?v=1679523333&width=2048"
            className=" h-[70px] w-[70px] rounded-2xl"
          />
          <View className="flex flex-col gap-2">
            <View className="flex flex-col">
              <Text className="font-medium">{workout.name}</Text>
              <Text>{workout.description}</Text>
            </View>
            <View className="flex flex-row gap-2.5">
              <TextIconPill
                text={difficultyTypesData[workout.difficulty].cs}
                icon={renderDifficultyIcon(workout.difficulty)}
              />
              <TextIconPill
                text={`${workout.steps_count} cviků`}
                icon={<DumbbellHand />}
              />
            </View>
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

const renderDifficultyIcon = (difficulty: tWorkoutDifficultyType) => {
  switch (difficulty) {
    case "easy":
      return <Signal1 />;
    case "medium":
      return <Signal2 />;
    case "hard":
      return <Signal3 />;
  }
};
