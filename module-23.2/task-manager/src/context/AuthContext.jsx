import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get("/auth/me");
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkSession();
  }, []);

  //Register function
  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    setUser(response.data.user);
    return response.data;
  };

  //Login function
  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    setUser(response.data.user);
    return response.data;
  };

  //Logout function
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  const value = {
    user,
    authLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
