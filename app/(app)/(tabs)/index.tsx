import { useSession } from "@/auth/auth";
import HomeCalendar from "@/components/calendar/home-calendar";
import EventTimeline from "@/components/home/event-timeline";
import FastActions from "@/components/home/fast-actions";
import NextTrainingCard from "@/components/home/next-training";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useSession();
  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerClassName="pb-20">
        <Text className="text-3xl px-container font-semibold">Váš rozvrh</Text>
        <HomeCalendar
          containerProps={{
            className: "mt-4",
          }}
        />
        <FastActions />
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
        <Button onPress={signOut}>
          <Text>Sign out</Text>
        </Button>
      </ScrollView>
    </Screen>
  );
}
