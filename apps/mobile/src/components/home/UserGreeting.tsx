import { useAuth } from "@/src/hooks/useAuth";
import { View, Text } from "react-native";

export default function UserGreeting() {
  const { user } = useAuth();
  return (
    <View className="flex-row justify-between">
      <View>
        <Text className="text-text-secondary">Good Morning,</Text>
        <Text className="text-text-primary text-2xl font-semibold">
          Hey {user?.name} 👋
        </Text>
      </View>
      <View className="h-14 w-14 bg-primary rounded-full justify-center items-center">
        <Text className="text-lg text-text-primary">AR</Text>
      </View>
    </View>
  );
}
