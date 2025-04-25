import { View } from "react-native";

type CardSeparatorProps = {
  className?: string;
};

export default function CardSeparator({ className }: CardSeparatorProps) {
  return (
    <View className={className}>
      <View className="h-[10px] rounded-b-3xl bg-background z-40" />
      <View className="h-[12px] bg-slate-100 dark:bg-black w-full -mt-[3px]" />
      <View className="h-[10px] rounded-t-3xl bg-background -mt-[3px]" />
    </View>
  );
}
