import { createContext, useContext, useState } from "react";

export const AuthChatContext = createContext();

export const useAuthChatContext = () => {
  return useContext(AuthChatContext);
};

export const AuthChatContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chat-user")) || null;
    } catch {
      return null;
    }
  });

  return (
    <AuthChatContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthChatContext.Provider>
  );
};
