import CreateEditHeaderFormCard from "@/components/cards/form/edit-header";
import TextCard from "@/components/cards/text-card";
import { Button } from "@/components/ui/button";
import CardSeparator from "@/components/ui/card-separator";
import { Form } from "@/components/ui/form";
import { tWorkoutResponse, tWorkoutsResponse } from "@/ts/workouts";
import { sNewServiceSchema } from "@/zod/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import ServiceEditDescriptionSheet from "../../components/create-edit/service-edit-description-sheet";
import ServiceEditMainInfo from "../../components/create-edit/service-edit-main-info";
import ServiceEditSheet from "../../components/create-edit/service-edit-options";
import { useServiceStore } from "@/stores/service";
import { tServiceResponse, tServicesResponse } from "@/ts/services";
import { servicesProvider } from "@/dbProvider";

export default function CreateEditService() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const isEditing = id !== "new";

  const sheet = useRef<TrueSheet>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const serviceOptions = useServiceStore((state) => state.options);
  const setServiceOptions = useServiceStore((state) => state.updateOptions);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await servicesProvider.getService(id as string);
      return res.data?.data;
    },
    enabled: isEditing,
  });

  const form = useForm({
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      icon_emoji: service?.icon_emoji || "🏋️",
      options: service?.options || [],
    },
    resolver: zodResolver(sNewServiceSchema),
  });

  const present = async () => await sheet.current?.present();
  const dismiss = async () => await sheet.current?.dismiss();

  const handleSubmit = async (data: any) => {
    try {
      if (serviceOptions.length) {
        data.options = serviceOptions;
      }

      const id = isEditing ? service?.id : await servicesProvider.create(data);

      if (isEditing) {
        // await goalsProvider.update(id, payload);
      }

      // Update the list of goals
      queryClient.setQueryData<tServicesResponse[]>(["services"], (prev = []) =>
        isEditing
          ? prev.map((g) => (g.id === id ? { ...g, ...data } : g))
          : [...prev, { ...data, id }]
      );

      // If we edited, also update the single-goal cache
      if (isEditing) {
        queryClient.setQueryData<tServiceResponse>(["service", id], (prev) => ({
          ...prev!,
          ...data,
        }));
      }

      toast.success(isEditing ? "Cíl upraven" : "Cíl vytvořen");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error(`Nepodařilo se ${isEditing ? "upravit" : "vytvořit"} cíl`);
    }
  };

  useEffect(() => {
    return () => {
      setServiceOptions([]);
    };
  }, []);

  return (
    <>
      <Form {...form}>
        {/* Edit description sheet */}
        <ServiceEditDescriptionSheet sheetRef={sheet} dismiss={dismiss} />
        {/* <ServiceEditOptionsSheet /> */}
        <View
          style={{
            paddingBottom:
              Platform.OS === "ios" && false
                ? insets.bottom * 2.5
                : insets.bottom,
          }}
          className="flex-1 pt-0 mt-0"
        >
          <ScrollView contentContainerClassName="flex-1" className="flex-1 ">
            {/* Icon and title */}
            <CreateEditHeaderFormCard name="name" placeholder="Název služby" />
            <CardSeparator className="py-4" />

            {/* Main info - price and duration */}
            <ServiceEditMainInfo loading={isLoading} />
            <CardSeparator className="py-4" />

            {/* Description */}
            <TextCard
              title="Popis"
              description={form.getValues("description")}
              action={{
                text: "Upravit",
                onPress: present,
                type: "button",
              }}
            />
            <CardSeparator className="py-4" />

            {/* Options */}
            <ServiceEditSheet loading={isLoading} fields={serviceOptions} />
          </ScrollView>
          <View className="px-container py-4">
            <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button>
          </View>
        </View>
      </Form>
    </>
  );
}
