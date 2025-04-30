import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useStorageState } from "./useStorageState";
import { authProvider } from "@/dbProvider";

import * as SecureStore from "expo-secure-store";
import { toast } from "sonner-native";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<any> | void;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<any> | void;
  user?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  user: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoadingAccess, access], setAccess] = useStorageState("accessToken");
  const [[isLoadingRefresh, refreshToken], setRefreshToken] =
    useStorageState("refreshToken");

  const [user, setUser] = useState(null); // should be null
  const [isUserLoading, setIsUserLoading] = useState(true); // should be true
  const isLoading = isLoadingAccess || isLoadingRefresh || isUserLoading;

  // sign in
  async function signIn(email: string, password: string) {
    setIsUserLoading(true);
    const res = await authProvider.signIn({
      email,
      password,
    });
    const { accessToken, refreshToken, user_id } = res.data?.data;
    if (!accessToken || !refreshToken) {
      console.error("No access token or refresh token");
      setIsUserLoading(false);
      toast.error("Nepodařilo se přihlásit");
      return;
    }
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    setAccess(accessToken);
    setRefreshToken(refreshToken);
    setUser({ email, id: user_id });
    setIsUserLoading(false);
    toast.success("Úspěšně přihlášeno");
  }

  async function signOut() {
    setUser(null);
    await authProvider.signOut();
    setAccess(null);
    setRefreshToken(null);
  }

  async function signUp(email: string, password: string) {
    setIsUserLoading(true);
    const res = await authProvider.signUp({ email, password });
    const { accessToken, refreshToken } = res.data?.data;
    if (!accessToken || !refreshToken) {
      console.error("No access token or refresh token");
      setIsUserLoading(false);
      toast.error("Nepodařilo se přihlásit");
      return;
    }
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    setAccess(accessToken);
    setRefreshToken(refreshToken);
    setUser({ email, id: res.data.user_id });
    setIsUserLoading(false);
  }

  const vaules = useMemo(
    () => ({
      signIn,
      signOut,
      signUp,
      user,
      isLoading,
    }),
    [user, isLoading, signIn, signOut, signUp]
  );

  useEffect(() => {
    if (isLoadingAccess && isLoadingRefresh) return;
    if (!access || !refreshToken) {
      console.log("access", access);
      console.log("refreshToken", refreshToken);
      setUser(null);
      setIsUserLoading(false);
      return;
    }
    async function getMe() {
      // x++;
      // console.log("access", x, access);
      // console.log("refreshToken", x, refreshToken);
      const res = await authProvider.getCurrentUser();
      if (res.status === 200) {
        setUser(res.data.data);
        setIsUserLoading(false);
      } else {
        console.error("Error getting user", res);
        setUser(null);
        setIsUserLoading(false);
      }
    }
    getMe();
  }, [isLoadingAccess, isLoadingRefresh]);

  return <AuthContext.Provider value={vaules}>{children}</AuthContext.Provider>;
}
