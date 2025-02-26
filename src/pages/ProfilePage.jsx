import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user: loggedInUser } = useContext(AuthContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get(`/user/${id}/profile`);
        setUser(res.data.user);
        setIsFollowing(res.data.user.followers.includes(loggedInUser?._id));
        setNewBio(res.data.user.bio || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [id, loggedInUser]);

  const handleFollowUnfollow = async () => {
    try {
      await API.post(`/user/followorunfollow/${id}`);
      setIsFollowing(!isFollowing);
      setUser((prevUser) => ({
        ...prevUser,
        followers: isFollowing
          ? prevUser.followers.filter((f) => f !== loggedInUser._id)
          : [...prevUser.followers, loggedInUser._id],
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    }
  };

  const handleEditProfile = async () => {
    try {
      await API.post("/user/profile/edit", { bio: newBio });
      setUser((prevUser) => ({ ...prevUser, bio: newBio }));
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
        <div>
          <h1 className="text-2xl font-bold text-dark">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">
            {user.followers.length} Followers | {user.following.length} Following
          </p>

          {loggedInUser?._id !== user._id && (
            <button
              onClick={handleFollowUnfollow}
              className={`mt-4 px-4 py-2 rounded ${
                isFollowing ? "bg-gray-400" : "bg-primary text-white"
              } hover:opacity-80 transition`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {loggedInUser?._id === user._id && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-dark">About Me</h2>
          {editing ? (
            <>
              <textarea
                className="w-full p-2 border rounded mt-2"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
              <button
                onClick={handleEditProfile}
                className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="mt-2 ml-2 bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700 mt-2">{user.bio || "No bio available"}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-dark">My Posts</h2>
        <p className="text-gray-500">This section will show the user's posts...</p>
      </div>
    </div>
  );
};

export default ProfilePage;
