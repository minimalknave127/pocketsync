import { Screen } from "@/components/ui/screen";
import { clientProvider } from "@/dbProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import ClientDetailHeader from "./components/client-detail-header";
import CardSeparator from "@/components/ui/card-separator";
import ClientDetailGoals from "./components/client-detail-goals";
import { tCustomerResponse } from "@/ts/users/users";

export default function ClientDetail() {
  const { id } = useLocalSearchParams();
  const { data, isLoading }: { data: tCustomerResponse; isLoading: boolean } =
    useQuery({
      queryKey: ["clients", id],
      queryFn: async () => {
        const res = await clientProvider.getClient(id as string);
        return res?.data?.data;
      },
    });

  if (isLoading) return null;

  return (
    <Screen>
      <ScrollView className="flex-1">
        <ClientDetailHeader user={data} />
        <CardSeparator className="py-4" />
        <ClientDetailGoals />
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </ScrollView>
    </Screen>
  );
}
