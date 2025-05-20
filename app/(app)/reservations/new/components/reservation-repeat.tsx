import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { ChevronRight, Repeat } from "lucide-react-native";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import ReservationRepeatSheet from "./reservation-repeat-sheet";
import { tNewReservation } from "@/ts/reservation";
import { reservationRepeatData } from "@/lib/selectData";

export default function ReservationRepeat(data: {
  repeat_count: tNewReservation["repeat_count"];
  repeat_interval: tNewReservation["repeat_interval"];
  check_overlapping: tNewReservation["check_overlapping"];
}) {
  const sheet = useRef<TrueSheet>(null);

  const present = async () => await sheet.current?.present();
  const dismiss = async () => await sheet.current?.dismiss();

  return (
    <>
      <ReservationRepeatSheet sheetRef={sheet} dismiss={dismiss} data={data} />

      <Pressable
        className="flex flex-row justify-between items-center px-container"
        onPress={present}
      >
        <View className=" flex-col gap-2">
          <View className="flex-row gap-2">
            <Icon
              icon={Repeat}
              width={18}
              height={18}
              className=" text-foreground"
            />
            <Text className="font-semibold">Opakování</Text>
          </View>

          <Text className="font-medium text-slate-600 text-sm">
            {reservationRepeatData[data.repeat_interval]["cs"]}{" "}
            {data.repeat_interval !== "none" && `x ${data.repeat_count}`}
          </Text>
        </View>

        <Icon
          icon={ChevronRight}
          width={24}
          height={24}
          className="text-muted-foreground"
        />
      </Pressable>
    </>
  );
}
