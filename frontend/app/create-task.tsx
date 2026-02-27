import PrimaryButton from "@/components/PrimaryButton";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function CreateTask() {
  const params = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const updateTask = !!params.id;
  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState(new Date());

  useLayoutEffect(() => {
    if (!updateTask) return;
    navigation.setOptions({
      title: "Update Existing Task",
    });
  }, []);

  function openDateTimePicker() {
    DateTimePickerAndroid.open({
      value: dueDate,
      mode: "date",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        if (selectedDate) setDueDate(selectedDate);
      },
    });
  }
  return (
    <View className="flex-1 p-8 bg-background gap-6">
      <View className="gap-2">
        <Text className="text-text-primary text-base font-semibold mb-1">
          Task Name
        </Text>
        <TextInput
          className="bg-background-card text-text-primary px-4 py-3 rounded-xl border border-border focus:border-primary focus:bg-background-card/80 placeholder:text-text-secondary text-base shadow-sm"
          placeholder="Enter task name..."
          placeholderTextColor="#64748B"
        />
      </View>
      <View className="gap-2">
        <Text className="text-text-primary text-base font-semibold mb-1">
          Description
        </Text>
        <TextInput
          className="bg-background-card text-text-primary px-4 py-3 rounded-xl border border-border focus:border-primary focus:bg-background-card/80 placeholder:text-text-secondary text-base min-h-40 max-h-56 shadow-sm"
          placeholder="Enter task description..."
          placeholderTextColor="#64748B"
          multiline
          scrollEnabled
          textAlignVertical="top"
        />
      </View>
      <RadioButtonGroup
        label="Choose status"
        options={[
          { label: "Todo", value: "TODO" },
          { label: "In Progress", value: "IN_PROGRESS" },
          { label: "Completed", value: "COMPLETED" },
        ]}
        value={status}
        onChange={(value) => setStatus(value)}
      />
      <RadioButtonGroup
        label="Choose Priority"
        options={[
          { label: "Low", value: "LOW" },
          { label: "Medium", value: "MEDIUM" },
          { label: "High", value: "HIGH" },
        ]}
        value={priority}
        onChange={(value) => setPriority(value)}
      />
      {/* DueDate picker */}
      <View>
        <Text className="text-text-primary text-base font-semibold mb-1">
          choose Due Date
        </Text>
        <Pressable
          onPress={openDateTimePicker}
          className="rounded-xl overflow-hidden border border-primary self-start flex-row gap-1 px-4 items-center"
        >
          <Ionicons name="calendar" size={20} color={"#5B67F2"} />
          <Text className="p-3  text-white">
            {dueDate.toLocaleDateString()}
          </Text>
        </Pressable>
      </View>

      <PrimaryButton>
        {updateTask ? "Update Task" : "Create Task"}
      </PrimaryButton>
    </View>
  );
}
