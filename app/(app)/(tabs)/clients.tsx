import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { clientProvider } from "@/dbProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react-native";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ClientItem from "../clients/components/client-item";
import { Link } from "expo-router";

export default function ClientsTab() {
  const { data } = useInfiniteQuery({
    queryKey: ["clients"],
    queryFn: ({ pageParam }) => clientProvider.getClients(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.offset;
    },
    initialData: null,
    initialPageParam: 0,
  });
  const items = data?.pages.flatMap((page) => page.data.data);
  return (
    <Screen>
      <View className="px-container">
        <Input
          containerClassName="bg-muted"
          startContent={
            <Icon icon={SearchIcon} className="text-foreground/70" />
          }
          placeholder="Vyhledávání"
        />
      </View>
      <Link href="/clients/12">Test</Link>
      <FlashList
        estimatedItemSize={80}
        className="flex-1"
        contentContainerClassName="mt-6"
        data={items}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
        renderItem={({ item }) => {
          return <ClientItem client={item} />;
        }}
      />
    </Screen>
  );
}
