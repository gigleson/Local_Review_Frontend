import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          console.warn("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const res = await API.get(`/user/${storedUserId}/profile`);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);
  const logout = async () => {
    try {
    //   await API.get("/user/logout", { withCredentials: true }); // Call backend logout API
      setUser(null); // Reset user state
      localStorage.removeItem("token"); // Remove token
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
