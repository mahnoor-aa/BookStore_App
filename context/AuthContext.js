
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (userData, token) => {
    const { password, ...userWithoutPassword } = userData;
    
    setUser(userWithoutPassword);
    console.log("User data without password:", userWithoutPassword);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const register = async (name, email, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      const { password, ...userWithoutPassword } = data.user;

      login(userWithoutPassword, data.token);

      router.push("/");
    } else {
      throw new Error(data.message || "Something went wrong");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
