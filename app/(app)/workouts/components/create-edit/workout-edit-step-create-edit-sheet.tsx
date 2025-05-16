import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { tServStoreOption, useServiceStore } from "@/stores/service";
import { tWorkoutStepStoreOption, useWorkoutStore } from "@/stores/workout";
import { sWorkoutStepSchema } from "@/zod/workouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, View } from "react-native";

export default function WorkoutEditStepCreateEditSheet({
  isOpen,
  setIsOpen,
  selected,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  selected?: tWorkoutStepStoreOption;
}) {
  return (
    <Modal visible={isOpen} animationType="slide">
      <Screen className="flex-col justify-between">
        <FormComponent selected={selected} setIsOpen={setIsOpen} />
      </Screen>
    </Modal>
  );
}

const FormComponent = ({ selected, setIsOpen }) => {
  const [isTimeStep, setIsTimeStep] = useState<boolean>(false);

  const setWorkoutSteps = useWorkoutStore((state) => state.updateSteps);
  const workoutSteps = useWorkoutStore((state) => state.steps);

  const form = useForm({
    defaultValues: {
      name: selected?.name || "",
      description: selected?.description || "",
      exerciseType: selected?.exerciseType || "time",
      exerciseDuration: selected?.exerciseDuration || 10,
      duration: selected?.duration || 1,
      repeatCount: selected?.repeatCount || 1,
      restTime: selected?.restTime || 30,
    },
    resolver: zodResolver(sWorkoutStepSchema),
  });

  const onSubmit = (data: any) => {
    if (data.exerciseType === "time") {
      data.duration =
        data.exerciseDuration * data.repeatCount +
        data.restTime * (data.repeatCount - 1);
    }

    if (!selected) {
      const newOption: tWorkoutStepStoreOption = {
        ...data,
        id: `custom-${workoutSteps.length + 1}`,
        order: workoutSteps.length,
      };
      setWorkoutSteps([...workoutSteps, newOption]);
    } else {
      const newOptions = workoutSteps.map((option) =>
        option.id === selected.id ? { ...option, ...data } : option
      );
      setWorkoutSteps(newOptions);
    }
    setIsOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (form.watch("exerciseType") === "time") {
      setIsTimeStep(true);
    } else setIsTimeStep(false);
  }, [form.watch("exerciseType")]);

  return (
    <>
      <View>
        <View className={cn(`flex-row items-center justify-end px-container `)}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onPress={() => setIsOpen(false)}
          >
            <Icon
              icon={XIcon}
              width={18}
              height={18}
              className="text-foreground"
            />
          </Button>
        </View>
        <View className="flex-row items-center justify-between px-container">
          <Text className="font-semibold text-2xl  mt-4">Upravte cvik</Text>
        </View>

        <View className="px-container">
          <Form {...form}>
            <RHFInput
              name="name"
              label="Název"
              placeholder="Zadejte název"
              className="mt-4"
            />
            <RHFInput
              name="description"
              label="Popis"
              placeholder="Zadejte popis"
              className="mt-4"
              multiline
              numberOfLines={4}
              inputClassName="h-24"
              containerClassName="!h-24"
            />

            <RHFNativeSelect
              name="exerciseType"
              label="Typ cviku"
              options={[
                { value: "count", label: "Na počet opakování" },
                { value: "time", label: "Na čas" },
              ]}
            />

            <RHFInput
              name="repeatCount"
              label="Počet opakování"
              className="mt-4"
            />

            {/* {isTimeStep ? ( */}
            <RHFInput
              name="exerciseDuration"
              keyboardType="numeric"
              label={isTimeStep ? "Délka opakování" : "Počet cviků"}
              endContent={isTimeStep ? "sekund" : undefined}
              className="mt-4"
            />
            {/* ) : (
              <RHFInput
                name="exerciseCount"
                label="Počet cviků"
                className="mt-4"
              />
            )} */}

            {!isTimeStep && (
              <RHFInput
                name="duration"
                label="Přepokladaná doba cviku"
                endContent="sekund"
                className="mt-4"
              />
            )}

            <RHFInput
              name="restTime"
              label="Odpočinek"
              endContent="sekund"
              className="mt-4"
            />
          </Form>
        </View>
      </View>

      <View className="px-container">
        <Button onPress={form.handleSubmit(onSubmit)}>Potvrdit</Button>
      </View>
    </>
  );
};
