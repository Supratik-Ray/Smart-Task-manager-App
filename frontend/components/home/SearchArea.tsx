import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import FilterButton from "../FilterButton";

export default function SearchArea({
  onOpenFilters,
  searchPlaceholder,
}: {
  onOpenFilters: () => void;
  searchPlaceholder: string;
}) {
  return (
    <View className="flex-row  gap-4">
      <View className="flex-1">
        <SearchBar placeholder={searchPlaceholder} />
      </View>
      <FilterButton onOpenFilters={onOpenFilters} size={22} />
    </View>
  );
}
