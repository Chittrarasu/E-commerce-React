import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

console.log(
  "import.meta.env.VITE_SUPABASE_URL:",
  import.meta.env.VITE_SUPABASE_URL
);
console.log(
  "import.meta.env.VITE_SUPABASE_ANON_KEY:",
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkSession();
    return () => authListener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
      return false;
    }
    setUser(data.user);
    return true;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign-up error:", error.message);
      alert("Sign-up failed: " + error.message);
      return false;
    }
    alert("Sign-up successful! Check your email for confirmation.");
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = { user, login, signUp, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
