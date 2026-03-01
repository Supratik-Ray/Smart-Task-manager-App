import { View, Text } from "react-native";
import ProgressRing from "./ProgressRing";

type TodayProgressCardProps = {
  total: number;
  completed: number;
};

export default function TodayProgressCard({
  total,
  completed,
}: TodayProgressCardProps) {
  const progressPercentage = Math.round(completed / total) * 100;
  return (
    <View className="bg-background-card p-10 mt-8 rounded-2xl flex-row justify-between">
      <View>
        <Text className="bg-primary text-text-primary py-1 px-3 rounded-full self-start">
          {"Today's Tasks"}
        </Text>
        <View className="flex-row items-end gap-3 mt-4">
          <Text className="text-4xl font-bold text-text-primary">
            {completed}
          </Text>
          <Text className="text-2xl text-text-secondary">/</Text>
          <Text className="text-2xl text-text-secondary">{total}</Text>
        </View>
        <Text className="mt-4 text-text-secondary">Tasks completed</Text>
        <Text className="mt-4 text-primary">You are almost there! 🚀</Text>
      </View>
      <ProgressRing fill={progressPercentage} size={100} width={10} />
    </View>
  );
}
