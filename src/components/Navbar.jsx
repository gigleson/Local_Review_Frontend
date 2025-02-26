import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Mail, User, Menu, X, PlusSquare, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // ✅ Make sure this is correct

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ `logout` should now exist
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  // ✅ Call `logout` from AuthContext
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect after logout
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-300 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-10">
        {/* Left Section: Logo */}
        <Link to="/" className="text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </Link>

        {/* Center Section: Navigation Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-500">
            <Home className="w-7 h-7" />
          </Link>
          <Link to="/messages" className="relative hover:text-gray-500">
            <Mail className="w-7 h-7" />
          </Link>
          <Link to="/create-post" className="hover:text-gray-500">
            <PlusSquare className="w-7 h-7" />
          </Link>
        </div>

        {/* Right Section: Profile */}
        <div className="relative flex items-center">
          {/* Profile Dropdown */}
          <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center space-x-2">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>

          {profileDropdown && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border">
              <Link to={`/profile/${user?._id}`} className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                <User className="w-5 h-5 mr-2" /> Profile
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center">
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 ml-4">
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 flex flex-col items-center py-4">
          <Link to="/" className="py-2 hover:text-gray-500 flex items-center">
            <Home className="w-6 h-6 mr-2" /> Home
          </Link>
          <Link to="/messages" className="py-2 hover:text-gray-500 flex items-center">
            <Mail className="w-6 h-6 mr-2" /> Messages
          </Link>
          <Link to="/create-post" className="py-2 hover:text-gray-500 flex items-center">
            <PlusSquare className="w-6 h-6 mr-2" /> Create Post
          </Link>
          <Link to={`/profile/${user?._id}`} className="py-2 hover:text-gray-500 flex items-center">
            <User className="w-6 h-6 mr-2" /> Profile
          </Link>
          <button onClick={handleLogout} className="py-2 hover:text-gray-500 flex items-center">
            <LogOut className="w-6 h-6 mr-2" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
