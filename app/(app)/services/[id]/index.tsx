import DumbbellHand from "@/assets/icons/dumbell-hand";
import DetailsHeader from "@/components/cards/details-header";
import TextCard from "@/components/cards/text-card";
import StatusPill from "@/components/StatusPill";
import TextIconPill from "@/components/TextIconPill";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Clock10 } from "lucide-react-native";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServiceOptionsCard from "../components/service-options-card";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { servicesProvider } from "@/dbProvider";

export default function ServiceDetails() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await servicesProvider.getService(id as string);
      return res?.data?.data;
    },
    queryKey: ["services", id],
  });

  return (
    <Screen>
      <View
        style={{
          paddingBottom:
            Platform.OS === "ios" && false
              ? insets.bottom * 2.5
              : insets.bottom,
        }}
        className="flex-1 pt-0 mt-0"
      >
        <ScrollView contentContainerClassName="flex-1" className="flex-1">
          <View className="mt-4 gap-6">
            {/* Header */}
            <DetailsHeader
              loading={isLoading}
              title={
                <View className="flex-row items-center gap-4">
                  <Text className="text-2xl font-semibold capitalize">
                    Hubnutí
                  </Text>
                  <StatusPill text="Aktivní" variant="success" />
                </View>
              }
              icon="🎧"
              classNames={{
                iconWrapper: "bg-transparent",
                textIcon: "text-6xl",
              }}
              descripton={
                <>
                  <TextIconPill icon={Clock10} text={"60 minut"} />
                  <TextIconPill icon={<DumbbellHand />} text={"20 cviků"} />
                </>
              }
              separator
            />

            {/* Description */}
            <TextCard
              loading={isLoading}
              title="Popis"
              description="Kondiční trénink zaměření na zeny"
              separator
            />

            <ServiceOptionsCard loading={isLoading} />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
