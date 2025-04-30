import { goalsProvider } from "@/dbProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import EditGoalForm from "../../components/edit-create-goal-form";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CardSeparator from "@/components/ui/card-separator";
import { Trash2 } from "lucide-react-native";

type SearchParamsProps = {
  goal: string;
  id: string;
};
const width = Dimensions.get("screen").width;
export default function EditGoal() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { goal: goalId, id: clientId }: SearchParamsProps =
    useLocalSearchParams();

  const isEditing = goalId !== "new";

  const { data: goalData, isLoading } = useQuery({
    queryKey: ["client-goal", clientId, goalId],
    queryFn: async () => {
      const res = await goalsProvider.getGoal(goalId as string);
      return res?.data?.data;
    },
    enabled: !!goalId && isEditing,
  });

  return isLoading ? (
    <SkeletonComponent isEditing={isEditing} insets={insets} />
  ) : (
    <EditGoalForm isEditing={isEditing} goal={goalData} clientId={clientId} />
  );
}

const SkeletonComponent = ({ isEditing, insets }) => {
  return (
    <View
      style={{
        paddingBottom:
          Platform.OS === "ios" && false ? insets.bottom * 2.5 : insets.bottom,
      }}
      className="flex-1 pt-0 mt-0"
    >
      <ScrollView contentContainerClassName="flex-1" className="flex-1">
        <Text className="font-semibold text-xl px-container">
          {isEditing ? "Uprav" : "Vytvoř nový"} cíl
        </Text>
        <View>
          <View className="mt-4 gap-6">
            {loaders.icon}
            <View className="px-container">{loaders.title}</View>
            <CardSeparator className="py-4" />
            <View className="px-container gap-6">{loaders.select}</View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const loaders = {
  select: (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={40}
          borderRadius={10}
          marginBottom={12}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  ),
  title: (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={40}
          borderRadius={10}
          marginBottom={12}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  ),
  icon: (
    <View className="flex items-center justify-center">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={160}
            height={160}
            borderRadius={10}
            marginBottom={12}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ),
};
