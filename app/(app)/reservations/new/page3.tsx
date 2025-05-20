import ProgressBar from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { reservationsProvider } from "@/dbProvider";
import { generateTimeSlots } from "@/lib/generate-reservation-times";
import { cn } from "@/lib/utils";
import { useReservationCreateStore } from "@/stores/reservation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SeelctService() {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const reservation = useReservationCreateStore((state) => state.reservation);
  const setReservation = useReservationCreateStore(
    (state) => state.setReservation
  );

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", date],
    queryFn: async () => {
      const reservations = await reservationsProvider.getReservations();
    },
  });

  const timeSlots = generateTimeSlots(
    new Date("2025-06-22T08:00:00.000Z"),
    new Date("2025-06-22T18:00:00.000Z"),
    60,
    []
  );

  const morningTimes = timeSlots.filter(
    (time) => new Date(time.start).getHours() < 12
  );
  const afternoonTimes = timeSlots.filter(
    (time) => new Date(time.start).getHours() >= 12
  );

  const onSelect = (time) => {
    setSelectedTime(time);

    const [h, m] = time?.split(":");
    const selectedDateTime = new Date(date.setHours(+h, +m));

    setReservation({ ...reservation, date: selectedDateTime });

    router.push("/reservations/new/page4");
  };

  return (
    <>
      <Screen>
        <ProgressBar percentage={75} />

        {/* Dates */}

        <View className="mt-6 flex flex-col gap-5 px-container">
          <View className="flex flex-col gap-2">
            <Text className="text-sm font-medium">Dopoledne</Text>
            <View className="flex flex-row flex-wrap gap-2">
              {morningTimes.map((time, index) => (
                <TimePill
                  key={index}
                  time={format(new Date(time.start), "HH:mm")}
                  setSelected={onSelect}
                  selected={selectedTime}
                />
              ))}
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-sm font-medium">Odpoledne</Text>
            <View className="flex flex-row flex-wrap gap-2 w-full ">
              {afternoonTimes.map((time, index) => (
                <TimePill
                  key={index}
                  time={format(new Date(time.start), "HH:mm")}
                  setSelected={onSelect}
                  selected={selectedTime}
                />
              ))}
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
}

const TimePill = ({
  time,
  selected,
  setSelected,
}: {
  time: string;
  selected: string | null;
  setSelected: (time: string) => void;
}) => {
  const isActive = selected === time;
  return (
    <TouchableOpacity
      onPress={() => setSelected(time)}
      className={cn(
        "border border-slate-200 rounded-full px-3 py-1",
        isActive && "border-transparent bg-primary"
      )}
    >
      <Text
        className={cn(
          "text-muted-foreground text-sm",
          isActive && "text-primary-foreground"
        )}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};
