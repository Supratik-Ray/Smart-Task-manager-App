import TaskCalender from "@/src/components/calender/TaskCalender";
import SearchArea from "@/src/components/home/SearchArea";
import TaskCard from "@/src/components/UI/TaskCard";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useTasksByDate } from "@/src/features/tasks/queries";
import { useState } from "react";

export default function Calender() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const { isLoading, data, error } = useTasksByDate(selectedDate);

  const router = useRouter();
  return (
    <View className="flex-1 p-8 pt-20 bg-background gap-6">
      <TaskCalender
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <SearchArea searchPlaceholder="Search Task" onOpenFilters={() => {}} />
      {isLoading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <FlatList
          data={data?.data.data}
          contentContainerClassName="gap-4"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              name={item.name}
              description={item.description}
              dueDate={item.dueDate}
              status={item.status}
              priority={item.priority}
              onDelete={() => {}}
              onPress={() =>
                router.push({
                  pathname: "/create-task",
                  params: { id: item.id },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}
