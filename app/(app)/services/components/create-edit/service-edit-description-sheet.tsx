import { Button } from "@/components/ui/button";
import RHFInput from "@/components/ui/form/rhf-input";
import { Text } from "@/components/ui/text";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import React, { RefObject } from "react";
import { View } from "react-native";

export default function ServiceEditDescriptionSheet({
  sheetRef,
  dismiss,
}: {
  sheetRef: RefObject<TrueSheet>;
  dismiss: () => void;
}) {
  return (
    <TrueSheet
      ref={sheetRef}
      sizes={["large"]}
      cornerRadius={24}
      className="h-full"
    >
      <View className="py-4 px-container">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-2xl px-container mt-4">
            Popis
          </Text>
          <Button variant="secondary" size="sm" onPress={dismiss}>
            Upravit
          </Button>
        </View>

        <RHFInput
          name="description"
          className="mt-4 h-64"
          inputClassName="h-64"
          containerClassName="!h-64"
          placeholder="Zadejte popis"
          multiline
          numberOfLines={10}
        />
      </View>
    </TrueSheet>
  );
}
