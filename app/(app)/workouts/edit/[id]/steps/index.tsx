import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { tServStoreOption } from "@/stores/service";
import { useWorkoutStore } from "@/stores/workout";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import WorkoutEditStepCard from "../../../components/create-edit/workout-edit-step-card";

export default function ServiceOptionEditCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<tServStoreOption | null>(null);
  const workoutSteps = useWorkoutStore((state) => state.steps);
  const setWorkoutSteps = useWorkoutStore((state) => state.updateSteps);

  const router = useRouter();

  const handleEdit = (id: string) => {
    const step = workoutSteps.find((step) => step.id === id);
    if (step) {
      setSelected(step);
      setIsOpen(true);
    }
  };

  const handleUpdateOrder = async ({
    from,
    to,
  }: ReorderableListReorderEvent) => {
    try {
      // Reorder items
      const newOrdered = reorderItems(workoutSteps, from, to).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );

      setWorkoutSteps(newOrdered);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<tServStoreOption>) => {
    return (
      <WorkoutEditStepCard
        isPause
        // id={item.id}
        // title={item.name}
        // description={item.description}
        // onPress={handleEdit}
      />
    );
  };

  return (
    <>
      {/* <ServiceEditOptionsCreateEditSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
      /> */}
      <Screen className="flex-col justify-between">
        <Text className="text-2xl px-container font-semibold capitalize">
          Cviky
        </Text>
        <ReorderableList
          data={workoutSteps}
          onReorder={handleUpdateOrder}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
        <View className="px-container absolute right-0 bottom-0 w-full flex-col gap-2">
          {workoutSteps.length ? (
            <Button variant="outline" onPress={() => router.back()}>
              Uložit
            </Button>
          ) : null}
          <Button onPress={() => setIsOpen(true)}>Přidat</Button>
        </View>
      </Screen>
    </>
  );
}
