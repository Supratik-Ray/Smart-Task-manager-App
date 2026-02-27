import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function ActionButton() {
  const router = useRouter();
  return (
    <Pressable
      className="absolute h-16 w-16 shadow-lg bg-primary rounded-full justify-center items-center right-8 bottom-8 z-10"
      onPress={() => router.push("/create-task")}
    >
      <Ionicons name="add" size={30} color={"white"} />
    </Pressable>
  );
}
