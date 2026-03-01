import { View, Text, SectionList, RefreshControl } from "react-native";
import React from "react";
import TaskCard from "../TaskCard";
import { useRouter } from "expo-router";
import { HomeBuckets } from "@smart-task-manager/shared";
import { useDeleteTask } from "@/src/features/tasks/mutations";
import { Toast } from "toastify-react-native";

export default function SectionBuckets({
  isRefetching,
  onRefetch,
  sections,
}: {
  isRefetching: boolean;

  onRefetch: () => void;
  sections: HomeBuckets["data"];
}) {
  const router = useRouter();
  const { mutate } = useDeleteTask(() => {
    Toast.success("Successfully deleted task!");
  });
  return (
    <SectionList
      refreshing={isRefetching}
      onRefresh={onRefetch}
      contentContainerClassName="gap-4"
      sections={sections}
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
      SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderSectionHeader={({ section }) => (
        <View className="flex-row justify-between">
          <Text className="text-xl font-semibold text-white">
            {section.title}
          </Text>
        </View>
      )}
    />
  );
}
