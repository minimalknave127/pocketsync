import React from "react";
import { View } from "react-native";
import { Icon } from "./icon";
import { SearchIcon } from "lucide-react-native";
import { Input } from "./ui/input";

export default function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View className="px-container">
      <Input
        value={value}
        onChange={(e) => onChange(e.nativeEvent.text)}
        containerClassName="bg-muted"
        startContent={<Icon icon={SearchIcon} className="text-foreground/70" />}
        placeholder="Vyhledávání"
      />
    </View>
  );
}
