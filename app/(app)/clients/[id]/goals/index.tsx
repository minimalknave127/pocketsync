import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { goalsProvider } from "@/dbProvider";
import { tGoalsRes } from "@/ts/goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import GoalCard from "./goal-card";

export default function ClientGoalsEdit() {
  const { id: clientId } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const { data: goals, isLoading }: { data: tGoalsRes[]; isLoading: boolean } =
    useQuery({
      queryKey: ["clients-goals", clientId],
      queryFn: async () => {
        const res = await goalsProvider.getGoals();
        return res?.data?.data;
      },
      enabled: !!clientId,
    });

  const handleUpdateOrder = async ({
    from,
    to,
  }: ReorderableListReorderEvent) => {
    try {
      // Reorder items
      const newOrdered = reorderItems(goals, from, to).map((item, index) => ({
        ...item,
        order: index,
      }));

      // Update query data
      queryClient.setQueryData(["clients-goals", clientId], newOrdered);

      // Update DB
      await goalsProvider.updateOrder(newOrdered);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<tGoalsRes>) => {
    return <GoalCard clientId={clientId as string} item={item} />;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Screen className="pt-0 mt-0 flex-1">
      <Text className="font-semibold text-xl px-container">Moje cíle</Text>

      <ReorderableList
        data={goals}
        onReorder={(data) => handleUpdateOrder(data)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View className="px-container mt-4">
        <Link href={`/clients/${clientId}/goals/edit/new`} asChild>
          <Button>Přidat cíl</Button>
        </Link>
      </View>
    </Screen>
  );
}
