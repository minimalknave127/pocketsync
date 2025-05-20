import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RHFCheckbox from "@/components/ui/form/rhf-checkbox";
import RHFInput from "@/components/ui/form/rhf-input";
import RHFNativeSelect from "@/components/ui/form/rhf-native-select";
import { Text } from "@/components/ui/text";
import { reservationRepeatSelect } from "@/lib/selectData";
import { useReservationCreateStore } from "@/stores/reservation";
import { tNewReservation } from "@/ts/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  repeat_interval: z.enum([
    "none",
    "daily",
    "per day",
    "3 days",
    "1 week",
    "2 week",
  ]),
  repeat_count: z.coerce.number(),
  check_overlapping: z.coerce.boolean(),
});

export default function ReservationRepeatSheet({
  sheetRef,
  dismiss,
  data,
}: {
  sheetRef: any;
  dismiss: () => void;
  data: {
    repeat_count: tNewReservation["repeat_count"];
    repeat_interval: tNewReservation["repeat_interval"];
    check_overlapping: tNewReservation["check_overlapping"];
  };
}) {
  const reservation = useReservationCreateStore((state) => state.reservation);
  const setReservation = useReservationCreateStore(
    (state) => state.setReservation
  );

  const insets = useSafeAreaInsets();
  const form = useForm({
    defaultValues: {
      repeat_interval: data.repeat_interval || "none",
      repeat_count: data.repeat_count || 1,
      check_overlapping: data.check_overlapping || false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (data.repeat_interval === "none") {
      data.repeat_count = 1;
    }

    setReservation({
      ...reservation,
      repeat_interval: data.repeat_interval,
      repeat_count: data.repeat_count,
      check_overlapping: data.check_overlapping,
    });

    dismiss();
  };

  useEffect(() => {
    form.reset({
      repeat_interval: data.repeat_interval || "none",
      repeat_count: data.repeat_count || 1,
      check_overlapping: data.check_overlapping || false,
    });
  }, [data]);

  return (
    <TrueSheet ref={sheetRef} sizes={["auto", "large"]} cornerRadius={24}>
      <View className="px-container mt-6">
        <Text className="font-semibold text-foreground text-2xl">
          Opakování
        </Text>
      </View>
      <Form {...form}>
        <View className="flex-col gap-4 justify-between px-container mt-4">
          <RHFNativeSelect
            name="repeat_interval"
            options={reservationRepeatSelect("cs")}
            label="Doba opakování"
          />
          <RHFInput
            name="repeat_count"
            label="Počet opakování"
            keyboardType="numeric"
          />

          <RHFCheckbox
            size={18}
            name="check_overlapping"
            text="Zkontrolovat dostupnost opakování"
          />

          <View style={{ paddingBottom: insets.bottom }}>
            <Button onPress={form.handleSubmit(onSubmit)}>Uložit</Button>
          </View>
        </View>
      </Form>
    </TrueSheet>
  );
}
