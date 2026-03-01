import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignup } from "@/src/features/auth/mutations";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function Register() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignup();

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const newErrors: Errors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    const confirm = form.confirmPassword.trim();

    if (!name) newErrors.name = "Name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = "Password must contain uppercase letter and number";
    }

    if (!confirm) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (confirm !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---------------- SUBMIT ---------------- */
  function handleSubmit() {
    if (!validate()) return;

    mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    });
  }

  /* ---------------- INPUT HELPER ---------------- */
  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <View className="flex-1 justify-center items-center bg-background px-8">
      <View className="w-full max-w-md bg-background-card p-8 rounded-2xl shadow-md gap-6">
        <Text className="text-2xl font-bold text-text-primary text-center">
          Register
        </Text>

        {/* NAME */}
        <View>
          <Text className="text-text-secondary mb-1 ml-1">Name</Text>
          <TextInput
            value={form.name}
            onChangeText={(t) => updateField("name", t)}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            className={`px-4 py-3 rounded-lg border bg-gray-100 text-black
              ${errors.name ? "border-red-500" : "border-gray-200"}`}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
          )}
        </View>

        {/* EMAIL */}
        <View>
          <Text className="text-text-secondary mb-1 ml-1">Email</Text>
          <TextInput
            value={form.email}
            onChangeText={(t) => updateField("email", t)}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className={`px-4 py-3 rounded-lg border bg-gray-100 text-black
              ${errors.email ? "border-red-500" : "border-gray-200"}`}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          )}
        </View>

        {/* PASSWORD */}
        <View>
          <Text className="text-text-secondary mb-1 ml-1">Password</Text>

          <View
            className={`flex-row items-center rounded-lg border px-2 bg-gray-100
            ${errors.password ? "border-red-500" : "border-gray-200"}`}
          >
            <TextInput
              value={form.password}
              onChangeText={(t) => updateField("password", t)}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-black px-2 py-3"
            />

            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}
        </View>

        {/* CONFIRM PASSWORD */}
        <View>
          <Text className="text-text-secondary mb-1 ml-1">
            Confirm Password
          </Text>

          <TextInput
            value={form.confirmPassword}
            onChangeText={(t) => updateField("confirmPassword", t)}
            secureTextEntry={false}
            placeholder="Confirm your password"
            placeholderTextColor="#9CA3AF"
            className={`px-4 py-3 rounded-lg border bg-gray-100 text-black
              ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
          />

          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        {/* SUBMIT */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isPending}
          className="bg-primary py-3 rounded-lg mt-2 shadow-sm"
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-base">
              Register
            </Text>
          )}
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-text-secondary">Already registered?</Text>
          <Link
            href="/(auth)/login"
            replace
            className="text-primary font-semibold ml-1"
          >
            Login
          </Link>
        </View>
      </View>
    </View>
  );
}
