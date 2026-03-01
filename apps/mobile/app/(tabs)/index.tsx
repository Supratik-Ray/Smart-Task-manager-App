import FilterBottomSheet from "@/src/components/UI/FilterBottomSheet";
import FilterButton from "@/src/components/UI/FilterButton";
import ActionButton from "@/src/components/home/ActionButton";
import SectionBuckets from "@/src/components/home/SectionBuckets";
import TodayProgressCard from "@/src/components/home/TodayProgressCard";
import UserGreeting from "@/src/components/home/UserGreeting";

import { useHomeBuckets } from "@/src/features/tasks/queries";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Priority, Status } from "@smart-task-manager/shared";

/* ---------------- UI STATES ---------------- */
import LoadingState from "@/src/components/UI/LoadingState";
import ErrorState from "@/src/components/UI/ErrorState";
import EmptyTasksState from "@/src/components/UI/EmptyTasksState";
import EmptyFilterState from "@/src/components/UI/EmptyFilterState";
import { filterBuckets } from "@/src/utils/filterBuckets";

export default function Index() {
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "ALL">("ALL");

  const { data, isLoading, error, refetch, isRefetching } = useHomeBuckets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const rawBuckets = data?.data?.data;
  const todayBucket = rawBuckets?.find((b) => b.title === "Today");
  const todayTotal = todayBucket?.data.length ?? 0;
  const todayCompleted =
    todayBucket?.data.filter((t) => t.status === "COMPLETED").length ?? 0;

  /* ---------- FILTER LOGIC ---------- */

  const filteredBuckets = useMemo(
    () =>
      filterBuckets(rawBuckets, {
        status: statusFilter,
        priority: priorityFilter,
      }),
    [rawBuckets, statusFilter, priorityFilter],
  );

  let content;

  if (isLoading || isRefetching) {
    content = <LoadingState />;
  } else if (error || !data) {
    content = <ErrorState />;
  } else if (
    !rawBuckets ||
    (rawBuckets[0].data.length === 0 &&
      rawBuckets[1].data.length === 0 &&
      rawBuckets[2].data.length === 0)
  ) {
    content = <EmptyTasksState />;
  } else if (filteredBuckets.length === 0) {
    content = <EmptyFilterState />;
  } else {
    content = (
      <SectionBuckets
        sections={filteredBuckets}
        onRefetch={refetch}
        isRefetching={isRefetching}
      />
    );
  }

  return (
    <View className="relative flex-1 p-10 mt-10">
      <ActionButton />
      <UserGreeting />
      <TodayProgressCard total={todayTotal} completed={todayCompleted} />

      <View className="flex-row justify-between mt-8">
        <Text className="text-2xl text-text-primary font-semibold">
          Your Tasks
        </Text>

        <FilterButton
          size={20}
          onOpenFilters={() => bottomSheetModalRef.current?.present()}
        />
      </View>

      <View className="mt-8 gap-5 flex-1">{content}</View>

      <FilterBottomSheet
        modalRef={bottomSheetModalRef}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        allowCompletedStatus={false}
      />
    </View>
  );
}
