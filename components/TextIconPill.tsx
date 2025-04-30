import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";
import type { LucideIcon } from "lucide-react-native";
import { Icon } from "./icon";

interface PillProps {
  text: string;
  /**
   * Pass either:
   *  - a rendered element:   `<MyCustomIcon />`
   *  - a Lucide icon component: `Activity` (the un-instantiated component)
   */
  icon: React.ReactNode | LucideIcon;
}

const TextIconPill: React.FC<PillProps> = ({ text, icon }) => {
  let renderedIcon: React.ReactNode;

  if (React.isValidElement(icon)) {
    // already an element (e.g. <MyCustomIcon />)
    renderedIcon = icon;
  } else {
    // assume it's a LucideIcon component type
    const LucideComp = icon as LucideIcon;
    renderedIcon = (
      <Icon
        icon={LucideComp}
        className="text-foreground"
        width={18}
        height={18}
      />
    );
  }

  return (
    <View className="flex flex-row gap-1 items-center">
      {renderedIcon}
      <Text className="text-sm font-medium">{text}</Text>
    </View>
  );
};

export default TextIconPill;
