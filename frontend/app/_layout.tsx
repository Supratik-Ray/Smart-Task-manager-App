import "../global.css";
import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

//bottomsheet modal
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import * as SystemUI from "expo-system-ui";
SystemUI.setBackgroundColorAsync("#0F172A");

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const isAuthenticated = true;
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0F172A" },
          }}
        >
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Screen
            name="create-task"
            options={{
              presentation: "modal",
              animation: "slide_from_right",
              headerShown: true,
              title: "Create New Task",
              contentStyle: { backgroundColor: "#0F172A" },
              headerStyle: { backgroundColor: "#111827" },
              headerTintColor: "white",
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
