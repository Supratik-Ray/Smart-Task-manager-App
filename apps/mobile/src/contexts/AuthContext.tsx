import { createContext, useEffect, useState } from "react";
import { deleteAuthToken, getAuthToken, saveAuthToken } from "../utils/tokens";
import { setAuthToken } from "../utils/authTokenStore";
import { useMe } from "../features/auth/queries";

type User = { id: string; name: string; email: string };

type AuthContextType = {
  isLoading: boolean;
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!token;

  const { data, isLoading: fetchingUser, error } = useMe(isAuthenticated);

  useEffect(() => {
    if (fetchingUser || !data) return;
    if (error) {
      logout();
      return;
    }
    const userInfo = data.data.data;
    setUser(userInfo);
  }, [data, fetchingUser, error]);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = await getAuthToken();

      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
      }

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (token: string, user: User) => {
    setToken(token);
    setAuthToken(token);
    setUser(user);
    await saveAuthToken(token);
  };

  const logout = async () => {
    setToken(null);
    setAuthToken(null);
    setUser(null);
    await deleteAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, token, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
