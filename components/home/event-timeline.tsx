import { Dimensions, View } from "react-native";
import EventTimelineItem from "./event-timeline-item";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reservationsProvider } from "@/dbProvider";
import { useState } from "react";
import SkeletonBox from "../skeletons/skeleton-box";
import { tReservationsRes } from "@/ts/reservation";
import { format } from "date-fns";
import { Text } from "../ui/text";

const { width } = Dimensions.get("screen");

export default function EventTimeline() {
  const [date, setDate] = useState(new Date());

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["reservations"],
    queryFn: ({ pageParam }) =>
      reservationsProvider.getReservations(pageParam, date),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.offset;
    },
    initialData: null,
    initialPageParam: 0,
  });
  const items = data?.pages.flatMap(
    (page) => page.data.data
  ) as tReservationsRes[];

  if (isLoading) {
    return Array.from({ length: 5 }).map((_, i) => (
      <SkeletonBox key={i} w={width * 0.9} h={70} />
    ));
  }
  return (
    <View>
      {items?.map((item, i) => {
        if (
          new Date(item.date).getDate() !==
            new Date(items[i - 1]?.date).getDate() &&
          i !== 0
        )
          return (
            <View key={i} className="mt-6 relative">
              <View className="bg-secondary rounded-lg px-3 py-2 fixed left-0 top-0">
                <Text className=" font-semibold">
                  {format(item.date, "dd.MMMM")}
                </Text>
              </View>
              <EventTimelineItem
                reservation={item}
                length={5}
                index={i}
                key={i}
              />
            </View>
          );

        return (
          <EventTimelineItem reservation={item} length={5} index={i} key={i} />
        );
      })}
    </View>
  );
}
