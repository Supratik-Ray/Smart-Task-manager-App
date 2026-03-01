import { View, Text } from "react-native";
import React from "react";

export default function EmptyFilterState({ message }: { message: string }) {
  return (
    <View className="flex-1 justify-center items-center px-10 py-20">
      <Text className="text-xl font-semibold text-text-primary">
        No matching tasks
      </Text>
      <Text className="text-text-secondary mt-2 text-center">{message}</Text>
    </View>
  );
}
