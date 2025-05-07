import { Icon } from "@/components/icon";
import SkeletonBox from "@/components/skeletons/skeleton-box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { CheckIcon, Clock10 } from "lucide-react-native";
import React from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

export default function ServiceOptionsCard({ loading }: { loading?: boolean }) {
  return (
    <View className="gap-7">
      <View className="flex flex-row items-center px-container justify-between">
        {loading ? (
          loaders.title
        ) : (
          <Text className="font-semibold text-base">Obsah služby</Text>
        )}
        {loading ? (
          loaders.button
        ) : (
          <Link href="/services/2/options" asChild>
            <Button variant="link" size="sm">
              Upravit
            </Button>
          </Link>
        )}
      </View>
      <View className="gap-4">
        {loading ? loaders.options : <Option title={"Snížení hmotnosti"} />}
        {/* <Option title={"Zpevnění a tvarování postavy"} />
        <Option title={"Cvičení v těhotenství a po porodu"} /> */}
      </View>
    </View>
  );
}

const Option = ({ title }) => {
  return (
    <View className="flex flex-row gap-2 items-center px-container">
      <Icon icon={CheckIcon} className="text-primary" width={18} height={18} />
      <Text className="text-base w-full flex-wrap shrink">{title}</Text>
    </View>
  );
};

const loaders = {
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
