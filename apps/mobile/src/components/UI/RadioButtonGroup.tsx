import React from "react";
import { View, Text, Pressable } from "react-native";

export type RadioOption = {
  label: string;
  value: string;
};

interface RadioButtonGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <View>
      {label && (
        <Text className="mb-2 text-base font-semibold text-text-primary">
          {label}
        </Text>
      )}
      <View className="flex-row gap-8">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className="flex-row items-center"
            accessibilityRole="radio"
            accessibilityState={{ selected: value === option.value }}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 border-primary items-center justify-center mr-2 ${
                value === option.value ? "bg-primary" : "bg-transparent"
              }`}
            >
              {value === option.value && (
                <View className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </View>
            <Text className="text-base text-text-primary">{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default RadioButtonGroup;
