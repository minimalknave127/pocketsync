import { Icon } from "@/components/icon";
import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Text } from "@/components/ui/text";
import { Clock10, Grip, Pencil } from "lucide-react-native";
import React from "react";
import { Dimensions, View } from "react-native";

const width = Dimensions.get("screen").width;

export default function WorkoutEditStepCard({
  loading,
  isPause,
}: {
  loading?: boolean;
  isPause?: boolean;
}) {
  return (
    <View className="gap-4">
      {loading ? (
        loaders.steps
      ) : (
        <>
          <ExerciseCard
            index={1}
            title={"Rozcvička"}
            subTitle={"60 min"}
            description={
              "Protahování horních a dolních končetin včetně menší silové zátěže"
            }
          />
          <PauseCard />
          <ExerciseCard
            index={1}
            title={"Rozcvička"}
            subTitle={"60 min"}
            description={
              "Protahování horních a dolních končetin včetně menší silové zátěenze"
            }
          />
          <ExerciseCard
            index={1}
            title={"Rozcvička"}
            subTitle={"60 min"}
            description={
              "Protahování horních a dolních končetin včetně menší silové zátěže"
            }
          />
        </>
      )}
    </View>
  );
}

const ExerciseCard = ({ title, subTitle, description, index }) => {
  return (
    <View className="flex flex-row justify-between items-center gap-2 px-container ">
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

const PauseCard = () => {
  return (
    <View className="flex-row items-center justify-between gap-2 px-container ">
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
            <Text className="text-xs text-[#1E293B]"> 2 min</Text>
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
