import { useSession } from "@/auth/auth";
import HomeCalendar from "@/components/calendar/home-calendar";
import EventTimeline from "@/components/home/event-timeline";
import EventTimelineItem from "@/components/home/event-timeline-item";
import NextTrainingCard from "@/components/home/next-training";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Pressable, ScrollView, View } from "react-native";
import { toast } from "sonner-native";

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
        {/* <Pressable onPress={() => toast("Hello, World!")}>
          <Text>s</Text>
        </Pressable> */}
        <View className="px-container mt-10">
          <Text className="font-semibold mb-4">Dnešní rozvrh</Text>
          <EventTimeline />
        </View>
      </ScrollView>
    </Screen>
  );
}
