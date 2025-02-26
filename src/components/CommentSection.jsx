import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await API.post(`/post/${postId}/comment/all`);
      setComments(res.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    setLoading(true);
    try {
      const res = await API.post(`/post/${postId}/comment`, { text: commentText });
      setComments([res.data.comment, ...comments]); // Add new comment to list
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md">
      <h3 className="text-lg font-bold">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mt-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full p-2 border rounded"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit" className={`mt-2 w-full bg-primary text-white py-2 rounded ${loading ? "bg-gray-400" : ""}`} disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="mt-3 space-y-2">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-2 bg-white rounded-md shadow-sm">
              <p className="text-sm font-semibold">
                {/* Link to Profile */}
                <Link to={`/profile/${comment.author._id}`} className="text-primary hover:underline">
                  {comment.author.username}
                </Link>
              </p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
