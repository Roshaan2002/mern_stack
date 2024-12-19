import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/services", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        storeTokenInLS,
        LogoutUser,
        user,
        authorizationToken,
        services,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
