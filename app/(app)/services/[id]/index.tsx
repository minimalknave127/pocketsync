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

export default function ServiceDetails() {
  const insets = useSafeAreaInsets();

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
              title="Popis"
              description="Kondiční trénink zaměření na zeny"
              separator
            />

            <ServiceOptionsCard />
          </View>
        </ScrollView>
        <View className="px-container py-4">
          {/* <Button onPress={form.handleSubmit(handleSubmit)}>Uložit</Button> */}
        </View>
      </View>
    </Screen>
  );
}
