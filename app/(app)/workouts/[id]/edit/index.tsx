import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import CardSeparator from "@/components/ui/card-separator";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { Text } from "@/components/ui/text";
import { difficultyTypesSelect } from "@/lib/selectData";
import { tWorkoutResponse, tWorkoutsResponse } from "@/ts/workouts";
import { newWorkoutSchema } from "@/zod/workouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Trash } from "lucide-react-native";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function CreateEditWorkout() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      steps: [],
    },
    resolver: zodResolver(newWorkoutSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const handleSubmit = async (data: any) => {
    try {
      const { steps, ...payload } = data;
      //   const id = isEditing ? workout!.id : await goalsProvider.create(payload);

      if (isEditing) {
        // await goalsProvider.update(id, payload);
      }

      // Update the list of goals
      queryClient.setQueryData<tWorkoutsResponse[]>(["workouts"], (prev = []) =>
        isEditing
          ? prev.map((g) => (g.id === id ? { ...g, ...payload } : g))
          : [...prev, { ...payload, id }]
      );

      // If we edited, also update the single-goal cache
      if (isEditing) {
        queryClient.setQueryData<tWorkoutResponse>(["workout", id], (prev) => ({
          ...prev!,
          ...payload,
        }));
      }

      toast.success(isEditing ? "Cíl upraven" : "Cíl vytvořen");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error(`Nepodařilo se ${isEditing ? "upravit" : "vytvořit"} cíl`);
    }
  };

  const isEditing = id !== "new";

  return (
    <View
      style={{
        paddingBottom:
          Platform.OS === "ios" && false ? insets.bottom * 2.5 : insets.bottom,
      }}
      className="flex-1 pt-0 mt-0"
    >
      <ScrollView contentContainerClassName="flex-1" className="flex-1 ">
        <Form {...form}>
          <View className="mt-4 flex flex-row gap-5 px-container ">
            <View className="w-[70px] h-[70px] rounded-3xl bg-muted self-center flex items-center justify-center"></View>
            <View className="flex-1">
              <RHFInput
                containerClassName="border-0 border-b mx-container"
                name="name"
                placeholder="Název cviku"
              />
            </View>
          </View>
          <CardSeparator className="py-4" />
          <View className="px-container gap-4">
            <RHFInput
              name="description"
              placeholder="Popis cviku"
              label="Popis"
            />
            <RHFNativeSelect
              name="difficulty"
              label="Složitost"
              options={difficultyTypesSelect("cs")}
            />
          </View>
          <CardSeparator className="py-4" />

          <View className="px-container gap-7 pb-40 ">
            <Text className="font-semibold text-xl">Cviky</Text>
            <View className="gap-2 ">
              {fields.map((field, index) => (
                <View key={field.id} className="flex flex-row gap-2">
                  <RHFInput
                    name={`steps.${index}.name`}
                    placeholder="Název cviku"
                    className="flex-1"
                  />
                  <Button
                    onPress={() => remove(index)}
                    variant="outline"
                    className="h-full "
                    size="icon"
                  >
                    <Icon
                      icon={Trash}
                      width={18}
                      height={18}
                      className="text-destructive"
                    />
                  </Button>
                </View>
              ))}
              <Button
                onPress={() =>
                  append(
                    { name: "" },
                    {
                      shouldFocus: false,
                    }
                  )
                }
                variant="secondary"
                size="sm"
              >
                Přidat cvik
              </Button>
            </View>
          </View>
        </Form>
      </ScrollView>
      <View className="px-container py-4">
        <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button>
      </View>
    </View>
  );
}
