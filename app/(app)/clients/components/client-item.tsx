import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

export default function ClientItem({ client }: { client: any }) {
  return (
    <Link href={`/clients/${client.id}`} asChild>
      <Pressable className="flex-row items-start gap-4 px-container py-3 active:bg-muted/20">
        <Avatar alt="" className="w-14 h-14">
          <AvatarFallback>
            <Text className="font-medium capitalize">{client.username[0]}</Text>
          </AvatarFallback>
          <AvatarImage />
        </Avatar>
        <View className="flex-1">
          <Text className="font-medium capitalize">{client.username}</Text>
          <Text className="text-sm text-muted-foreground">
            {client.email} | {client.reservations_count} proběhlých tréninků
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
