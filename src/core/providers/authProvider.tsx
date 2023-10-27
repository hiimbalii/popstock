import React, { useEffect, useState } from "react";
import getAuthToken from "../clients/auth_client";

const AuthContext = React.createContext<string>("");
export { AuthContext };

export interface AuthProviderProps {
  children: React.ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState("");
  useEffect(() => {
    getAuthToken()
      .then((res) => (res.ok ? res.json() : ""))
      .then((t) => setToken(t.access_token ?? ""));
  }, []);
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}
