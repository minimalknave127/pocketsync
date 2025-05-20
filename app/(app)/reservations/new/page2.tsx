import ProgressBar from "@/components/progress-bar";
import SearchInput from "@/components/search-input";
import ServiceWorkoutSkeleton from "@/components/skeletons/service-workout-skeleton";
import { Screen } from "@/components/ui/screen";
import { servicesProvider } from "@/dbProvider";
import useDebounce from "@/hooks/use-debounce";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View } from "react-native";
import ServiceCard from "../../services/components/service-card";
import { tServicesResponse } from "@/ts/services";
import { useReservationCreateStore } from "@/stores/reservation";
import { useRouter } from "expo-router";

export default function SeelctService() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const reservation = useReservationCreateStore((state) => state.reservation);
  const setReservation = useReservationCreateStore(
    (state) => state.setReservation
  );

  const router = useRouter();

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["services", debouncedSearch],
    queryFn: ({ pageParam }) =>
      servicesProvider.getServices(pageParam, debouncedSearch),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.offset;
    },
    initialData: null,
    initialPageParam: 0,
  });
  const items = data?.pages.flatMap((page) => page.data.data);

  const onServicePress = (service: tServicesResponse) => {
    setReservation({
      ...reservation,
      service_id: service.id,
      duration: service.duration,
      service,
    });

    router.push("/reservations/new/page3");
  };

  return (
    <Screen>
      <ProgressBar percentage={50} />
      <SearchInput value={search} onChange={setSearch} />
      {isLoading ? (
        <View className="px-container mt-4">
          {[...Array(3)].map((_, index) => (
            <ServiceWorkoutSkeleton key={index} />
          ))}
        </View>
      ) : (
        <FlashList
          estimatedItemSize={80}
          className="flex-1"
          contentContainerClassName="mt-6"
          data={items}
          ItemSeparatorComponent={() => <View className="h-0.5 bg-muted" />}
          renderItem={({ item }) => {
            return <ServiceCard service={item} onPress={onServicePress} />;
          }}
        />
      )}
    </Screen>
  );
}
