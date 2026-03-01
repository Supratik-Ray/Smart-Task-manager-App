import { useAuth } from "@/src/hooks/useAuth";
import { formatAvatarName } from "@/src/utils/formatAvatarName";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function UserGreeting() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-center">
      <View>
        {/* <Text className="text-text-secondary">Good Morning,</Text> */}
        <Text className="text-text-primary text-xl font-semibold">
          Hey, {user?.name.split(" ")[0]} 👋
        </Text>
      </View>
      <Pressable
        className="h-14 w-14 bg-primary rounded-full justify-center items-center"
        onPress={() => {
          router.replace("/(tabs)/profile");
        }}
      >
        <Text className="text-lg text-text-primary">
          {formatAvatarName(user?.name ?? "")}
        </Text>
      </Pressable>
    </View>
  );
}
