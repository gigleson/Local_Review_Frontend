import { useState } from "react";
import API from "../services/api";
import { FaHeart, FaComment } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);

  const likePost = async () => {
    try {
      await API.get(`/post/${post._id}/like`);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-md" />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{post.caption}</h3>
        <p className="text-sm text-gray-500">Posted by {post.author.username}</p>
        <div className="flex justify-between mt-2">
          <button onClick={likePost} className="flex items-center text-primary">
            <FaHeart className="mr-1" /> {likes}
          </button>
          <button className="flex items-center text-dark">
            <FaComment className="mr-1" /> {post.comments.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
