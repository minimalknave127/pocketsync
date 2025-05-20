import { Icon } from "@/components/icon";
import StatusPill from "@/components/StatusPill";
import TextIconPill from "@/components/TextIconPill";

import { Text } from "@/components/ui/text";
import { tServiceResponse, tServicesResponse } from "@/ts/services";
import { Link, RelativePathString } from "expo-router";
import { ChevronRight, Clock10, HandCoins } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function ServiceCard({
  service,
  onPress,
  href,
}: {
  service: tServicesResponse;
  onPress?: (service: tServicesResponse) => void;
  href?: RelativePathString;
}) {
  const content = (
    <Pressable
      className="flex flex-row items-center justify-between px-container py-5"
      onPress={() => onPress?.(service)}
    >
      <View className="flex flex-col gap-2">
        <View className="flex flex-col">
          <View className="flex flex-row gap-2">
            <Text className="font-medium">{service.name}</Text>
            <StatusPill
              text={service.is_active ? "Aktivni" : "Neaktivni"}
              variant={service.is_active ? "success" : "common"}
            />
          </View>
          <Text>{service.description}</Text>
        </View>
        <View className="flex flex-row gap-2.5">
          <TextIconPill text={`${service.price} Kč`} icon={HandCoins} />
          <TextIconPill text={`${service.duration} minut`} icon={Clock10} />
        </View>
      </View>

      <Icon
        icon={ChevronRight}
        width={24}
        height={24}
        className="text-muted-foreground"
      />
    </Pressable>
  );

  if (onPress) {
    return content;
  }

  return (
    <Link href={href || `/services/${service.id}`} asChild>
      {content}
    </Link>
  );
}
