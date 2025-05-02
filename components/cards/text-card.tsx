import React from "react";
import CardSeparator from "../ui/card-separator";
import { View } from "react-native";
import { Text } from "../ui/text";

interface TextCardProps {
  title: string;
  description: string;
  separator?: boolean;
}

export default function TextCard({
  title,
  description,
  separator = false,
}: TextCardProps) {
  return (
    <>
      <View className="px-container gap-3">
        <Text className="text-base font-semibold capitalize">{title}</Text>
        <Text className="text-base mt-2.5">{description}</Text>
      </View>

      {separator && <CardSeparator className="py-4" />}
    </>
  );
}
