import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";
import { CheckIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
const ServiceOptionPreview = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <View className="flex flex-row gap-2 items-center px-container">
      <Icon icon={CheckIcon} className="text-primary" width={18} height={18} />
      <View className="flex flex-col">
        <Text className="text-base w-full flex-wrap shrink">{title}</Text>
        {description && (
          <Text className="text-sm text-slate-600 w-full flex-wrap shrink">
            {description}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ServiceOptionPreview;
