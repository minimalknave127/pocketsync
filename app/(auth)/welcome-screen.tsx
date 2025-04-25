import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Image, SafeAreaView, View } from "react-native";

export default function WelcomeScreen() {
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
        <Link href={"/sign-up"} asChild>
          <Button size="lg">
            <Text>Registrovat se</Text>
          </Button>
        </Link>
        <Link href="/sign-in" asChild>
          <Button variant="secondary" size="lg">
            Přihlásit se
          </Button>
        </Link>
      </View>
    </View>
  );
}
