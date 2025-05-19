import { Form } from "@/components/ui/form";
import { servicesProvider, workoutsProvider } from "@/dbProvider";
import { useWorkoutStore } from "@/stores/workout";
import { tServiceResponse, tServicesResponse } from "@/ts/services";
import { sNewServiceSchema } from "@/zod/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import ServiceEditDescriptionSheet from "../../../../../components/edit-description-sheet";
import { Platform, ScrollView, View } from "react-native";
import CreateEditHeaderFormCard from "@/components/cards/form/edit-header";
import CardSeparator from "@/components/ui/card-separator";
import TextCard from "@/components/cards/text-card";
import { Button } from "@/components/ui/button";
import WorkoutStepsCard from "../steps-card";
import { tWorkoutResponse } from "@/ts/workouts";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { difficultyTypesSelect } from "@/lib/selectData";
import { sNewWorkout } from "@/zod/workouts";

export default function WorkoutCreateEditForm({
  workout,
  isEditing,
  isLoading,
}: {
  workout?: tWorkoutResponse;
  isEditing: boolean;
  isLoading: boolean;
}) {
  const insets = useSafeAreaInsets();

  const sheet = useRef<TrueSheet>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const workoutSteps = useWorkoutStore((state) => state.steps);
  const setWorkoutSteps = useWorkoutStore((state) => state.updateSteps);
  const form = useForm({
    defaultValues: {
      name: workout?.name || "",
      icon_emoji: workout?.icon_emoji || "🏋️",
      description: workout?.description || "",
      difficulty: workout?.difficulty || "easy",
      steps: workout?.steps || [],
    },
    resolver: zodResolver(sNewWorkout),
  });

  const present = async () => await sheet.current?.present();
  const dismiss = async () => await sheet.current?.dismiss();

  const handleSubmit = async (data: any) => {
    try {
      if (workoutSteps.length) {
        data.steps = workoutSteps;
      }

      const id = isEditing ? workout?.id : await workoutsProvider.create(data);

      if (isEditing) {
        await workoutsProvider.update(id, data);
      }

      // Update the list of goals
      queryClient.setQueryData<tServicesResponse[]>(["workouts"], (prev = []) =>
        isEditing
          ? prev.map((g) => (g.id === id ? { ...g, ...data } : g))
          : [...prev, { ...data, id }]
      );

      // If we edited, also update the single-goal cache
      if (isEditing) {
        queryClient.setQueryData<tServiceResponse>(
          ["workouts", id],
          (prev) => ({
            ...prev!,
            ...data,
          })
        );
      }

      toast.success(isEditing ? "Cíl upraven" : "Cíl vytvořen");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error(`Nepodařilo se ${isEditing ? "upravit" : "vytvořit"} cíl`);
    }
  };

  useEffect(() => {
    return () => {
      setWorkoutSteps([]);
    };
  }, []);

  useEffect(() => {
    if (workout?.steps) {
      setWorkoutSteps(workout.steps);
    }
  }, [workout]);

  return (
    <Form {...form}>
      {/* Edit description sheet */}
      <ServiceEditDescriptionSheet sheetRef={sheet} dismiss={dismiss} />
      <View
        style={{
          paddingBottom:
            Platform.OS === "ios" && false
              ? insets.bottom * 2.5
              : insets.bottom,
        }}
        className="flex-1 pt-0 mt-0"
      >
        <ScrollView contentContainerClassName="flex-1" className="flex-1 ">
          {/* Icon and title */}
          <CreateEditHeaderFormCard
            name="name"
            placeholder="Název služby"
            subHeader={
              <RHFNativeSelect
                name="difficulty"
                label="Obtížnost"
                options={difficultyTypesSelect("cs")}
              />
            }
          />
          <CardSeparator className="py-4" />

          {/* Description */}
          <TextCard
            title="Popis"
            description={form.getValues("description")}
            action={{
              text: "Upravit",
              onPress: present,
              type: "button",
            }}
          />
          <CardSeparator className="py-4" />

          {/* Steps */}
          <WorkoutStepsCard loading={isLoading} isEdit />
        </ScrollView>
        <View className="px-container py-4">
          <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button>
        </View>
      </View>
    </Form>
  );
}
