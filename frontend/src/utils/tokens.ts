import * as SecureStore from "expo-secure-store";

export function saveAuthToken(token: string) {
  return SecureStore.setItemAsync("token", "token");
}

export function getAuthToken() {
  return SecureStore.getItemAsync("token");
}

export function deleteAuthToken() {
  return SecureStore.deleteItemAsync("token");
}
