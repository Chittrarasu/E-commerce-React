import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const hardcodedCredentials = {
    email: "chitu@gmail.com",
    password: "password123",
  };

  const login = (email, password) => {
    if (
      email === hardcodedCredentials.email &&
      password === hardcodedCredentials.password
    ) {
      setUser({ email: hardcodedCredentials.email });
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isAuthenticated");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
