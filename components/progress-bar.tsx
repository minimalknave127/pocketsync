import { cn } from "@/lib/utils";
import React from "react";
import { View } from "react-native";

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <View className="w-full h-[1px] bg-slate-100 relative mb-6">
      <View className={cn(`bg-primary w-[${String(percentage)}%] h-[1px]`)} />
    </View>
  );
}
