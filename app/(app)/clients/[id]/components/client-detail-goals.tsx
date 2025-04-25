import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link, useLocalSearchParams } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

export default function ClientDetailGoals() {
  const { id } = useLocalSearchParams();
  return (
    <View className="px-container">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold">Moje cíle</Text>
        <Link href={`/clients/${id}/goals`} asChild>
          <Button variant="link">Upravit</Button>
        </Link>
      </View>
      <View>
        <GoalItem />
        <View className="h-0.5 bg-muted" />
        <GoalItem />
      </View>
    </View>
  );
}

export function GoalItem() {
  return (
    <Pressable className="py-4 flex-row gap-4 justify-between active:bg-muted/20">
      <View className="flex-row gap-4">
        <Text className="text-2xl">🏋️</Text>
        <View>
          <Text className="font-medium mb-1">Zhubnout 10 kg</Text>
          <Text className="text-sm text-muted-foreground">24.2.2025</Text>
        </View>
      </View>
      <Icon icon={ChevronRightIcon} className="text-muted-foreground/50" />
    </Pressable>
  );
}
