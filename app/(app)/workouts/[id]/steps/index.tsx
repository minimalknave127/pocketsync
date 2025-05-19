import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { workoutsProvider } from "@/dbProvider";
import {
  tNewWorkoutStepEntry,
  tWorkoutResponse,
  tWorkoutStep,
} from "@/ts/workouts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import WorkoutStep from "../../components/workout-step-card";
import WorkoutEditStepCreateEditSheet from "../../components/create-edit/workout-edit-step-create-edit-sheet";
import WorkoutEditRestCreateEditSheet from "../../components/create-edit/workout-edit-rest-create-edit-sheet";
import { useRef, useState } from "react";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

export default function WorkoutStepsEdit() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useLocalSearchParams();

  const sheetRef = useRef<TrueSheet>(null);

  const present = async () => await sheetRef.current?.present();
  const dismiss = async () => await sheetRef.current?.dismiss();

  const queryClient = useQueryClient();
  const {
    data: steps,
    isLoading,
  }: { data: tWorkoutStep[]; isLoading: boolean } = useQuery({
    queryKey: ["workout-steps", id],
    queryFn: async () => {
      const res = await workoutsProvider.getWorkout(id as string, true);
      return res?.data?.data;
    },
    enabled: !!id,
  });

  const handleUpdateOrder = async ({
    from,
    to,
  }: ReorderableListReorderEvent) => {
    try {
      // Reorder items
      const newOrdered = reorderItems(steps, from, to).map((item, index) => ({
        ...item,
        order: index,
      }));

      // Update query data
      queryClient.setQueryData(["workout-steps", id], newOrdered);

      const workout: tWorkoutResponse = await queryClient.getQueryData([
        "workouts",
        id,
      ]);
      queryClient.setQueryData(["workouts", id], {
        ...workout,
        steps: newOrdered,
      });

      // Update DB
      await workoutsProvider.updateOrder(newOrdered);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onStepCreate = async (data: tNewWorkoutStepEntry) => {
    try {
      const created_id = await workoutsProvider.createStep(id as string, data);
      const newStep = { ...data, id: created_id };

      queryClient.setQueryData(
        ["workout-steps", id],
        (prev: tWorkoutStep[]) => [...prev, newStep]
      );

      const workout: tWorkoutResponse = await queryClient.getQueryData([
        "workouts",
        id,
      ]);
      queryClient.setQueryData(["workouts", id], {
        ...workout,
        steps: [...workout.steps, newStep],
      });

      dismiss();
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<tWorkoutStep>) => {
    return <WorkoutStep step={item} />;
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Pause/Rest create - edit */}
      <WorkoutEditRestCreateEditSheet
        sheetRef={sheetRef}
        close={dismiss}
        handleSubmit={onStepCreate}
      />
      {/* Step create edit */}
      <WorkoutEditStepCreateEditSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={onStepCreate}
      />

      <Screen className="pt-0 mt-0 flex-1">
        <Text className="font-semibold text-xl px-container">Cviky</Text>

        <ReorderableList
          data={steps}
          onReorder={(data) => handleUpdateOrder(data)}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
        <View className="px-container mt-4 flex-row gap-2">
          <Button variant="secondary" onPress={present} className="flex-1">
            Přidat Pauzu
          </Button>
          <Button onPress={() => setIsOpen(true)} className="flex-1">
            Přidat cvik
          </Button>
        </View>
      </Screen>
    </>
  );
}
