import { useEffect, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";
import API from "../services/api";
import Messages from "../components/Messages";

const ChatPage = () => {
  const { user } = useAuth();
  const { selectedUser, setSelectedUser, onlineUsers } = useChat();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  const fetchSuggestedUsers = async () => {
    try {
      const res = await API.get(`/user/suggested`);
      setSuggestedUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching suggested users:", err);
    }
  };

  return (
    <div className="flex ml-[16%] h-screen">
      {/* User Sidebar */}
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id}
                onClick={() => setSelectedUser(suggestedUser)}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <img src={suggestedUser?.profilePicture} className="w-14 h-14 rounded-full object-cover" alt="Profile" />
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chat Window */}
      {selectedUser ? (
        <Messages selectedUser={selectedUser} />
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <h1 className="font-medium">Your messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
