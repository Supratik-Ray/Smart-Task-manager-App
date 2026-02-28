import FilterButton from "@/src/components/FilterButton";
import ActionButton from "@/src/components/home/ActionButton";
import SearchArea from "@/src/components/home/SearchArea";
import TodayProgressCard from "@/src/components/home/TodayProgressCard";
import UserGreeting from "@/src/components/home/UserGreeting";
import PrimaryButton from "@/src/components/PrimaryButton";
import RadioButtonGroup from "@/src/components/RadioButtonGroup";
import TaskCard from "@/src/components/TaskCard";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

import { useCallback, useRef } from "react";

import { FlatList, SectionList, Text, View } from "react-native";

type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string; // ISO string
  status: TaskStatus;
  priority: TaskPriority;
}

export const homeSections: { title: string; data: Task[] }[] = [
  {
    title: "Overdue",
    data: [
      {
        id: "o1",
        name: "Submit Internship Form",
        description: "Fill application and upload resume.",
        dueDate: "2026-02-25T18:00:00.000Z",
        status: "TODO",
        priority: "HIGH",
      },
      {
        id: "o2",
        name: "Fix Login API Bug",
        description: "Resolve token expiration issue.",
        dueDate: "2026-02-26T12:30:00.000Z",
        status: "IN_PROGRESS",
        priority: "HIGH",
      },
    ],
  },

  {
    title: "Today",
    data: [
      {
        id: "t1",
        name: "Build Home Screen UI",
        description: "Create sections and layout for dashboard.",
        dueDate: "2026-02-27T14:00:00.000Z",
        status: "TODO",
        priority: "HIGH",
      },
      {
        id: "t2",
        name: "Refactor Button Component",
        description: "Make reusable variant system.",
        dueDate: "2026-02-27T17:00:00.000Z",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
      },
    ],
  },

  {
    title: "Upcoming",
    data: [
      {
        id: "u1",
        name: "Implement Calendar Screen",
        description: "Add marked dates and task modal.",
        dueDate: "2026-03-01T11:00:00.000Z",
        status: "TODO",
        priority: "HIGH",
      },
      {
        id: "u2",
        name: "Add Priority Filters",
        description: "Filter tasks by HIGH/MEDIUM/LOW.",
        dueDate: "2026-03-02T16:00:00.000Z",
        status: "TODO",
        priority: "LOW",
      },
      {
        id: "u3",
        name: "Improve Animations",
        description: "Add micro-interactions to task cards.",
        dueDate: "2026-03-03T19:00:00.000Z",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
      },
    ],
  },
];

export default function Index() {
  const router = useRouter();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <View className="flex-1 p-10 mt-10 relative">
      <ActionButton />
      <UserGreeting />
      <TodayProgressCard />
      {/* <SearchArea onOpenFilters={handlePresentModalPress} /> */}
      {/* <Text className="text-2xl text-text-primary mt-8 font-semibold">
        {"Today's Tasks"}
      </Text> */}
      <View className="mt-8 gap-5 ">
        <SectionList
          contentContainerClassName="gap-4 pb-[250px]"
          sections={homeSections}
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
          SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderSectionHeader={({ section }) => (
            <View className="flex-row justify-between">
              <Text className="text-xl font-semibold text-white">
                {section.title}
              </Text>
              <FilterButton onOpenFilters={handlePresentModalPress} size={16} />
            </View>
          )}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={["30%"]}
        index={1}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: "#273244",
          borderRadius: 24,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#64748b",
        }}
      >
        <BottomSheetView className="flex-1 w-full px-6 pt-4 pb-10 gap-6">
          <Text className="text-lg font-bold text-white mb-2">
            Select Filters
          </Text>
          <View className="gap-2">
            <Text className="text-base font-semibold text-white">Status</Text>
            <RadioButtonGroup
              options={[
                { label: "All", value: "ALL" },
                { label: "To Do", value: "TODO" },
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "Completed", value: "COMPLETED" },
              ]}
              value={"ALL"}
              onChange={() => {}}
            />
          </View>
          <View className="gap-2">
            <Text className="text-base font-semibold text-white">Priority</Text>
            <RadioButtonGroup
              options={[
                { label: "All", value: "ALL" },
                { label: "Low", value: "LOW" },
                { label: "Medium", value: "MEDIUM" },
                { label: "High", value: "HIGH" },
              ]}
              value={"ALL"}
              onChange={() => {}}
            />
          </View>
          <View className="mt-auto">
            <PrimaryButton>Apply Filters</PrimaryButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
