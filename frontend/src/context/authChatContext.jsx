import { useState, useEffect, createContext, useContext } from "react";

export const AuthChatContext = createContext();

export const useAuthChatContext = () => {
  return useContext(AuthChatContext);
};

export const AuthChatProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  return (
    <AuthChatContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthChatContext.Provider>
  );
};
