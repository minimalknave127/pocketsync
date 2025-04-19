import { View } from "react-native";
import { Text } from "../ui/text";

export default function EventTimelineItem() {
  return (
    <View className="flex-row gap-2">
      <View className="justify-center items-center">
        <View className="flex-1 bg-border w-[1px]"></View>
        <Text className="text-center tex-sm font-medium">8:00</Text>
        <View className="flex-1 bg-border w-[1px]"></View>
      </View>
      <View className="flex-1 border border-border p-4 rounded-2xl">
        <View className="flex-row justify-between">
          <Text className="font-medium">Tomáš Dostál</Text>
          <Text>9:30</Text>
        </View>
        <Text className="text-sm">Workout nevybrán</Text>
      </View>
    </View>
  );
}
