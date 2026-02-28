import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignup } from "@/src/features/auth/mutations";
import { AxiosError } from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useSignup();

  useEffect(() => {
    if (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      Alert.alert("Error logging in!", axiosError.response?.data?.message);
    }
  }, [error]);

  return (
    <View className="flex-1 justify-center items-center bg-background px-8">
      <View className="w-full max-w-md bg-background-card p-8 rounded-2xl shadow-md gap-6">
        <Text className="text-2xl font-bold text-text-primary mb-2 text-center">
          Register
        </Text>
        <View className="gap-4">
          <View>
            <Text className="text-text-secondary mb-1 ml-1">Name</Text>
            <TextInput
              className="bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-200 focus:border-primary"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View>
            <Text className="text-text-secondary mb-1 ml-1">Email</Text>
            <TextInput
              className="bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-200 focus:border-primary"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="text-text-secondary mb-1 ml-1">Password</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg border border-gray-200 focus:border-primary px-2">
              <TextInput
                className="flex-1 text-black px-2 py-3"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#9CA3AF"
                  style={{ padding: 4 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="text-text-secondary mb-1 ml-1">
              Confirm Password
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg border border-gray-200 focus:border-primary px-2">
              <TextInput
                className="flex-1 text-black px-2 py-3"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary py-3 rounded-lg mt-2 shadow-sm"
          onPress={() => {
            mutate({ name, email, password });
          }}
        >
          {isPending ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text className="text-white text-center font-semibold text-base">
              Register
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center mt-2">
          <Text className="text-text-secondary">Already registered? </Text>
          <Link
            href="/(auth)/login"
            replace
            className="text-primary font-semibold"
          >
            Login
          </Link>
        </View>
      </View>
    </View>
  );
}
