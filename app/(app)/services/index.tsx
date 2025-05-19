import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Screen } from "@/components/ui/screen";
import { servicesProvider } from "@/dbProvider";
import { tServicesResponse } from "@/ts/services";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServiceCard from "./components/service-card";
import ServiceWorkoutSkeleton from "@/components/skeletons/service-workout-skeleton";
import { Link } from "expo-router";

export default function ServicesPage() {
  const insets = useSafeAreaInsets();

  const { data, isLoading }: { data: tServicesResponse[]; isLoading: boolean } =
    useQuery({
      queryFn: async () => {
        const res = await servicesProvider.getServices();
        return res?.data?.data;
      },
      queryKey: ["services"],
    });
  console.log("data", data);
  return (
    <>
      <Screen>
        <View className="px-container">
          <Input
            containerClassName="bg-muted"
            startContent={
              <Icon icon={SearchIcon} className="text-foreground/70" />
            }
            placeholder="Vyhledávání"
          />
        </View>
        {isLoading ? (
          <View className="px-container mt-4">
            {[...Array(3)].map((_, index) => (
              <ServiceWorkoutSkeleton key={index} />
            ))}
          </View>
        ) : (
          <FlashList
            estimatedItemSize={80}
            className="flex-1"
            contentContainerClassName="mt-6"
            data={data}
            ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
            renderItem={({ item }) => {
              return <ServiceCard service={item} />;
            }}
          />
        )}
      </Screen>
      <View
        className="absolute bottom-0 right-0 w-full flex items-center justify-center"
        style={{ paddingBottom: insets.bottom }}
      >
        <Link href="/services/edit/new" asChild>
          <Button className="rounded-full">Vyvořit službu</Button>
        </Link>
      </View>
    </>
  );
}
