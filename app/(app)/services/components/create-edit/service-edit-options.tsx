import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import ServiceOptionPreview from "../service-option-preview";
import { serviceOptionCardLoaders } from "../service-options-card";

export default function ServiceEditSheet({
  loading,
  fields,
}: {
  loading: boolean;
  fields: any[];
}) {
  return (
    <>
      <View className="gap-7 px-container">
        <View className="flex flex-row items-center  justify-between">
          {loading ? (
            serviceOptionCardLoaders.title
          ) : (
            <Text className="font-semibold text-base">Obsah služby</Text>
          )}
          {loading ? (
            serviceOptionCardLoaders.button
          ) : (
            <Link href="/services/edit/2/options" asChild>
              <Button variant="link" size="sm">
                Upravit
              </Button>
            </Link>
          )}
        </View>
        <View className="gap-4">
          {loading
            ? serviceOptionCardLoaders.options
            : fields.map((field) => (
                <ServiceOptionPreview title={field.name} key={field.id} />
              ))}
        </View>
      </View>
    </>
  );
}
