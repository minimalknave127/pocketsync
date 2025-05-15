import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Button } from "@/components/ui/button";
import RHFInput from "@/components/ui/form/rhf-input";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Dimensions, View } from "react-native";

const width = Dimensions.get("screen").width;

export default function ServiceEditMainInfo({
  loading = false,
}: {
  loading: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const form = useFormContext();
  console.log("FORM VALUES", form.getValues());
  return (
    <View className="px-container gap-3">
      {loading ? (
        <>
          <SkeletonBox w={width * 0.4} h={25} />
          <SkeletonBox w={width * 0.8} h={60} />
        </>
      ) : (
        <>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold capitalize">
              Základní informace
            </Text>

            <Button variant="link" size="sm" onPress={() => setIsOpen(!isOpen)}>
              {isOpen ? "Hotovo" : "Upravit"}
            </Button>
          </View>

          {isOpen && (
            <View className="gap-4">
              <RHFInput
                name="price"
                label="Cena za službu"
                endContent="Kč"
                required
                keyboardType="numeric"
                variant="insetLabel"
              />
              <RHFInput
                name="duration"
                label="Trvání služby"
                endContent="min"
                keyboardType="numeric"
                required
                variant="insetLabel"
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}
