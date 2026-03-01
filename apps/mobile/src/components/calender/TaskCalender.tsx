import { Calendar } from "react-native-calendars";

export default function TaskCalender({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: string;
  onSelectDate: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Calendar
      style={{
        borderWidth: 0,
        borderRadius: 20,
        height: 340,
        backgroundColor: "#273244",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        paddingVertical: 16,
        paddingHorizontal: 12,
      }}
      theme={{
        backgroundColor: "#273244",
        calendarBackground: "#273244",
        textSectionTitleColor: "#94a3b8",
        selectedDayBackgroundColor: "#2563eb",
        selectedDayTextColor: "#fff",
        todayTextColor: "#38bdf8",
        dayTextColor: "#e2e8f0",
        textDisabledColor: "#64748b",
        dotColor: "#2563eb",
        arrowColor: "white",
        monthTextColor: "#e2e8f0",
        indicatorColor: "#2563eb",
        textDayFontFamily: "System",
        textMonthFontFamily: "System",
        textDayHeaderFontFamily: "System",
        textDayFontWeight: "600",
        textMonthFontWeight: "700",
        textDayHeaderFontWeight: "600",
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
        arrowStyle: {
          padding: 6,
          borderRadius: 999,
          backgroundColor: "#0F172A",
          marginHorizontal: 2,
        },
      }}
      current={selectedDate}
      onDayPress={(day) => {
        onSelectDate(day.dateString);
      }}
      onMonthChange={(date) => {
        // console.log(date);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#5B67F2",
        },
      }}
    />
  );
}
