import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <h1 className="text-3xl font-bold text-dark">Welcome, {user.username}!</h1>
    </div>
  );
};

export default HomePage;
