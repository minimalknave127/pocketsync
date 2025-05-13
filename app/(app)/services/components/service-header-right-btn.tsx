import DropdownOptionsMenu from "@/components/dropdown-selector";
import { Icon } from "@/components/icon";
import { RouteProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { MenuIcon } from "lucide-react-native";
import { Alert } from "react-native";

export default function ServiceHeaderRightBtn({
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
      router.push(`/services/edit/${route.params.id}`);
    }

    if (value === "delete") {
      handleDeleteAction();
    }
  }

  function handleDeleteAction() {
    Alert.alert(
      `Chystáš se smazat službu`,
      "Smazáním dojde ke kompletnímu odstranění služby.",
      [
        {
          text: "Zrušit",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Smazat službu",
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
