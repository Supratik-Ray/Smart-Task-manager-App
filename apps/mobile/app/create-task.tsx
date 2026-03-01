import PrimaryButton from "@/src/components/PrimaryButton";
import RadioButtonGroup from "@/src/components/RadioButtonGroup";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useTask } from "@/src/features/tasks/queries";
import { useCreateTask, useUpdateTask } from "@/src/features/tasks/mutations";
import { Priority, Status } from "@smart-task-manager/shared/dist";
import { Toast } from "toastify-react-native";
export default function CreateTask() {
  const params = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const updateTask = !!params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("TODO");
  const [priority, setPriority] = useState<Priority>("LOW");
  const [dueDate, setDueDate] = useState(new Date());

  const { data, isLoading, error } = useTask(params.id);
  const { mutate: mutateCreateTask, isPending: isCreating } = useCreateTask(
    () => {
      Toast.success("Successfully created task!");
      router.back();
    },
  );
  const { mutate: mutateUpdateTask, isPending: isUpdating } = useUpdateTask(
    () => {
      Toast.success("Successfully updated task");
      router.back();
    },
  );

  useLayoutEffect(() => {
    if (!updateTask) return;
    navigation.setOptions({ title: "Update Existing Task" });
  }, []);

  useEffect(() => {
    if (!updateTask) return;
    if (isLoading || !data) return;
    const task = data.data.data;
    setName(task.name ?? "");
    setDescription(task.description ?? "");
    setStatus(task.status ?? "TODO");
    setPriority(task.priority ?? "LOW");
    setDueDate(task.dueDate ? new Date(task.dueDate) : new Date());
  }, [data, isLoading, updateTask]);

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
      {error && <Text className="text-sm text-red-500">{error.message}</Text>}
      <View className="gap-2">
        <Text className="text-text-primary text-base font-semibold mb-1">
          Task Name
        </Text>
        <TextInput
          className="bg-background-card text-text-primary px-4 py-3 rounded-xl border border-border focus:border-primary focus:bg-background-card/80 placeholder:text-text-secondary text-base shadow-sm"
          placeholder="Enter task name..."
          placeholderTextColor="#64748B"
          value={name}
          onChangeText={(text) => setName(text)}
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
          value={description}
          onChangeText={(text) => setDescription(text)}
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
        onChange={(value) => setStatus(value as Status)}
      />
      <RadioButtonGroup
        label="Choose Priority"
        options={[
          { label: "Low", value: "LOW" },
          { label: "Medium", value: "MEDIUM" },
          { label: "High", value: "HIGH" },
        ]}
        value={priority}
        onChange={(value) => setPriority(value as Priority)}
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
          <Text className="p-3 text-white">{dueDate.toLocaleDateString()}</Text>
        </Pressable>
      </View>
      <PrimaryButton
        disabled={isCreating || isUpdating}
        onPress={
          updateTask
            ? () =>
                mutateUpdateTask({
                  id: params.id,
                  data: {
                    name,
                    description,
                    dueDate,
                    status,
                    priority,
                  },
                })
            : () => {
                mutateCreateTask({
                  name,
                  description,
                  dueDate,
                  status,
                  priority,
                });
              }
        }
      >
        {updateTask
          ? isUpdating
            ? "Updating..."
            : "Update Task"
          : isCreating
            ? "Creating..."
            : "Create Task"}
      </PrimaryButton>
    </View>
  );
}
