import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}
// Create a context to manage movies
export const AuthContext = createContext<{
  user: null | User;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  commonFetch: (url: string, options: RequestInit) => Promise<unknown>;
  signUp: (data: RegisterData) => Promise<void>;
}>({
  user: null,
  login: (data: LoginData) => {
    if (data) return Promise.resolve();
    return Promise.resolve();
  },
  signUp: (data: RegisterData) => {
    if (data) return Promise.resolve();
    return Promise.resolve();
  },
  commonFetch: (url: string, options: RequestInit) => {
    if (url && options) return Promise.resolve({});
    return Promise.resolve({});
  },
  logout: () => {},
});

// Create a MovieProvider component that provides the context
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State to store the list of movies
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function commonFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token"); // Get the token from local storage

    // Check if a token is available and not expired
    if (token) {
      try {
        // Add the token to the request headers
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
      } catch (error) {
        console.error("Failed to set the token in headers:", error);
      }
    }

    try {
      const response = await fetch(url, options);

      if (response.status === 401) {
        // Token is expired or invalid, redirect to the login page
        navigate("/login"); // You need to define the login route in your app
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      const fetchUser = async () => {
        try {
          const data = await commonFetch(`${BACKEND_URL}/auth/user`, {
            method: "GET",
          });

          setUser(data.user.user);
        } catch (error) {
          console.error("Failed to fetch movies", error);
        }
      };
      if (token) fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login: (data: {
    email: string;
    password: string;
  }) => Promise<void> = async (data: LoginData) => {
    try {
      const apiUrl = `${BACKEND_URL}/auth/login`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result?.access_token;
        if (token) {
          localStorage.setItem("token", token);
          setUser(result?.user);
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  const signUp: (data: RegisterData) => Promise<void> = async (
    data: RegisterData
  ) => {
    try {
      const apiUrl = `${BACKEND_URL}/auth/register`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send form data as JSON
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred while registering:", error);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  // Create the context value
  const contextValue = {
    user,
    login,
    signUp,
    commonFetch,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
