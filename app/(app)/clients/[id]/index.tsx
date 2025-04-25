import { Screen } from "@/components/ui/screen";
import { clientProvider } from "@/dbProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import ClientDetailHeader from "./components/client-detail-header";
import CardSeparator from "@/components/ui/card-separator";
import ClientDetailGoals from "./components/client-detail-goals";

export default function ClientDetail() {
  const { id } = useLocalSearchParams();
  const { data } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => clientProvider.getClient(id as string),
  });
  return (
    <Screen>
      <ScrollView className="flex-1">
        <ClientDetailHeader />
        <CardSeparator className="py-4" />
        <ClientDetailGoals />
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </ScrollView>
    </Screen>
  );
}
