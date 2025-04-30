import { TrueSheet } from "@lodev09/react-native-true-sheet";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { Button } from "./ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChartNoAxesGantt, Dumbbell, Settings } from "lucide-react-native";
import { Text } from "./ui/text";
import { Link } from "expo-router";
import { Icon } from "./icon";
import { APP_ROUTES, AppRoute } from "@/ts/navigation";

type OptionProps = {
  label: string;
  children: OptionChildProps[];
};
type OptionChildProps = {
  icon: any;
  label: string;
  href: AppRoute;
};

const options: OptionProps[] = [
  {
    label: "",
    children: [
      {
        icon: Dumbbell,
        label: "Cvičení",
        href: APP_ROUTES.workouts,
      },
      {
        icon: ChartNoAxesGantt,
        label: "Služby",
        href: APP_ROUTES.services,
      },
    ],
  },
  {
    label: "Ostatní",
    children: [
      {
        icon: Settings,
        label: "Nastavení",
        href: APP_ROUTES.home,
      },
    ],
  },
];

export default function OptionsSheet({ sheetRef, dismiss }: any) {
  const insets = useSafeAreaInsets();
  return (
    <TrueSheet ref={sheetRef} sizes={["auto", "large"]} cornerRadius={24}>
      <FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View className="py-4">
            <Text className="px-container font-semibold pb-4">
              {item.label}
            </Text>
            {item.children.map((child) => (
              <Link href={child.href} asChild key={child.label}>
                <Pressable
                  className="flex-row items-center gap-4  py-3 active:bg-muted rounded-xl mx-2 px-2"
                  onPress={dismiss}
                >
                  <Icon
                    icon={child.icon}
                    className="text-muted-foreground"
                    width={20}
                    height={20}
                  />
                  <Text className="font-medium">{child.label}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
        style={{ paddingBottom: insets.bottom }}
      />
    </TrueSheet>
  );
}
