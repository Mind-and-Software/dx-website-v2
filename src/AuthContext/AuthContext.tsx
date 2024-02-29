"use client";

import * as React from "react";
import { authService } from "../services/authService/authService";
import { getClient } from "@/graphql/client";
import { deleteCookie, setCookie } from "cookies-next";

type User = {
  email: string;
  id: string;
  researchPermission: boolean;
  locationPermission: boolean;
  notificationsAllowed: boolean;
  notificationsStart: number;
  notificationsEnd: number;
  verified: boolean;
  status: string;
  createdAt?: Date;
  defaultLocation?: string;
  gender?: string;
  yearOfBirth?: number;
  education?: string;
  backgroundFilled: boolean;
  backgroundFilledTime: string;
  backgroundCount: number;
  tagCollection: any;
  FA: boolean;
  fa?: boolean;
  googleFa?: boolean;
  authenticationSecret?: string;
  currentStreak?: number;
  maxStreak?: number;
  dynamicStreak?: number;
  versionNumber?: string;
  versionNumberTime?: string;
  lastForm?: string;
};

export interface AuthData extends User {
  token: string;
  refreshToken: string;
}

export type AuthContextData = {
  authData?: User;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;

  signOut(): Promise<void>;
  loadStorageData: () => void;
};

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = React.useState<User>();
  const [loading, setLoading] = React.useState(true);

  const client = getClient();

  // refetches the authData from localStorage and persists it to state
  const loadStorageData = React.useCallback((): void => {
    const authDataSerialized = localStorage.getItem("@AuthData");
    if (authDataSerialized) {
      const authData = JSON.parse(authDataSerialized) as AuthData;
      setAuthData(authData);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    void loadStorageData();
  }, [loadStorageData]);

  const signInToVerify = React.useCallback(
    async (email: string, password: string) => {
      const signInData = await authService.signIn(email, password, client);

      const { token, refreshToken, ...authData } = signInData as AuthData;
      // setAuthData(authData);

      // returns user data
      return authData;
    },
    [client],
  );

  // save credentials to localStorage if given credentials are valid
  const signIn = React.useCallback(
    async (email: string, password: string) => {
      const signInData = await authService.signIn(email, password, client);
      const { token, refreshToken, ...authData } = signInData as AuthData;
      setAuthData(authData);
      localStorage.setItem("@AuthData", JSON.stringify(authData));
      setCookie("accessToken", token);
      setCookie("refreshToken", refreshToken);
      await client.resetStore();
    },
    [client],
  );

  // resets the localStorage as well as apollo client cache
  const signOut = React.useCallback(async () => {
    setAuthData(undefined);
    localStorage.removeItem("@AuthData");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    client.stop();
    await client.clearStore();
  }, [client]);

  const value = React.useMemo(
    () => ({
      authData,
      loading,
      signIn,
      signInToVerify,
      signOut,
      loadStorageData,
    }),
    [authData, loading, signIn, signInToVerify, signOut, loadStorageData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuth = (): AuthContextData => {
  // checks the authcontext to get user gredentials
  const context = React.useContext(AuthContext);

  if (!context && Object.keys(context).length === 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
