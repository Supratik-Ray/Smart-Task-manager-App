import PrimaryButton from "../src/components/UI/PrimaryButton";
import RadioButtonGroup from "../src/components/UI/RadioButtonGroup";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useTask } from "@/src/features/tasks/queries";
import { useCreateTask, useUpdateTask } from "@/src/features/tasks/mutations";
import { Priority, Status } from "@smart-task-manager/shared/dist";
import { Toast } from "toastify-react-native";
import LoadingState from "@/src/components/UI/LoadingState";

type Errors = {
  name?: string;
  description?: string;
};

type FormState = {
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
};

export default function CreateTask() {
  const params = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const updateTask = !!params.id;

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    status: "TODO",
    priority: "LOW",
    dueDate: new Date(),
  });

  const [errors, setErrors] = useState<Errors>({});

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

  /* ---------------- HEADER TITLE ---------------- */
  useLayoutEffect(() => {
    if (!updateTask) return;
    navigation.setOptions({ title: "Update Existing Task" });
  }, []);

  /* ---------------- PREFILL DATA ---------------- */
  useEffect(() => {
    if (!updateTask) return;
    if (isLoading || !data) return;

    const task = data.data.data;

    setForm({
      name: task.name ?? "",
      description: task.description ?? "",
      status: task.status ?? "TODO",
      priority: task.priority ?? "LOW",
      dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
    });
  }, [data, isLoading, updateTask]);

  /* ---------------- VALIDATION ---------------- */
  function validate(): boolean {
    const newErrors: Errors = {};

    const trimmedName = form.name.trim();
    const trimmedDesc = form.description.trim();

    if (!trimmedName) {
      newErrors.name = "Task name is required";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!trimmedDesc) {
      newErrors.description = "Description is required";
    } else if (trimmedDesc.length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    } else if (trimmedDesc.length > 30) {
      newErrors.description = "Description must be ≤ 30 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---------------- DATE PICKER ---------------- */
  function openDateTimePicker() {
    DateTimePickerAndroid.open({
      value: form.dueDate,
      mode: "date",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        if (selectedDate) {
          setForm((prev) => ({
            ...prev,
            dueDate: selectedDate,
          }));
        }
      },
    });
  }

  /* ---------------- SUBMIT ---------------- */
  function handleSubmit() {
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      status: form.status,
      priority: form.priority,
    };

    if (updateTask) {
      mutateUpdateTask({ id: params.id, data: payload });
    } else {
      mutateCreateTask(payload);
    }
  }

  if (updateTask && isLoading) {
    return <LoadingState message="Fetching task..." />;
  }

  /* ---------------- UI ---------------- */
  return (
    <View className="flex-1 p-8 bg-background gap-6">
      {error && <Text className="text-sm text-red-500">{error.message}</Text>}

      {/* NAME */}
      <View className="gap-2">
        <Text className="text-text-primary text-base font-semibold">
          Task Name
        </Text>

        <TextInput
          value={form.name}
          onChangeText={(text) => {
            setForm((prev) => ({ ...prev, name: text }));
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          placeholder="Enter task name..."
          placeholderTextColor="#64748B"
          className={`bg-background-card px-4 py-3 rounded-xl border text-text-primary
            ${errors.name ? "border-red-500" : "border-border"}`}
        />

        {errors.name && (
          <Text className="text-red-500 text-sm">{errors.name}</Text>
        )}
      </View>

      {/* DESCRIPTION */}
      <View className="gap-2">
        <Text className="text-text-primary text-base font-semibold">
          Description
        </Text>

        <TextInput
          value={form.description}
          multiline
          textAlignVertical="top"
          onChangeText={(text) => {
            setForm((prev) => ({ ...prev, description: text }));
            if (errors.description)
              setErrors((p) => ({ ...p, description: undefined }));
          }}
          placeholder="Enter task description..."
          placeholderTextColor="#64748B"
          className={`bg-background-card px-4 py-3 rounded-xl border text-text-primary min-h-40
            ${errors.description ? "border-red-500" : "border-border"}`}
        />

        {errors.description && (
          <Text className="text-red-500 text-sm">{errors.description}</Text>
        )}
      </View>

      {/* STATUS */}
      <RadioButtonGroup
        label="Choose status"
        options={[
          { label: "Todo", value: "TODO" },
          { label: "In Progress", value: "IN_PROGRESS" },
          { label: "Completed", value: "COMPLETED" },
        ]}
        value={form.status}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            status: value as Status,
          }))
        }
      />

      {/* PRIORITY */}
      <RadioButtonGroup
        label="Choose Priority"
        options={[
          { label: "Low", value: "LOW" },
          { label: "Medium", value: "MEDIUM" },
          { label: "High", value: "HIGH" },
        ]}
        value={form.priority}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            priority: value as Priority,
          }))
        }
      />

      {/* DATE */}
      <View>
        <Text className="text-text-primary text-base font-semibold mb-1">
          Choose Due Date
        </Text>

        <Pressable
          onPress={openDateTimePicker}
          className="rounded-xl border border-primary flex-row gap-2 px-4 items-center self-start"
        >
          <Ionicons name="calendar" size={20} color="#5B67F2" />
          <Text className="p-3 text-white">
            {form.dueDate.toLocaleDateString()}
          </Text>
        </Pressable>
      </View>

      {/* BUTTON */}
      <PrimaryButton disabled={isCreating || isUpdating} onPress={handleSubmit}>
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
