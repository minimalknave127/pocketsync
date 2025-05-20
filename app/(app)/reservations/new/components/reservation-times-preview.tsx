import ServiceCard from "@/app/(app)/services/components/service-card";
import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";
import { addSeconds, format } from "date-fns";
import { Link } from "expo-router";
import { ChevronRight, Clock10 } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function ReservationTimesPreview({
  date,
  duration,
}: {
  date: Date;
  duration: number;
}) {
  const toDate = new Date(addSeconds(date, duration));
  return (
    <View className="flex flex-col gap-4 ">
      <Link href="reservations/new/page3">
        <View className="px-container flex-col gap-2">
          <View className="flex-row gap-2">
            <Icon
              icon={Clock10}
              width={18}
              height={18}
              className=" text-foreground"
            />
            <Text className="font-semibold">Začátek</Text>
          </View>

          <Text className="font-medium text-slate-600 text-sm">
            {format(new Date(date), "d.MMMM, HH:mm")}
          </Text>
        </View>
      </Link>
      <View className="w-full h-[1px] bg-slate-100" />

      <View className="px-container flex-col gap-2">
        <View className="flex-row gap-2">
          <Icon
            icon={Clock10}
            width={18}
            height={18}
            className=" text-foreground"
          />
          <Text className="font-semibold">Konec</Text>
        </View>

        <Text className="font-medium text-slate-600 text-sm">
          {format(new Date(toDate), "d.MMMM, HH:mm")}
        </Text>
      </View>
    </View>
  );
}
