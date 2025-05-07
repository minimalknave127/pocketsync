import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { workoutsProvider } from "@/dbProvider";
import { tWorkoutStep } from "@/ts/workouts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import WorkoutStep from "../../components/workout-step-card";

export default function WorkoutStepsEdit() {
  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const {
    data: options,
    isLoading,
  }: { data: tWorkoutStep[]; isLoading: boolean } = useQuery({
    queryKey: ["workout-steps", id],
    queryFn: async () => {
      const res = await workoutsProvider.getWorkout(id as string, true);
      return res?.data?.data;
    },
    enabled: !!id,
  });

  const handleUpdateOrder = async ({
    from,
    to,
  }: ReorderableListReorderEvent) => {
    try {
      // Reorder items
      const newOrdered = reorderItems(options, from, to).map((item, index) => ({
        ...item,
        order: index,
      }));

      // Update query data
      queryClient.setQueryData(["workout-steps", id], newOrdered);

      // Update DB
      await workoutsProvider.updateOrder(newOrdered);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<tWorkoutStep>) => {
    return <WorkoutStep title={item.name} type={item.type} />;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Screen className="pt-0 mt-0 flex-1">
      <Text className="font-semibold text-xl px-container">Cviky</Text>

      <ReorderableList
        data={options}
        onReorder={(data) => handleUpdateOrder(data)}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
      <View className="px-container mt-4">
        <Link href={`/services/${id}/edit`} asChild>
          <Button>Přidat cvik</Button>
        </Link>
      </View>
    </Screen>
  );
}
