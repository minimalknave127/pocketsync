import { FlatList, Pressable, View } from "react-native";
import { Text } from "../ui/text";
import Man3D from "@/assets/icons/man-3d";
import Dumbell3D from "@/assets/icons/dumbell-3d";
import { Link } from "expo-router";

export default function FastActions() {
  const actions = [
    {
      name: "Nový klient",
      icon: Man3D,
    },
    {
      name: "Nová rezervace",
      icon: Dumbell3D,
    },
  ];
  return (
    <View>
      <Text className="font-semibold px-container mt-10">Rychlé akce</Text>
      <FlatList
        data={actions}
        horizontal
        contentContainerClassName="px-container gap-2.5 mt-4"
        renderItem={({ item }) => (
          <Link asChild href="/clients/new">
            <Pressable className="items-center">
              <View className="w-20 h-20 bg-slate-100 dark:bg-muted justify-center items-center rounded-xl">
                {<item.icon />}
              </View>
              <Text className="text-center text-xs mt-2">{item.name}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
