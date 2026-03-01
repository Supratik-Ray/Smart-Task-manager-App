import { View, Text } from "react-native";
import React from "react";

export default function EmptyTasksState() {
  return (
    <View className="flex-1 justify-center items-center px-10 py-20">
      <Text className="text-xl font-semibold text-text-primary">
        No tasks yet
      </Text>
      <Text className="text-text-secondary mt-2 text-center">
        Tap the + button to create your first task.
      </Text>
    </View>
  );
}
