import { servicesProvider } from "@/dbProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import WorkoutCreateEditForm from "../../components/create-edit/workout-create-edit-form";

export default function CreateEditService() {
  const { id } = useLocalSearchParams();
  const isEditing = id !== "new";

  const { data: workout, isLoading } = useQuery({
    queryKey: ["workout", id],
    queryFn: async () => {
      const res = await servicesProvider.getService(id as string);
      return res.data?.data;
    },
    enabled: isEditing,
  });

  if (isLoading && isEditing) return null;

  return (
    <WorkoutCreateEditForm
      workout={workout}
      isEditing={isEditing}
      isLoading={isLoading}
    />
  );
}
