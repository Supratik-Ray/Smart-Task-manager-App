import PrimaryButton from "../../src/components/UI/PrimaryButton";
import { useAuth } from "@/src/hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

export default function Settings() {
  const { logout, user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <View className="flex-1 bg-background px-6 pt-16 justify-between">
      {/* TOP */}
      <View className="items-center">
        {/* Initial Avatar */}
        <View className="w-28 h-28 rounded-full bg-primary items-center justify-center shadow-lg mb-4">
          <Text className="text-3xl font-bold text-white">{initials}</Text>
        </View>

        {/* Name */}
        <Text className="text-2xl font-bold text-text-primary">
          {user?.name ?? "User Name"}
        </Text>

        {/* Email */}
        <Text className="text-text-secondary mt-1">
          {user?.email ?? "email@example.com"}
        </Text>

        {/* Info Card */}
        <View className="w-full mt-10 bg-background-card rounded-2xl p-5 border border-border gap-4">
          <View>
            <Text className="text-text-secondary text-sm">Full Name</Text>
            <Text className="text-text-primary text-base font-medium mt-1">
              {user?.name}
            </Text>
          </View>

          <View>
            <Text className="text-text-secondary text-sm">Email Address</Text>
            <Text className="text-text-primary text-base font-medium mt-1">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      {/* LOGOUT */}
      <View className="pb-10">
        <PrimaryButton
          onPress={logout}
          className="bg-red-400 active:bg-red-500"
          icon="exit"
        >
          Logout
        </PrimaryButton>
      </View>
    </View>
  );
}
