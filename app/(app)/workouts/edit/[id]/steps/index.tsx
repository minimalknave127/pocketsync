import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { tServStoreOption } from "@/stores/service";
import { tWorkoutStepStoreOption, useWorkoutStore } from "@/stores/workout";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import WorkoutEditStepCard from "../../../components/create-edit/workout-edit-step-card";
import WorkoutEditStepCreateEditSheet from "../../../components/create-edit/workout-edit-step-create-edit-sheet";
import WorkoutEditRestCreateEditSheet from "../../../components/create-edit/workout-edit-rest-create-edit-sheet";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

export default function ServiceOptionEditCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<tWorkoutStepStoreOption | null>(
    null
  );
  const navigation = useNavigation();
  const workoutSteps = useWorkoutStore((state) => state.steps);
  const setWorkoutSteps = useWorkoutStore((state) => state.updateSteps);

  const router = useRouter();

  const sheetRef = useRef<TrueSheet>(null);

  const present = async () => await sheetRef.current?.present();
  const dismiss = async () => {
    await sheetRef.current?.dismiss();
    setSelected(null);
  };

  const handleEdit = (id: number) => {
    const step = workoutSteps.find((step) => step.id === id);
    if (step) {
      setSelected(step);

      if (step.type === "rest") {
        present();
      } else setIsOpen(true);
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

  const renderItem = ({
    item,
  }: ListRenderItemInfo<tWorkoutStepStoreOption>) => {
    return (
      <WorkoutEditStepCard
        onPress={() => handleEdit(item.id)}
        step={item}

        // id={item.id}
        // title={item.name}
        // description={item.description}
        // onPress={handleEdit}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="secondary" size="sm" onPress={() => router.back()}>
          Uložit
        </Button>
      ),
    });
  }, []);

  return (
    <>
      {/* Pause/Rest create - edit */}
      <WorkoutEditRestCreateEditSheet
        sheetRef={sheetRef}
        close={dismiss}
        selected={selected}
      />
      {/* Step create edit */}
      <WorkoutEditStepCreateEditSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
      />
      <Screen className="flex-col justify-between">
        <View className="flex flex-row justify-between items-center px-container">
          <Text className="text-2xl font-semibold capitalize">Cviky</Text>
        </View>
        <ReorderableList
          data={workoutSteps}
          onReorder={handleUpdateOrder}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
        <View className="px-container absolute right-0 bottom-0 w-full flex flex-row gap-2">
          <Button variant="secondary" className="flex-1" onPress={present}>
            Přidat pauzu
          </Button>

          <Button onPress={() => setIsOpen(true)} className="flex-1">
            Přidat cvik
          </Button>
        </View>
      </Screen>
    </>
  );
}
