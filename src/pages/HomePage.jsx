import { useState, useEffect } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/post/all"); // Fetch all posts
        setPosts(res.data.posts); // Store posts in state
      } catch (err) {
        setError("Error fetching posts.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-light min-h-screen p-6">
      <h2 className="text-2xl font-bold text-dark">Latest Posts</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
