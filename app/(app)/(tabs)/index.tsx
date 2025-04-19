import { useSession } from "@/auth/auth";
import HomeCalendar from "@/components/calendar/home-calendar";
import EventTimelineItem from "@/components/home/event-timeline-item";
import NextTrainingCard from "@/components/home/next-training";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { session, signOut } = useSession();
  return (
    <Screen>
      <ScrollView className="flex-1">
        <Text className="text-3xl px-container font-semibold">Váš rozvrh</Text>
        <HomeCalendar
          containerProps={{
            className: "mt-4",
          }}
        />
        <View className="px-container mt-10">
          <Text className="font-semibold">Nadcházející trénink</Text>
          <NextTrainingCard />
        </View>
        <View className="px-container mt-10">
          <Text className="font-semibold mb-4">Dnešní rozvrh</Text>
          <EventTimelineItem />
        </View>
      </ScrollView>
    </Screen>
  );
}
