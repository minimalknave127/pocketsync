import { useSession } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Image, SafeAreaView, View } from "react-native";

export default function WelcomeScreen() {
  // temporary sign in without auth
  const { signIn } = useSession();
  return (
    <View className="flex-1">
      <View className="bg-primary flex-1 pt-40">
        <SafeAreaView className="justify-between flex-1">
          <Text className="text-5xl px-container text-primary-foreground text-center font-semibold bg-primary">
            Trénujte bez starostí
          </Text>
          <Image
            //   className="w-full h-full object-contain"
            className="w-[full] h-full"
            resizeMode="contain"
            source={require("@/assets/images/signup-hero.png")}
          />
        </SafeAreaView>
      </View>
      <View className="w-full rounded-t-xl -mt-10 gap-4 py-10 px-container bg-background">
        <Button size="lg">
          <Text>Registrovat se</Text>
        </Button>
        <Button onPress={signIn} variant="secondary" size="lg">
          <Text>Přihlásit se</Text>
        </Button>
      </View>
    </View>
  );
}
