import React from "react";
import CardSeparator from "../ui/card-separator";
import { Dimensions, View } from "react-native";
import { Text } from "../ui/text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SkeletonBox from "../skeletons/skeleton-box";

interface TextCardProps {
  title: string;
  description: string;
  separator?: boolean;
  loading?: boolean;
}

const { width } = Dimensions.get("screen");

export default function TextCard({
  title,
  description,
  separator = false,
  loading = false,
}: TextCardProps) {
  return (
    <>
      <View className="px-container gap-3">
        {loading ? (
          <>
            <SkeletonBox w={width * 0.4} h={25} />
            <SkeletonBox w={width * 0.8} h={60} />
          </>
        ) : (
          <>
            <Text className="text-base font-semibold capitalize">{title}</Text>
            <Text className="text-base mt-2.5">{description}</Text>
          </>
        )}
      </View>

      {separator && <CardSeparator className="py-4" />}
    </>
  );
}
