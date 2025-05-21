import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setIsLoading(false);
  }, []);

  return (
    <MyContext.Provider value={{ isLogin, isLoading }}>
      {children}
    </MyContext.Provider>
  );
};
