import { Icon } from "@/components/icon";
import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useWorkoutStore } from "@/stores/workout";
import { Link } from "expo-router";
import { Clock10 } from "lucide-react-native";
import React from "react";
import { Dimensions, View } from "react-native";

const width = Dimensions.get("screen").width;

export default function WorkoutStepsCard({
  loading,
  isEdit,
}: {
  loading?: boolean;
  isEdit?: boolean;
}) {
  const workoutSteps = useWorkoutStore((state) => state.steps);

  return (
    <View className="gap-7">
      <View className="flex flex-row items-center px-container justify-between">
        {loading ? (
          loaders.title
        ) : (
          <Text className="font-semibold text-base">Cviky</Text>
        )}

        {loading ? (
          loaders.button
        ) : (
          <Link
            href={isEdit ? "/workouts/edit/new/steps" : "/workouts/2/steps"}
            asChild
          >
            <Button variant="link" size="sm">
              Upravit
            </Button>
          </Link>
        )}
      </View>
      <View className="gap-4">
        {loading
          ? loaders.steps
          : workoutSteps.map((step, index) =>
              step.type === "rest" ? (
                <PauseCard key={step.id} duration={step.duration} />
              ) : (
                <ExerciseCard
                  key={step.id}
                  index={index + 1}
                  title={step.name}
                  subTitle={
                    step.exerciseType === "time"
                      ? `${step.duration} s`
                      : `${step.repeatCount} x ${step.exerciseDuration}`
                  }
                  description={step.description}
                />
              )
            )}
      </View>
    </View>
  );
}

const ExerciseCard = ({ title, subTitle, description, index }) => {
  return (
    <View className="flex flex-row gap-3 px-container">
      <View className="w-12 h-12 bg-slate-100 rounded-lg items-center justify-center">
        <Text className="font-medium">{index}</Text>
      </View>
      <View className="flex-1 flex flex-col">
        <View className="flex-row items-center">
          <Text className="font-medium">{title}</Text>
          <Text className="text-sm"> - {subTitle}</Text>
        </View>

        <Text className="text-sm mt-2.5 w-full flex-wrap shrink">
          {description}
        </Text>
      </View>
    </View>
  );
};

const PauseCard = ({ duration }: { duration: number }) => {
  return (
    <View className="flex-row justify-center items-center gap-2">
      <View className="flex-1 h-[1px]  bg-input" />
      <View className="flex-row items-center gap-1 ">
        <Icon
          icon={Clock10}
          width={15}
          height={15}
          className="text-[#1E293B]/70"
        />
        <View className="flex-row">
          <Text className="text-xs text-[#1E293B]/70">Přestávka</Text>
          <Text className="text-xs text-[#1E293B]"> {duration} s</Text>
        </View>
      </View>
      <View className="flex-1 h-[1px] bg-input" />
    </View>
  );
};

const loaders = {
  title: <SkeletonBox w={width * 0.4} h={25} />,
  button: <SkeletonBox w={width * 0.4} h={25} />,
  steps: (
    <View className="gap-2 px-container">
      {[...Array(3)].map((_, i) => (
        <SkeletonBox key={i} w={width * 0.9} h={70} />
      ))}
    </View>
  ),
};
