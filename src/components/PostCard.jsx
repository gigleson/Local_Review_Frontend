// import { Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import API from "../services/api";
// import AuthContext from "../contexts/AuthContext";
// import { FaHeart, FaComment } from "react-icons/fa";
// import CommentSection from "./CommentSection";

// const PostCard = ({ post }) => {
//   const { user } = useContext(AuthContext);
//   const [likes, setLikes] = useState(post.likes.length);
//   const [liked, setLiked] = useState(post.likes.includes(user?._id));
//   const [showComments, setShowComments] = useState(false);

//   const likePost = async () => {
//     try {
//       await API.get(`/post/${post._id}/like`);
//       setLiked(!liked);
//       setLikes(liked ? likes - 1 : likes + 1);
//     } catch (err) {
//       console.error("Error liking post:", err);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <div className="flex items-center space-x-2">
//         {/* Link to Profile */}
//         <Link to={`/profile/${post.author._id}`} className="text-lg font-semibold text-primary hover:underline">
//           {post.author.username}
//         </Link>
//       </div>
//       <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-md mt-2" />
//       <p className="mt-2">{post.caption}</p>
//       <div className="flex justify-between mt-2">
//         <button onClick={likePost} className="flex items-center text-primary">
//           <FaHeart className={liked ? "text-red-500" : ""} /> {likes}
//         </button>
//         <button onClick={() => setShowComments(!showComments)} className="flex items-center text-dark">
//           <FaComment className="mr-1" /> {post.comments.length}
//         </button>
//       </div>
//       {showComments && <CommentSection postId={post._id} />}
//     </div>
//   );
// };

// export default PostCard;


import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { FaHeart, FaComment } from "react-icons/fa";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [showComments, setShowComments] = useState(false);

  const likePost = async () => {
    try {
      await API.get(`/post/${post._id}/like`);
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Function to render stars based on the post's rating
  const renderStars = (rating) => {
    const filledStars = "★".repeat(rating);  // Filled stars
    const emptyStars = "☆".repeat(5 - rating);  // Empty stars
    return filledStars + emptyStars;  // Combine both to display
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-2">
        {/* Profile Picture of Post Creator */}
        <Link to={`/profile/${post.author._id}`} className="flex items-center space-x-2">
          <img
            src={post.author.profilePicture || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-lg font-semibold text-primary hover:underline">
            {post.author.username}
          </span>
        </Link>
      </div>

      {/* Post Image */}
      <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-md mt-2" />

      {/* Post Caption */}
      <p className="mt-2">{post.caption}</p>

      {/* Star Rating */}
      <p className="mt-2 text-yellow-500">{renderStars(post.rating)}</p> {/* Display stars based on rating */}

      <div className="flex justify-between mt-2">
        {/* Like Button */}
        <button onClick={likePost} className="flex items-center text-primary">
          <FaHeart className={liked ? "text-red-500" : ""} /> {likes} {/* Change heart color if liked */}
        </button>

        {/* Comments Button */}
        <button onClick={() => setShowComments(!showComments)} className="flex items-center text-dark">
          <FaComment className="mr-1" /> {post.comments.length}
        </button>
      </div>

      {/* Comment Section */}
      {showComments && <CommentSection postId={post._id} />}
    </div>
  );
};

export default PostCard;
