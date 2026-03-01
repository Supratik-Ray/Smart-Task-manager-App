import { View, Text, Pressable } from "react-native";
import React from "react";
import { cn } from "@/src/utils/cn";
import Ionicons from "@expo/vector-icons/Ionicons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function PrimaryButton({
  icon,
  className,
  disabled,
  children,
  onPress,
}: {
  icon?: IoniconName;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className={cn(
        "py-4 px-8 rounded-xl active:bg-primary/80 transform transition-colors duration-300",
        disabled ? "bg-primary-light" : "bg-primary",
        className,
      )}
      onPress={disabled ? () => {} : onPress}
    >
      {icon ? (
        <View className="items-center flex-row justify-center gap-2">
          <Ionicons name={icon} color="white" size={20} />
          <Text className="text-white">{children}</Text>
        </View>
      ) : (
        <Text className="text-white text-center ">{children}</Text>
      )}
    </Pressable>
  );
}
