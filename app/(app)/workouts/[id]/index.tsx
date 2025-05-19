import DumbbellHand from "@/assets/icons/dumbell-hand";
import DetailsHeader from "@/components/cards/details-header";
import TextCard from "@/components/cards/text-card";
import TextIconPill from "@/components/TextIconPill";
import { Screen } from "@/components/ui/screen";
import { Clock10 } from "lucide-react-native";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExercisesCard from "../components/steps-card";
import { useQuery } from "@tanstack/react-query";
import { workoutsProvider } from "@/dbProvider";
import { useLocalSearchParams } from "expo-router";
import { tWorkoutResponse } from "@/ts/workouts";

export default function WorkoutDetails() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const { data, isLoading }: { data: tWorkoutResponse; isLoading: boolean } =
    useQuery({
      queryFn: async () => {
        const res = await workoutsProvider.getWorkout(id as string);
        return res?.data?.data;
      },
      queryKey: ["workouts", id],
    });
  return (
    <Screen>
      <View
        style={{
          paddingBottom:
            Platform.OS === "ios" && false
              ? insets.bottom * 2.5
              : insets.bottom,
        }}
        className="flex-1 pt-0 mt-0"
      >
        <ScrollView contentContainerClassName="flex-1" className="flex-1">
          <View className="mt-4 gap-6">
            {/* Header */}
            <DetailsHeader
              loading={isLoading}
              title={data?.name}
              icon={data?.icon_emoji}
              descripton={
                <>
                  <TextIconPill
                    icon={Clock10}
                    text={`${data?.total_duration} minut`}
                  />
                  <TextIconPill
                    icon={<DumbbellHand />}
                    text={`${data?.steps.length} cviků`}
                  />
                </>
              }
              separator
            />

            {/* Description */}
            <TextCard
              loading={isLoading}
              title={"Popis"}
              description={data?.description}
              separator
            />

            {/* Excercises */}
            <ExercisesCard
              loading={isLoading}
              steps={data?.steps}
              id={id as string}
            />
          </View>
        </ScrollView>
        <View className="px-container py-4">
          {/* <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button> */}
        </View>
      </View>
    </Screen>
  );
}
