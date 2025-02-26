import { useEffect, useState, useRef } from "react";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";

const Messages = ({ selectedUser }) => {
  const { user } = useAuth();
  const { messages, fetchMessages, sendMessage } = useChat();
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Fetch chat history when opening chat
  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser._id);
  }, [selectedUser]);

  // ✅ Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!textMessage.trim()) return;
    
    console.log("📩 Message to send:", textMessage); // ✅ Debug log

    await sendMessage(selectedUser._id, textMessage);
    setTextMessage(""); // ✅ Clear input after sending
};


  return (
    <div className="flex flex-col flex-1">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-gray-200 border-b">
        <img src={selectedUser?.profilePicture || "https://via.placeholder.com/150"} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
        <span className="ml-3 font-medium">{selectedUser?.username}</span>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex ${msg.senderId === user?._id ? "justify-end" : "justify-start"}`}>
            <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-primary text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
