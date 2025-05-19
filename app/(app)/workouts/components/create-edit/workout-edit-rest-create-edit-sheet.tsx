import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { tWorkoutStepStoreOption, useWorkoutStore } from "@/stores/workout";
import { tNewWorkoutStepEntry } from "@/ts/workouts";
import { sWorkoutStepSchema } from "@/zod/workouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { XIcon } from "lucide-react-native";
import React, { RefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, View } from "react-native";

export default function WorkoutEditRestCreateEditSheet({
  close,
  selected,
  sheetRef,
  handleSubmit,
}: {
  sheetRef: RefObject<TrueSheet>;
  close: () => void;
  selected?: tWorkoutStepStoreOption;
  handleSubmit?: (data: tNewWorkoutStepEntry) => Promise<void>;
}) {
  return (
    <TrueSheet ref={sheetRef} sizes={["auto"]} cornerRadius={24}>
      <Screen className="flex-col justify-between ">
        <FormComponent
          handleSubmit={handleSubmit}
          selected={selected}
          close={close}
        />
      </Screen>
    </TrueSheet>
  );
}

const FormComponent = ({ selected, close, handleSubmit }) => {
  const setWorkoutSteps = useWorkoutStore((state) => state.updateSteps);
  const workoutSteps = useWorkoutStore((state) => state.steps);

  const form = useForm({
    defaultValues: {
      duration: selected?.duration ? selected.duration : 10,
    },
    resolver: zodResolver(sWorkoutStepSchema.pick({ duration: true })),
  });

  const onSubmit = async (data: any) => {
    data["type"] = "rest";

    if (handleSubmit) {
      await handleSubmit(data);
      form.reset({ duration: 10 });
      close();
      return;
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
    form.reset({ duration: 10 });
    close();
  };

  useEffect(() => {
    if (selected) {
      form.reset({ duration: selected.duration });
    }
  }, [selected, form]);

  return (
    <>
      <View>
        <View className={cn(`flex-row items-center justify-end px-container `)}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onPress={close}
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
          <Text className="font-semibold text-2xl  mt-4">Upravte Pauzu</Text>
        </View>

        <View className="px-container">
          <Form {...form}>
            <RHFInput
              name="duration"
              label="Doba pauzy"
              keyboardType="numeric"
              endContent="sekund"
              className="my-4"
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
