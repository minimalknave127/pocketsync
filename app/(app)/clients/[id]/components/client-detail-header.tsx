import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function ClientDetailHeader() {
  return (
    <View className="px-container flex-row items-center gap-6">
      <Avatar alt="ts" className="w-20 h-20">
        <AvatarFallback>
          <Text className="text-2xl font-medium">TS</Text>
        </AvatarFallback>
      </Avatar>
      <View>
        <Text className="text-xl font-semibold">Toje Randál</Text>
        <View className="flex-row items-center gap-4 mt-2.5">
          <View>
            <Text className="font-semibold">20</Text>
            <Text className="text-xs">tréninků</Text>
          </View>
          <View className="w-[1px] h-full bg-muted-foreground/20" />
          <View>
            <Text className="font-semibold">20</Text>
            <Text className="text-xs">tréninků</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
