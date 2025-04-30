import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { tCustomerResponse } from "@/ts/users/users";
import { View } from "react-native";

export default function ClientDetailHeader({
  user,
}: {
  user: tCustomerResponse;
}) {
  return (
    <View className="px-container flex-row items-center gap-6">
      <Avatar alt="ts" className="w-20 h-20">
        <AvatarFallback>
          <Text className="text-2xl font-medium capitalize">
            {user.username[0]}
          </Text>
        </AvatarFallback>
      </Avatar>
      <View>
        <Text className="text-xl font-semibold capitalize">
          {user.username}
        </Text>
        <View className="flex-row items-center gap-4 mt-2.5">
          <View>
            <Text className="font-semibold">20</Text>
            <Text className="text-xs">tréninků</Text>
          </View>
          <View className="w-[1px] h-full bg-muted-foreground/20" />
          <View>
            <Text className="font-semibold">20</Text>
            <Text className="text-xs">tréninků</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
