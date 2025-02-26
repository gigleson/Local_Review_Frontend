import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const InboxPage = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await API.get(`/message/conversations`);
      setConversations(res.data.conversations);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-dark">Inbox</h2>
      <ul className="mt-4">
        {conversations.length > 0 ? (
          conversations.map((conv) => (
            <li key={conv._id} className="p-3 border-b">
              <Link to={`/chat/${conv.participants[0]._id}`} className="text-blue-500">
                Chat with {conv.participants[0].username}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No conversations yet.</p>
        )}
      </ul>
    </div>
  );
};

export default InboxPage;
