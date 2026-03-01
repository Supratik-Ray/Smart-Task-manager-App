import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TextInput } from "react-native";

export default function SearchBar({
  placeholder,
  onChangeText,
}: {
  placeholder: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View className="relative">
      <Ionicons
        name="search"
        className="absolute top-1/2 -translate-y-1/2 left-5 z-10"
        color="#9CA3AF"
        size={20}
      />
      <TextInput
        className="bg-background-card rounded-xl p-5 pl-12 text-white"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
}
