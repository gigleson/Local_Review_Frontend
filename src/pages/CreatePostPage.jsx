import { useState, useContext } from "react";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(1); // Default rating
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    formData.append("rating", rating); // Include rating

    try {
      await API.post("/post/addpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-dark mb-4">Create a Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write a caption..."
          className="w-full p-3 border rounded focus:outline-none focus:border-primary"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-primary"
        >
          <option value="1">⭐ (1)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        </select>
        <button
          type="submit"
          className={`w-full py-3 text-white rounded ${loading ? "bg-gray-400" : "bg-primary hover:bg-red-600"}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
