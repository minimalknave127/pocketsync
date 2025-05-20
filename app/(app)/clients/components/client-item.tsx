import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { tTrainerClientsRes } from "@/ts/users/clients";

export default function ClientItem({
  client,
  onPress,
}: {
  client: tTrainerClientsRes;
  onPress?: (client: tTrainerClientsRes) => void;
}) {
  // shared content
  const content = (
    <Pressable
      className="flex-row items-start gap-4 px-container py-3 active:bg-muted/20"
      onPress={() => onPress?.(client)}
    >
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
  );

  // if there's an onPress prop, render just the Pressable
  if (onPress) {
    return content;
  }

  // otherwise, wrap it in a Link
  return (
    <Link href={`/clients/${client.id}`} asChild>
      {content}
    </Link>
  );
}
