import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { SearchIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServiceCard from "./components/service-card";
import { FlashList } from "@shopify/flash-list";
import { tWorkoutsResponse } from "@/ts/workouts";

const services: tWorkoutsResponse[] = [
  {
    id: "1",
    name: "Ramena",
    difficulty: "easy",
    total_duration: 600,
    notes: "Horni koncetiny",
    steps_count: 7,
  },
  {
    id: "2",
    name: "Nohy",
    difficulty: "medium",
    total_duration: 3600,
    notes: "Kondicni trenink noh",
    steps_count: 10,
  },
];

export default function ServicesPage() {
  const insets = useSafeAreaInsets();

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
        <FlashList
          estimatedItemSize={80}
          className="flex-1"
          contentContainerClassName="mt-6"
          data={services}
          ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
          renderItem={({ item }) => {
            return <ServiceCard service={item} />;
          }}
        />
      </Screen>
      <View
        className="absolute bottom-0 right-0 w-full flex items-center justify-center"
        style={{ paddingBottom: insets.bottom }}
      >
        <Button className="rounded-full">Vyvořit službu</Button>
      </View>
    </>
  );
}
