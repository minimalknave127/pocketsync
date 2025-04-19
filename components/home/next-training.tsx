import { View } from "react-native";
import { Text } from "../ui/text";

export default function NextTrainingCard() {
  return (
    <View className="bg-primary rounded-3xl p-5 mt-4">
      <Text className="text-white font-semibold text-3xl">12:21</Text>
      <Text className="text-white text-sm mt-1">Začíná za 10 minut</Text>
      <Text className="text-white font-medium mt-4 text-xl">Tomáš Novák</Text>
      <Text className="text-white text-sm mt-1">Workout nohou 2</Text>
    </View>
  );
}
