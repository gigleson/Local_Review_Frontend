import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import AuthContext from "../contexts/AuthContext";
import API from "../services/api";

const ProfilePage = () => {
    const { user: loggedInUser } = useContext(AuthContext);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
        fetchUserPosts();
    }, [id]);

    const fetchUserProfile = async () => {
        try {
            const res = await API.get(`/user/${id}/profile`);
            setUser(res.data.user);
            setIsFollowing(res.data.user.followers.includes(loggedInUser?._id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch profile");
        }
        setLoading(false);
    };

    const fetchUserPosts = async () => {
        try {
            const res = await API.get(`/post/userpost/all`);
            setPosts(res.data.posts);
        } catch (err) {
            console.error("Error fetching user posts:", err);
        }
    };

    const handleFollowUnfollow = async () => {
        try {
            await API.post(`/user/followorunfollow/${id}`);
            setIsFollowing(!isFollowing);

            // Update the followers count in UI
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

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            {/* User Details Section */}
            <div className="flex items-center space-x-6">
                <img
                    src={user.profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                />
                <div>
                    <h1 className="text-2xl font-bold text-dark">{user.username}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-500">{user.bio || "No bio available"}</p>
                    <p className="text-gray-500">
                        {user.followers.length} Followers | {user.following.length} Following
                    </p>

                    {/* Follow / Unfollow & Message Button */}
                    {loggedInUser?._id !== user._id && (
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={handleFollowUnfollow}
                                className={`px-4 py-2 rounded ${isFollowing ? "bg-gray-400" : "bg-primary text-white"}`}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                            <a href={`/messages`} className="px-4 py-2 bg-blue-500 text-white rounded">
                                Message
                            </a>
                        </div>
                    )}

                    {/* Edit Profile Button (Only for logged-in user) */}

                    {loggedInUser?._id === user._id && (
                        <Link to="/edit-profile" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded block">
                            Edit Profile
                        </Link>
                    )}

                </div>
            </div>

            {/* User's Posts */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-dark">My Posts</h2>
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                    <p className="text-gray-500">No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
