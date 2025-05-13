import React from "react";
import CardSeparator from "../ui/card-separator";
import { Dimensions, View } from "react-native";
import { Text } from "../ui/text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SkeletonBox from "../skeletons/skeleton-box";
import { Link, RelativePathString } from "expo-router";
import { Button } from "../ui/button";

interface TextCardProps {
  title: string;
  description: string;
  separator?: boolean;
  loading?: boolean;
  action?: {
    type: "button" | "link";
    href?: RelativePathString;
    text: string;
    onPress?: () => void;
  };
}

const { width } = Dimensions.get("screen");

export default function TextCard({
  title,
  description,
  separator = false,
  loading = false,
  action,
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
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold capitalize">
                {title}
              </Text>
              {action &&
                (action.type === "button" ? (
                  <Button variant="link" size="sm" onPress={action.onPress}>
                    {action.text}
                  </Button>
                ) : (
                  <Link href={action?.href} asChild>
                    <Button size="sm" variant="link">
                      {action.text}
                    </Button>
                  </Link>
                ))}
            </View>
            <Text className="text-base mt-2.5">{description}</Text>
          </>
        )}
      </View>

      {separator && <CardSeparator className="py-4" />}
    </>
  );
}
