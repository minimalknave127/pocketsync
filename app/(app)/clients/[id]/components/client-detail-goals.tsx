import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { goalsProvider } from "@/dbProvider";
import { tGoalsRes } from "@/ts/goals";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, useLocalSearchParams } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import { Dimensions, Pressable, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

export default function ClientDetailGoals() {
  const { id: clientId } = useLocalSearchParams();

  const { data: goals, isLoading }: { data: tGoalsRes[]; isLoading: boolean } =
    useQuery({
      queryKey: ["clients-goals", clientId],
      queryFn: async () => {
        const res = await goalsProvider.getGoals();
        return res?.data?.data;
      },
      enabled: !!clientId,
    });

  return (
    <View className="px-container">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold">Moje cíle</Text>
        <Link href={`/clients/${clientId}/goals`} asChild>
          <Button variant="link">Upravit</Button>
        </Link>
      </View>
      <View>
        {isLoading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              flexDirection="column"
              alignItems="center"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  width={width * 0.9}
                  height={70}
                  borderRadius={10}
                  marginBottom={12}
                />
              ))}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          goals?.map((goal, index) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              clientId={clientId as string}
              isLast={goals.length === index + 1}
            />
          ))
        )}
      </View>
    </View>
  );
}

export function GoalItem({
  goal,
  isLast,
  clientId,
}: {
  goal: tGoalsRes;
  isLast: boolean;
  clientId: string;
}) {
  return (
    <>
      <Link href={`/clients/${clientId}/goals/edit/${goal.id}`} asChild>
        <Pressable className="py-4 flex-row gap-4 justify-between active:bg-muted/20">
          <View className="flex-row gap-4">
            <Text className="text-2xl">{goal.icon_emoji}</Text>
            <View>
              <Text className="font-medium mb-1">{goal.name}</Text>
              <Text className="text-sm text-muted-foreground">
                {format(new Date(goal.complete_to_date), "dd.MM.yyyy")}
              </Text>
            </View>
          </View>
          <Icon icon={ChevronRightIcon} className="text-muted-foreground/50" />
        </Pressable>
      </Link>
      {!isLast && <View className="h-0.5 bg-muted" />}
    </>
  );
}
