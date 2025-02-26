import { createContext, useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await API.post("/user/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user data
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  };

  const register = async (formData) => {
    try {
      const res = await API.post("/user/register", formData);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.get("/user/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
