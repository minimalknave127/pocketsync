import { Icon } from "@/components/icon";
import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { CheckIcon, Clock10 } from "lucide-react-native";
import React from "react";
import { Dimensions, View } from "react-native";
import ServiceOptionPreview from "./service-option-preview";
import { tService, tServiceOption } from "@/ts/services";

const { width } = Dimensions.get("window");

export default function ServiceOptionsCard({
  loading,
  options,
  id,
}: {
  loading?: boolean;
  options?: tServiceOption[];
  id: tService["id"];
}) {
  return (
    <View className="gap-7">
      <View className="flex flex-row items-center px-container justify-between">
        {loading ? (
          serviceOptionCardLoaders.title
        ) : (
          <Text className="font-semibold text-base">Obsah služby</Text>
        )}
        {loading ? (
          serviceOptionCardLoaders.button
        ) : (
          <Link href={`/services/${id}/options`} asChild>
            <Button variant="link" size="sm">
              Upravit
            </Button>
          </Link>
        )}
      </View>
      <View className="gap-4">
        {loading
          ? serviceOptionCardLoaders.options
          : options?.map((option) => (
              <ServiceOptionPreview
                title={option.name}
                description={option.description}
              />
            ))}
        {/* <Option title={"Zpevnění a tvarování postavy"} />
        <Option title={"Cvičení v těhotenství a po porodu"} /> */}
      </View>
    </View>
  );
}

export const serviceOptionCardLoaders = {
  title: <SkeletonBox w={width * 0.4} h={25} />,
  button: <SkeletonBox w={width * 0.4} h={25} />,
  options: (
    <View className="gap-2 px-container">
      {[...Array(3)].map((_, i) => (
        <SkeletonBox key={i} w={width * 1} h={25} />
      ))}
    </View>
  ),
};
