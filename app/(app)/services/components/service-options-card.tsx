import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { CheckIcon, Clock10 } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function ServiceOptionsCard() {
  return (
    <View className="gap-7">
      <View className="flex flex-row items-center px-container justify-between">
        <Text className="font-semibold text-base">Obsah služby</Text>
        <Link href="/services/2/options" asChild>
          <Button variant="link" size="sm">
            Upravit
          </Button>
        </Link>
      </View>
      <View className="gap-4">
        <Option title={"Snížení hmotnosti"} />
        <Option title={"Zpevnění a tvarování postavy"} />
        <Option title={"Cvičení v těhotenství a po porodu"} />
      </View>
    </View>
  );
}

const Option = ({ title }) => {
  return (
    <View className="flex flex-row gap-2 items-center px-container">
      <Icon icon={CheckIcon} className="text-primary" width={18} height={18} />
      <Text className="text-base w-full flex-wrap shrink">{title}</Text>
    </View>
  );
};
