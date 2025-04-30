import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { tGoalsRes } from "@/ts/goals";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { Edit2Icon } from "lucide-react-native";
import { Platform, TouchableOpacity, View } from "react-native";
import { useIsActive, useReorderableDrag } from "react-native-reorderable-list";

const GoalCard = ({
  clientId,
  item,
}: {
  clientId: string;
  item: tGoalsRes;
}) => {
  const drag = useReorderableDrag();
  const isActive = useIsActive();

  return (
    <TouchableOpacity
      className="px-container flex-row items-center justify-between py-4 active:bg-muted/20"
      activeOpacity={1}
      onLongPress={() => {
        drag();
        if (Platform.OS === "ios") {
          Haptics.selectionAsync();
        }
      }}
      disabled={isActive}
    >
      <View className="flex-row gap-4">
        <Text className="text-2xl">{item.icon_emoji}</Text>
        <View>
          <Text className="font-medium mb-1">{item.name}</Text>
          <Text className="text-sm text-muted-foreground">
            {format(new Date(item.complete_to_date), "dd.MM.yyyy")}
          </Text>
        </View>
      </View>
      <Link
        href={`/clients/${clientId}/goals/edit/${item.id}?nested=true`}
        asChild
      >
        <Button variant="ghost" size="icon">
          <Icon
            icon={Edit2Icon}
            className="text-muted-foreground/50 w-4 h-4"
            width={16}
            height={16}
          />
        </Button>
      </Link>
    </TouchableOpacity>
  );
};

export default GoalCard;
