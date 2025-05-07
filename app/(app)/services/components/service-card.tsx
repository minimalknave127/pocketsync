import { Icon } from "@/components/icon";
import StatusPill from "@/components/StatusPill";
import TextIconPill from "@/components/TextIconPill";

import { Text } from "@/components/ui/text";
import { tServiceResponse, tServicesResponse } from "@/ts/services";
import { Link } from "expo-router";
import { ChevronRight, Clock10, HandCoins } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function ServiceCard({
  service,
}: {
  service: tServicesResponse;
}) {
  return (
    <Link href={`/services/${service.id}`} asChild>
      <Pressable className="flex flex-row items-center justify-between px-container py-5">
        <View className="flex flex-col gap-2">
          <View className="flex flex-col">
            <View className="flex flex-row gap-2">
              <Text className="font-medium">Names</Text>
              <StatusPill text={"Aktivni"} variant={"success"} />
            </View>
            <Text>Notes</Text>
          </View>
          <View className="flex flex-row gap-2.5">
            <TextIconPill text={"1190 Kč"} icon={HandCoins} />
            <TextIconPill text={`90 minut`} icon={Clock10} />
          </View>
        </View>

        <Icon
          icon={ChevronRight}
          width={24}
          height={24}
          className="text-muted-foreground"
        />
      </Pressable>
    </Link>
  );
}
