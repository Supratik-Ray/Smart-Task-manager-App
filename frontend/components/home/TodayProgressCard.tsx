import { View, Text } from "react-native";
import ProgressRing from "./ProgressRing";

export default function TodayProgressCard() {
  return (
    <View className="bg-background-card p-10 mt-8 rounded-2xl flex-row justify-between">
      <View>
        <Text className="bg-primary text-text-primary py-1 px-3 rounded-full self-start">
          {"Today's Tasks"}
        </Text>
        <View className="flex-row items-end gap-3 mt-4">
          <Text className="text-4xl font-bold text-text-primary">8</Text>
          <Text className="text-2xl text-text-secondary">/</Text>
          <Text className="text-2xl text-text-secondary">12</Text>
        </View>
        <Text className="mt-4 text-text-secondary">Tasks completed</Text>
        <Text className="mt-4 text-primary">You are almost there! 🚀</Text>
      </View>
      <ProgressRing fill={66} size={100} width={10} />
    </View>
  );
}
