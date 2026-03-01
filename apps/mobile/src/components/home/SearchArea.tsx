import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import FilterButton from "../UI/FilterButton";

export default function SearchArea({
  onChangeText,
  onOpenFilters,
  searchPlaceholder,
}: {
  onChangeText: (value: string) => void;
  onOpenFilters: () => void;
  searchPlaceholder: string;
}) {
  return (
    <View className="flex-row  gap-4">
      <View className="flex-1">
        <SearchBar
          placeholder={searchPlaceholder}
          onChangeText={onChangeText}
        />
      </View>
      <FilterButton onOpenFilters={onOpenFilters} size={22} />
    </View>
  );
}
