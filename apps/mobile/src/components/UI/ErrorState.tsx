import { View, Text } from "react-native";
import React from "react";

export default function ErrorState() {
  return (
    <View className="flex-1 justify-center items-center px-10 py-20">
      <Text className="text-xl font-semibold text-red-500">
        Something went wrong!
      </Text>
      <Text className="text-text-secondary mt-2 text-center">
        We couldn’t load your tasks. Please try again.
      </Text>
    </View>
  );
}
