import { cn } from "@/lib/utils";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  <SafeAreaView
    className={cn("bg-background py-4", className)}
    style={[{ flex: 1 }, style]}
    edges={edges}
  >
    {children}
  </SafeAreaView>
);
