import TaskCalender from "@/components/calender/TaskCalender";
import SearchArea from "@/components/home/SearchArea";
import TaskCard from "@/components/TaskCard";
import { View, FlatList } from "react-native";
import { type Task } from "./index";
import { useRouter } from "expo-router";
export const demoSections: Task[] = [
  {
    id: "t1",
    name: "Fix Navbar Alignment",
    description: "Resolve padding issue on smaller devices.",
    dueDate: "2026-02-28T10:00:00.000Z",
    status: "TODO",
    priority: "HIGH",
  },
  {
    id: "t2",
    name: "Update App Icon",
    description: "Replace placeholder icon with final version.",
    dueDate: "2026-02-28T12:00:00.000Z",
    status: "TODO",
    priority: "LOW",
  },

  {
    id: "t3",
    name: "Build Calendar Screen",
    description: "Implement date selection and marked dates.",
    dueDate: "2026-02-28T15:30:00.000Z",
    status: "IN_PROGRESS",
    priority: "HIGH",
  },

  {
    id: "t4",
    name: "Setup Project Structure",
    description: "Organize folders and create base components.",
    dueDate: "2026-02-28T09:00:00.000Z",
    status: "COMPLETED",
    priority: "MEDIUM",
  },
  {
    id: "t5",
    name: "Install Dependencies",
    description: "Install navigation, gesture handler and libs.",
    dueDate: "2026-02-28T08:00:00.000Z",
    status: "COMPLETED",
    priority: "LOW",
  },
];

export default function Calender() {
  const router = useRouter();
  return (
    <View className="flex-1 p-8 pt-20 bg-background gap-6">
      <TaskCalender />
      <SearchArea searchPlaceholder="Search Task" onOpenFilters={() => {}} />
      <FlatList
        data={demoSections}
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
              router.push({ pathname: "/create-task", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}
