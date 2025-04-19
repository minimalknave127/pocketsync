import { View } from "react-native";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";

export default function HomeCalendarItem({
  day,
  isActive,
}: {
  day: Date;
  isActive?: boolean;
}) {
  // get weekday from date
  const date = new Date(day);
  const weekday = date.toLocaleDateString("cs-CZ", { weekday: "short" });
  const dayNumber = date.getDate();
  return (
    <View className="p-1.5 border rounded-full border-muted me-2">
      <View
        className={cn(
          "w-12 h-12 justify-center items-center rounded-full",
          isActive && "bg-primary"
        )}
      >
        <Text
          className={cn(
            "font-semibold text-lg",
            isActive && "text-primary-foreground"
          )}
        >
          {dayNumber}
        </Text>
      </View>
      <Text className="text-sm text-center mt-1 capitalize">{weekday}</Text>
    </View>
  );
}
