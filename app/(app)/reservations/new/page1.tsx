import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Screen } from "@/components/ui/screen";
import { clientProvider } from "@/dbProvider";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ClientItem from "../../clients/components/client-item";
import useDebounce from "@/hooks/use-debounce";
import { tClientRes, tTrainerClientsRes } from "@/ts/users/clients";
import ProgressBar from "@/components/progress-bar";
import { useReservationCreateStore } from "@/stores/reservation";
import { useRouter } from "expo-router";

export default function SelectClient() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 200);

  const reservation = useReservationCreateStore((state) => state.reservation);
  const setReservation = useReservationCreateStore(
    (state) => state.setReservation
  );

  const router = useRouter();

  const { data } = useInfiniteQuery({
    queryKey: ["clients", debouncedSearch],
    queryFn: ({ pageParam }) =>
      clientProvider.getClients(pageParam, debouncedSearch),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.offset;
    },
    initialData: null,
    initialPageParam: 0,
  });
  const items = data?.pages.flatMap((page) => page.data.data);

  const onPress = (client: tTrainerClientsRes) => {
    console.log("RESSSSSS", reservation);
    setReservation({
      ...reservation,
      customer_id: client.id,
      customer: client,
    });
    router.push("/reservations/new/page2");
  };

  useEffect(() => {
    return () => {
      setReservation(null);
    };
  }, []);

  return (
    <Screen>
      <ProgressBar percentage={25} />
      <View className="px-container">
        <Input
          containerClassName="bg-muted"
          value={search}
          onChange={(e) => setSearch(e.nativeEvent.text)}
          startContent={
            <Icon icon={SearchIcon} className="text-foreground/70" />
          }
          placeholder="Vyhledávání"
        />
      </View>
      <FlashList
        estimatedItemSize={80}
        className="flex-1"
        contentContainerClassName="mt-6"
        data={items}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
        renderItem={({ item }) => {
          return <ClientItem client={item} onPress={onPress} />;
        }}
      />
    </Screen>
  );
}
