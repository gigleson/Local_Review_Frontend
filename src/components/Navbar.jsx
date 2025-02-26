import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">
        MyApp
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to={`/profile/${user._id}`} className="text-dark font-semibold hover:text-primary transition">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600">
              Login
            </Link>
            <Link
              to="/register"
              className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
