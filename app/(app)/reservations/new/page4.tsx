import DetailsHeader from "@/components/cards/details-header";
import ProgressBar from "@/components/progress-bar";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { useReservationCreateStore } from "@/stores/reservation";
import React, { useEffect } from "react";
import { View } from "react-native";
import CardSeparator from "@/components/ui/card-separator";
import ServiceCard from "../../services/components/service-card";
import ReservationTimesPreview from "./components/reservation-times-preview";
import { Icon } from "@/components/icon";
import { Coins } from "lucide-react-native";
import ReservationRepeat from "./components/reservation-repeat";
import { Button } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { reservationsProvider } from "@/dbProvider";
import { useRouter } from "expo-router";

export default function ReservationOverview() {
  const insets = useSafeAreaInsets();
  const reservation = useReservationCreateStore((state) => state.reservation);
  console.log("reservation", reservation);

  const clearReservation = useReservationCreateStore(
    (state) => state.clearReservation
  );

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await reservationsProvider.create(reservation);

      toast.success("Rezervace vytvořena");

      router.push("/(app)/(tabs)");
    } catch (error) {
      console.log(error);
      toast.error("Nepodařilo se vytvořit rezervaci");
    }
  };
  useEffect(() => {
    return () => {
      clearReservation();
    };
  }, []);
  return (
    <>
      <Screen>
        <ProgressBar percentage={100} />
        <View>
          <View className="flex-col gap-4">
            <DetailsHeader
              title={reservation.customer.username}
              descripton={
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm">{reservation.customer.email}</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <Text className="text-sm">
                    {reservation.customer.reservations_count} tréninků
                  </Text>
                </View>
              }
              icon={"🎸"}
            />
            <View className="w-full h-[1px] bg-slate-100" />
            <ServiceCard
              href="reservations/new/page2"
              service={reservation.service}
            />
          </View>

          <CardSeparator className="mb-4" />

          <ReservationTimesPreview
            date={reservation.date}
            duration={reservation.duration}
          />
          <CardSeparator className="my-4" />
          <ReservationRepeat
            repeat_count={reservation.repeat_count}
            repeat_interval={reservation.repeat_interval}
            check_overlapping={reservation.check_overlapping}
          />
          <CardSeparator className="my-4" />

          <View className="px-container flex-col gap-2">
            <View className="flex-row gap-2">
              <Icon
                icon={Coins}
                width={18}
                height={18}
                className=" text-foreground"
              />
              <Text className="font-semibold">Cena</Text>
            </View>

            <Text className="font-medium text-slate-600 text-sm">
              {reservation.service.price} Kč
            </Text>
          </View>
        </View>
      </Screen>
      <View className="px-container" style={{ paddingBottom: insets.bottom }}>
        <Button onPress={onSubmit}>Uložit</Button>
      </View>
    </>
  );
}
