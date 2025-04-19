import { FlatList, View, ViewProps } from "react-native";
import HomeCalendarItem from "./home-calendar-item";
import { getDays } from "./utils";

export default function HomeCalendar({
  containerProps,
  activeDay,
}: {
  containerProps?: ViewProps;
  activeDay?: Date;
}) {
  const days = getDays();
  return (
    <View {...containerProps}>
      <FlatList
        horizontal
        data={days}
        contentContainerClassName="px-container"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HomeCalendarItem isActive={item === days[0]} day={item} />
        )}
      />
    </View>
  );
}
