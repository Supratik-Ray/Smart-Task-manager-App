import TaskCalender from "@/src/components/calender/TaskCalender";
import SearchArea from "@/src/components/home/SearchArea";
import TaskCard from "@/src/components/UI/TaskCard";
import FilterBottomSheet from "@/src/components/UI/FilterBottomSheet";

import { View, FlatList } from "react-native";

import { useRouter } from "expo-router";
import { useTasksByDate } from "@/src/features/tasks/queries";

import { useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Priority, Status } from "@smart-task-manager/shared";

import EmptyTasksState from "@/src/components/UI/EmptyTasksState";
import EmptyFilterState from "@/src/components/UI/EmptyFilterState";
import ErrorState from "@/src/components/UI/ErrorState";
import LoadingState from "@/src/components/UI/LoadingState";
import { useDeleteTask } from "@/src/features/tasks/mutations";
import { Toast } from "toastify-react-native";

export default function Calender() {
  const { mutate } = useDeleteTask(() => {
    Toast.success("Successfully deleted task!");
  });
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /* ---------------- DATE STATE ---------------- */
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );

  /* ---------------- FILTER + SEARCH STATE ---------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "ALL">("ALL");

  /* ---------------- FETCH TASKS ---------------- */
  const { isLoading, data, error } = useTasksByDate(selectedDate);

  const tasks = data?.data?.data ?? [];

  /* ---------------- FILTER + SEARCH LOGIC ---------------- */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (statusFilter !== "ALL" && task.status !== statusFilter) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== "ALL" && task.priority !== priorityFilter) {
        return false;
      }

      // Search filter (name + description)
      if (searchQuery) {
        const lower = searchQuery.toLowerCase();

        const matchesName = task.name?.toLowerCase().includes(lower);

        const matchesDescription = task.description
          ?.toLowerCase()
          .includes(lower);

        if (!matchesName && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  /* ---------------- CONTENT STATE HANDLING ---------------- */
  let content;

  if (isLoading) {
    content = <LoadingState message="Loading tasks..." />;
  } else if (error) {
    content = <ErrorState />;
  } else if (tasks.length === 0) {
    content = (
      <EmptyTasksState
        title="No tasks found for this date!"
        message="Try adding some tasks"
      />
    );
  } else if (filteredTasks.length === 0) {
    content = (
      <EmptyFilterState message="Try adjusting your filters or change search query" />
    );
  } else {
    content = (
      <FlatList
        data={filteredTasks}
        contentContainerClassName="gap-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            name={item.name}
            description={item.description}
            dueDate={item.dueDate}
            status={item.status}
            priority={item.priority}
            onDelete={() => {
              mutate(item.id);
            }}
            onPress={() =>
              router.push({
                pathname: "/create-task",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <View className="flex-1 p-8 pt-20 bg-background gap-6">
      <TaskCalender
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <SearchArea
        searchPlaceholder="Search Task"
        onChangeText={setSearchQuery}
        onOpenFilters={() => bottomSheetModalRef.current?.present()}
      />

      <View className="flex-1">{content}</View>

      <FilterBottomSheet
        modalRef={bottomSheetModalRef}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        allowCompletedStatus
      />
    </View>
  );
}
