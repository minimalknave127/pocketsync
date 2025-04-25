import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { Link, useLocalSearchParams } from "expo-router";
import { Edit2Icon } from "lucide-react-native";
import { useCallback } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import FlatList, {
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
} from "react-native-draggable-flatlist";

export default function ClientGoalsEdit() {
  const { id: clientId } = useLocalSearchParams();

  const goals = [
    {
      id: "1",
      title: "Zhubnout 5 kg",
    },
    {
      id: "2",
      title: "Vymrdat 10 kg",
    },
  ];
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<any>) => {
      return (
        <ShadowDecorator>
          <ScaleDecorator activeScale={1.02}>
            <OpacityDecorator>
              <TouchableOpacity
                className="px-container flex-row items-center justify-between py-4 active:bg-muted/20"
                activeOpacity={1}
                onLongPress={() => {
                  drag();
                  if (Platform.OS === "ios") {
                    Haptics.selectionAsync();
                  }
                }}
                disabled={isActive}
              >
                <View className="flex-row gap-4">
                  <Text className="text-2xl">🏋️</Text>
                  <View>
                    <Text className="font-medium mb-1">Zhubnout 10 kg</Text>
                    <Text className="text-sm text-muted-foreground">
                      24.2.2025
                    </Text>
                  </View>
                </View>
                <Link href={`/clients/${clientId}/goals/edit/1`} asChild>
                  <Button variant="ghost" size="icon">
                    <Icon
                      icon={Edit2Icon}
                      className="text-muted-foreground/50 w-4 h-4"
                      width={16}
                      height={16}
                    />
                  </Button>
                </Link>
              </TouchableOpacity>
            </OpacityDecorator>
          </ScaleDecorator>
        </ShadowDecorator>
      );
    },
    []
  );
  return (
    <Screen className="pt-0 mt-0 flex-1">
      <Text className="font-semibold text-xl px-container">Moje cíle</Text>
      <FlatList
        onDragEnd={({ data }) => console.log(data)}
        data={goals}
        className="mt-4"
        renderItem={renderItem}
        style={{ flex: 1 }}
        containerStyle={{
          flex: 1,
        }}
        keyExtractor={(e) => e.id}
      />
      <View className="px-container mt-4">
        <Button>Přidat cíl</Button>
      </View>
    </Screen>
  );
}
