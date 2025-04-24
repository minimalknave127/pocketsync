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

const AuthContext = createContext<{
  signIn: () => void;
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

  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const isLoading = isLoadingAccess || isLoadingRefresh || isUserLoading;

  // sign in
  function signIn() {}

  function signOut() {
    setAccess(null);
    setRefreshToken(null);
  }

  async function signUp(email: string, password: string) {
    setIsUserLoading(true);
    const res = await authProvider.signUp({ email, password });
    const { accessToken, refreshToken } = res.data;
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
    if (!access && !refreshToken && !isLoadingAccess && !isLoadingRefresh) {
      setUser(null);
      setIsUserLoading(false);
    }
  }, [isLoadingAccess, isLoadingRefresh]);

  return <AuthContext.Provider value={vaules}>{children}</AuthContext.Provider>;
}
