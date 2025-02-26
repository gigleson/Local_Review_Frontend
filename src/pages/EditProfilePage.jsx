import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const EditProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const [bio, setBio] = useState(user?.bio || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login"); // Redirect if not logged in
  }, [user, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("gender", gender);
      if (profilePicture) formData.append("profilePhoto", profilePicture);

      const res = await API.post("/user/profile/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user); // ✅ Update context
        navigate(`/profile/${user._id}`); // ✅ Redirect to profile
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleProfileUpdate}>
        {/* Bio */}
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        {/* Gender Selection */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Profile Picture Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          className="w-full p-2 border rounded mb-3"
        />

        {/* Submit Button */}
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
