import { View, Text } from "react-native";
import { useCallback, useState } from "react";
import RadioButtonGroup from "./RadioButtonGroup";
import PrimaryButton from "./PrimaryButton";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Priority, Status } from "@smart-task-manager/shared";

type FilterBottomSheetProps = {
  modalRef: React.RefObject<BottomSheetModal | null>;
  allowCompletedStatus?: boolean;
  onStatusChange: (value: Status | "ALL") => void;
  onPriorityChange: (value: Priority | "ALL") => void;
};

export default function FilterBottomSheet({
  modalRef,
  allowCompletedStatus = true,
  onStatusChange,
  onPriorityChange,
}: FilterBottomSheetProps) {
  const [statusValue, setStatusValue] = useState<Status | "ALL">("ALL");
  const [priorityValue, setPriorityValue] = useState<Priority | "ALL">("ALL");

  function onApplyFilters() {
    onStatusChange(statusValue);
    onPriorityChange(priorityValue);
    modalRef.current?.dismiss();
  }

  let statusOptions = [
    { label: "All", value: "ALL" },
    { label: "To Do", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  if (allowCompletedStatus) {
    statusOptions = [
      ...statusOptions,
      { label: "Completed", value: "COMPLETED" },
    ];
  }

  const priorityOptions = [
    { label: "All", value: "ALL" },
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
  ];

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

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
    <BottomSheetModal
      ref={modalRef}
      // onChange={handleSheetChanges}
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
            options={statusOptions}
            value={statusValue}
            onChange={(value) => {
              setStatusValue(value as Status | "ALL");
            }}
          />
        </View>
        <View className="gap-2">
          <Text className="text-base font-semibold text-white">Priority</Text>
          <RadioButtonGroup
            options={priorityOptions}
            value={priorityValue}
            onChange={(value) => {
              setPriorityValue(value as Priority | "ALL");
            }}
          />
        </View>
        <View className="mt-auto">
          <PrimaryButton onPress={onApplyFilters}>Apply Filters</PrimaryButton>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
