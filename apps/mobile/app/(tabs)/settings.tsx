import PrimaryButton from "@/src/components/PrimaryButton";
import { useAuth } from "@/src/hooks/useAuth";
import { View, Text } from "react-native";

export default function Settings() {
  const { logout } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>settings</Text>
      <PrimaryButton onPress={logout}>Logout</PrimaryButton>
    </View>
  );
}
