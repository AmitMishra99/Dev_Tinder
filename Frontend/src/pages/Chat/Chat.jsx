import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../../config/socket";
import api from "../../config/axios";

const Chat = () => {
  const { receiverId } = useParams();

  const user = useSelector((store) => store.user);

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (!receiverId) return;

    const initializeChat = async () => {
      try {
        const { data } = await api.get(`/chat/${receiverId}`);

        if (!data?.success) return;

        const id = data.conversation._id;

        setConversationId(id);

        const { data: messageData } = await api.get(`/chat/${id}/messages`);

        if (messageData?.success) {
          setMessages(messageData.messages);
        }

        const { data: receiverData } = await api.get(
          `/chat/user/${receiverId}`,
        );

        if (receiverData?.success) {
          setReceiver(receiverData.user);
        }

        socket.emit("joinConversation", id);
      } catch (err) {
        console.error("Failed to initialize chat:", err);
      }
    };

    initializeChat();
  }, [receiverId]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!message.trim() || !conversationId) return;

    try {
      const { data } = await api.post(`/chat/${conversationId}/message`, {
        content: message,
      });

      if (data?.success) {
        setMessages((prev) => [...prev, data.message]);
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-100 p-4">
      <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
          <img
            src={receiver?.photoURL}
            alt={receiver?.firstName}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold text-slate-800">
              {receiver
                ? `${receiver.firstName} ${receiver.lastName || ""}`
                : "Loading..."}
            </h2>

            <p className="text-xs text-slate-400">
              {receiver?.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-slate-50 px-5 py-5">
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {messages.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-slate-400">
                  Start a conversation 👋
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMyMessage = msg.senderId === user?.id;

                return (
                  <div
                    key={msg._id}
                    className={`flex ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm shadow-sm ${
                        isMyMessage
                          ? "rounded-2xl rounded-br-sm bg-slate-900 text-white"
                          : "rounded-2xl rounded-bl-sm bg-white text-slate-700"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
