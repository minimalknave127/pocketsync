import { Icon } from "@/components/icon";
import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Text } from "@/components/ui/text";
import { tWorkoutStepStoreOption } from "@/stores/workout";
import { Clock10, Grip, Pencil } from "lucide-react-native";
import React from "react";
import { Dimensions, View } from "react-native";

const width = Dimensions.get("screen").width;

export default function WorkoutEditStepCard({
  loading,
  onPress,
  step,
}: {
  loading?: boolean;
  onPress?: () => void;
  step: tWorkoutStepStoreOption;
}) {
  const subTitle =
    step.duration && step.exerciseType === "time"
      ? `${step.duration} s`
      : `${step.repeatCount} x ${step.exerciseDuration}`;

  return (
    <View className="gap-4 ">
      {loading ? (
        loaders.steps
      ) : (
        <>
          {step.type === "rest" ? (
            <PauseCard duration={step.duration} />
          ) : (
            <ExerciseCard
              index={1}
              title={step.name}
              subTitle={subTitle}
              description={step.description}
            />
          )}
        </>
      )}
    </View>
  );
}

const ExerciseCard = ({ title, subTitle, description, index }) => {
  return (
    <View className="flex flex-row justify-between items-center gap-2 px-container py-4">
      <View className="flex flex-row gap-3 items-center flex-1">
        <Icon
          icon={Grip}
          width={18}
          height={18}
          className="text-muted-foreground"
        />
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
      <Icon
        icon={Pencil}
        width={18}
        height={18}
        className="text-muted-foreground"
      />
    </View>
  );
};

const PauseCard = ({ duration }: { duration: number }) => {
  return (
    <View className="flex-row items-center justify-between gap-2 px-container py-4">
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
            <Text className="text-xs text-[#1E293B]"> {duration} min</Text>
          </View>
        </View>
        <View className="flex-1 h-[1px] bg-input" />
      </View>
      <Icon
        icon={Pencil}
        width={18}
        height={18}
        className="text-muted-foreground"
      />
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
