import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default to false: user is not logged in yet
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update isLoggedIn if localStorage changes (login/logout in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("fakeToken");
      // Only treat as logged in if some "real login" flag exists
      const realLogin = localStorage.getItem("realLogin") === "true";
      setIsLoggedIn(!!token && realLogin);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token) => {
    localStorage.setItem("fakeToken", token);
    localStorage.setItem("realLogin", "true"); // mark actual login
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("fakeToken");
    localStorage.removeItem("realLogin");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
