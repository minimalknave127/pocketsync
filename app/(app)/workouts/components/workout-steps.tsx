import { MenuIcon } from "lucide-react-native";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { RouteProp } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import DropdownOptionsMenu from "@/components/dropdown-selector";
import { Icon } from "@/components/icon";
import { Text } from "@/components/ui/text";

export default function WorkoutOptions({
  route,
}: {
  route: RouteProp<any, any>;
}) {
  const queryClient = useQueryClient();

  // const {  isBlocked, blockingUser, type } = route.params;

  const navigation = useNavigation();
  const router = useRouter();
  function handlePress(value: string) {
    if (value === "edit") {
      router.push(`/workouts/${route.params.id}/edit`);
    }

    if (value === "delete") {
      handleDeleteAction();
    }
  }

  function handleDeleteAction() {
    Alert.alert(
      `Chystáš se smazat cvik`,
      "Smazáním cviku dojde k odstranění cviku.",
      [
        {
          text: "Zrušit",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Smazat cvik",
          onPress: () => handleDelete(),
          style: "destructive",
        },
      ]
    );
  }

  async function handleDelete() {
    // await chatProvider.deleteChat(chatId);
    queryClient.invalidateQueries({
      queryKey: ["workouts"],
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function handleBlock(deleteChat?: boolean) {}

  return (
    <DropdownOptionsMenu
      options={[
        {
          text: "Upravit",
          value: "edit",
          destructive: false,
          icon: {
            ios: {
              name: "pencil",
              pointSize: 18,
            },
            androidIconName: "pencil",
          },
        },
        {
          text: "Smazat",
          value: "delete",
          destructive: true,
          icon: {
            ios: {
              name: "trash",
              pointSize: 18,
            },
            androidIconName: "trash",
          },
        },
      ]}
      onPress={handlePress}
    >
      <Icon width={18} height={18} icon={MenuIcon} />
    </DropdownOptionsMenu>
  );
}
