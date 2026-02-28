import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text } from "react-native";

type ProgressRingProps = {
  size?: number;
  width?: number;
  fill: number;
  tintColor?: string;
  backgroundColor?: string;
};

export default function ProgressRing({
  size = 120,
  width = 12,
  fill,
  tintColor = "#5B67F2",
  backgroundColor = "#1F2937",
}: ProgressRingProps) {
  return (
    <View className="items-center justify-center">
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        rotation={0}
      >
        {(fill: number) => (
          <Text className="text-text-primary text-xl font-bold">
            {Math.round(fill)}%
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
