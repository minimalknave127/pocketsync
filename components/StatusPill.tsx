import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";

type PillVariants = "success" | "error" | "warning" | "common" | "info";

export default function StatusPill({
  text,
  variant,
}: {
  text: string;
  variant: PillVariants;
}) {
  const bgColor = {
    success: "bg-green-100",
    error: "bg-red-100",
    warning: "bg-yellow-100",
    common: "bg-slate-100",
    info: "bg-blue-100",
  };

  const textColor = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    common: "text-slate-500",
    info: "text-blue-500",
  };

  return (
    <View
      className={`flex flex-row items-center px-3 py-1 rounded-full ${bgColor[variant]}`}
    >
      <Text className={` text-sm font-medium ${textColor[variant]}`}>
        {text}
      </Text>
    </View>
  );
}
