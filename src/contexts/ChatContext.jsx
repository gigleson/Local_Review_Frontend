import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = io("http://localhost:8000"); // 🔥 Ensure this matches your backend

  // ✅ Listen for new messages in real-time
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log("📩 Received new message:", newMessage);
      setMessages((prev) => [...prev, newMessage]); // ✅ Update state instantly
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
    };
  }, []);

  // ✅ Fetch messages when opening chat
  const fetchMessages = async (userId) => {
    try {
      const res = await API.get(`/message/all/${userId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  const sendMessage = async (receiverId, textMessage) => {
    try {
        if (!textMessage.trim()) return;

        console.log("📤 Sending message:", textMessage);

        // 🔥 FIXED: Backend expects `textMessage`, not `message`
        const res = await API.post(`/message/send/${receiverId}`, { textMessage });

        console.log("✅ Message sent successfully:", res.data.newMessage);
        setMessages((prev) => [...prev, res.data.newMessage]);

        socket.emit("sendMessage", res.data.newMessage); // 🔥 Emit message event
    } catch (err) {
        console.error("❌ Error sending message:", err.response ? err.response.data : err.message);
    }
};


  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser, messages, setMessages, fetchMessages, sendMessage, onlineUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatContext;
