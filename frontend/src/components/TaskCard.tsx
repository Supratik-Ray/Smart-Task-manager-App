import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type TaskCardProps = {
  name: string;
  description: string;
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  onDelete: () => void;
  onPress: () => void;
};

export default function TaskCard({
  name,
  description,
  dueDate,
  status,
  priority,
  onDelete,
  onPress,
}: TaskCardProps) {
  // STATUS STYLES
  const statusMap = {
    TODO: {
      label: "todo",
      badge: "bg-primary-light text-white",
      border: "#818CF8",
    },
    IN_PROGRESS: {
      label: "in progress",
      badge: "bg-yellow-100 text-yellow-700",
      border: "#f59e0b",
    },
    COMPLETED: {
      label: "completed",
      badge: "bg-green-100 text-green-700",
      border: "#22c55e",
    },
  };

  const current = statusMap[status];

  // PRIORITY COLORS
  const priorityColor =
    priority === "HIGH"
      ? "#ef4444"
      : priority === "MEDIUM"
        ? "#f59e0b"
        : "#10b981";

  // OVERDUE CHECK
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const isOverdue = due < today && status !== "COMPLETED";

  const confirmDelete = () => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(),
      },
    ]);
  };

  const renderRightActions = () => {
    return (
      <Pressable
        onPress={confirmDelete}
        className="bg-red-500 justify-center items-center w-24 rounded-r-2xl"
      >
        <Ionicons name="trash" size={22} color="white" />
      </Pressable>
    );
  };

  return (
    <Pressable onPress={onPress}>
      <View
        className="rounded-2xl overflow-hidden border-l"
        style={{ borderLeftWidth: 4, borderLeftColor: current.border }}
      >
        <Swipeable
          renderRightActions={renderRightActions}
          friction={2}
          rightThreshold={40}
          overshootRight={false}
        >
          <View className="bg-background-card  px-4 py-3 gap-2 ">
            {/* Menu
          <Ionicons
            name="ellipsis-horizontal"
            color="#9CA3AF"
            size={18}
            style={{ position: "absolute", right: 12, top: 12 }}
          /> */}

            {/* Status Row */}
            <View className="flex-row items-center gap-2">
              <Text
                className={`px-3 py-[2px] rounded-full text-[11px] font-semibold capitalize ${current.badge}`}
              >
                {current.label}
              </Text>

              {isOverdue && (
                <Text className="px-2 py-[2px] rounded-full bg-red-100 text-red-700 text-[11px] font-semibold">
                  overdue
                </Text>
              )}
            </View>

            {/* Title */}
            <Text className="text-[15px] font-semibold text-text-primary">
              {name}
            </Text>

            {/* Description */}
            <Text className="text-text-secondary text-[13px] leading-4">
              {description.length > 65
                ? description.slice(0, 65) + "..."
                : description}
            </Text>

            {/* Footer */}
            <View className="flex-row justify-between items-center mt-1">
              {/* Priority */}
              <View className="flex-row items-center gap-1">
                <View
                  style={{ backgroundColor: priorityColor }}
                  className="w-2 h-2 rounded-full"
                />
                <Text className="text-[12px] text-text-secondary capitalize">
                  {priority.toLowerCase()}
                </Text>
              </View>

              {/* Date */}
              <View className="flex-row items-center gap-1">
                <Ionicons name="calendar" color="#9CA3AF" size={14} />
                <Text className="text-[12px] text-text-secondary">
                  {new Date(dueDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    </Pressable>
  );
}
