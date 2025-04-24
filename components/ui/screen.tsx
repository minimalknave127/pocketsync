import { cn } from "@/lib/utils";
import React from "react";
import { StyleProp, ViewStyle, SafeAreaView, View } from "react-native";

type ScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: ReadonlyArray<"top" | "right" | "bottom" | "left">; // optional
  className?: string;
};

export const CONTAINER_PADDING = 16;
/**
 * Applies safe‑area padding automatically.
 * `style` comes *after* the internal padding, so you can override if needed.
 */
export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  className,
  edges = ["top", "bottom"],
}) => (
  <SafeAreaView style={[{ flex: 1 }, style]}>
    <View className={cn("bg-background my-4 flex-1", className)}>
      {children}
    </View>
  </SafeAreaView>
);
