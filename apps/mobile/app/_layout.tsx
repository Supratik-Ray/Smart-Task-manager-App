import "../global.css";
import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { AuthProvider } from "@/src/contexts/AuthContext";
import { useAuth } from "@/src/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//toast
import ToastManager, { Toast } from "toastify-react-native";

import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#0F172A");

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        Toast.error(error.message);
      },
    },
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
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
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigator />
          <ToastManager />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
