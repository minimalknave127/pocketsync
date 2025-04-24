import { View } from "react-native";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";

export default function EventTimelineItem({
  index,
  length,
}: {
  index: number;
  length: number;
}) {
  return (
    <View className="flex-row gap-2">
      <View className="justify-center items-center">
        <View
          className={cn("flex-1 bg-border w-[1px]", index === 0 && "w-0")}
        ></View>
        <Text className="text-center tex-sm font-medium">8:00</Text>
        <View
          className={cn(
            "flex-1 bg-border w-[1px]",
            index === length - 1 && "w-0"
          )}
        ></View>
      </View>
      <View className="py-2 flex-1">
        <View className="flex-1 border border-border p-4 rounded-2xl">
          <View className="flex-row justify-between">
            <Text className="font-medium">Tomáš Dostál</Text>
            <Text>9:30</Text>
          </View>
          <Text className="text-sm">Workout nevybrán</Text>
        </View>
      </View>
    </View>
  );
}
