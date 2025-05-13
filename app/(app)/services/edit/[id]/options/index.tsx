import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { tServStoreOption, useServiceStore } from "@/stores/service";
import { tServiceOption } from "@/ts/services";
import React, { useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import ServiceEditOptionsCreateEditSheet from "../../../components/create-edit/service-edit-options-create-edit-sheet";
import ServiceOption from "../../../components/service-option";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function ServiceOptionEditCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<tServStoreOption | null>(null);

  const serviceOptions = useServiceStore((state) => state.options);
  const setServiceOptions = useServiceStore((state) => state.updateOptions);

  const router = useRouter();

  const handleEdit = (id: string) => {
    const option = serviceOptions.find((option) => option.id === id);
    if (option) {
      setSelected(option);
      setIsOpen(true);
    }
  };

  const handleUpdateOrder = async ({
    from,
    to,
  }: ReorderableListReorderEvent) => {
    try {
      // Reorder items
      const newOrdered = reorderItems(serviceOptions, from, to).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );

      setServiceOptions(newOrdered);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<tServStoreOption>) => {
    return (
      <ServiceOption
        id={item.id}
        title={item.name}
        description={item.description}
        onPress={handleEdit}
      />
    );
  };

  return (
    <>
      <ServiceEditOptionsCreateEditSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
      />
      <Screen className="flex-col justify-between">
        <Text className="text-2xl px-container font-semibold capitalize">
          Obsah služby
        </Text>
        <ReorderableList<tServStoreOption>
          data={serviceOptions}
          onReorder={handleUpdateOrder}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
        <View className="px-container absolute right-0 bottom-0 w-full flex-col gap-2">
          {serviceOptions.length ? (
            <Button variant="outline" onPress={() => router.back()}>
              Uložit
            </Button>
          ) : null}
          <Button onPress={() => setIsOpen(true)}>Přidat</Button>
        </View>
      </Screen>
    </>
  );
}
