import { Text, Pressable } from "react-native";
import React from "react";

export default function PrimaryButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Pressable className="py-4 px-8 bg-primary rounded-xl active:bg-primary/80 transform transition-colors duration-300">
      <Text className="text-white text-center">{children}</Text>
    </Pressable>
  );
}
