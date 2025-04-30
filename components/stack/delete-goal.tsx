import { goalsProvider } from "@/dbProvider";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { Alert } from "react-native";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { tGoalsRes } from "@/ts/goals";

export default function DeleteGoal({ route }: { route: any }) {
  const { goal: id, id: clientId } = route.params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const handlePress = () => {
    Alert.alert("Delete goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  };

  const handleDelete = async () => {
    try {
      await goalsProvider.delete(id as string);

      queryClient.setQueryData<tGoalsRes[]>(
        ["clients-goals", clientId],
        (prev = []) => prev.filter((g) => g.id !== id)
      );

      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="ghost" size="icon" onPress={handlePress}>
      <Icon icon={Trash2} width={20} height={20} className="text-destructive" />
    </Button>
  );
}
