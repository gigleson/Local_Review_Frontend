import { useEffect, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";
import API from "../services/api";
import Messages from "../components/Messages";

const MessagesPage = () => {
  const { user } = useAuth();
  const { selectedUser, setSelectedUser, messages, setMessages, fetchMessages, sendMessage, onlineUsers } = useChat();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  const fetchSuggestedUsers = async () => {
    try {
      const res = await API.get(`/user/suggested`);
      setSuggestedUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching suggested users:", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - User List */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        {suggestedUsers.map((suggestedUser) => {
          const isOnline = onlineUsers.includes(suggestedUser?._id);
          return (
            <div key={suggestedUser?._id} onClick={() => setSelectedUser(suggestedUser)} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
              <img src={suggestedUser?.profilePicture || "https://via.placeholder.com/150"} className="w-12 h-12 rounded-full object-cover" alt="Profile" />
              <div className="ml-3">
                <span className="font-medium">{suggestedUser?.username}</span>
                <span className={`block text-xs ${isOnline ? "text-green-600" : "text-red-600"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Chat Window */}
      {selectedUser ? <Messages selectedUser={selectedUser} /> : <div className="flex flex-1 justify-center items-center"><p className="text-gray-500">Select a user to start a conversation.</p></div>}
    </div>
  );
};

export default MessagesPage;
