import { Text, Pressable } from "react-native";
import React from "react";

export default function PrimaryButton({
  disabled,
  children,
  onPress,
}: {
  disabled: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className={`py-4 px-8 ${disabled ? "bg-primary-light" : "bg-primary"} rounded-xl active:bg-primary/80 transform transition-colors duration-300`}
      onPress={disabled ? () => {} : onPress}
    >
      <Text className="text-white text-center">{children}</Text>
    </Pressable>
  );
}
