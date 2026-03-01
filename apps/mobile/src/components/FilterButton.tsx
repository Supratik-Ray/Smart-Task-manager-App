import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FilterButton({
  onOpenFilters,
  size
}: {
  onOpenFilters: () => void;
  size:number
}) {
  return (
    <Pressable
      className="bg-background-card rounded-xl px-4  items-center justify-center"
      onPress={onOpenFilters}
    >
      <Ionicons name="filter" size={size} color="#9CA3AF" />
    </Pressable>
  );
}
