import PropTypes from "prop-types";
import "Message.scoped.css";
import { AiOutlineLeft } from "react-icons/ai";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import getChatPartner from "./fetchChatPartner";
import getMessages from "./fetchMessages";
import { useAuth } from "src/Context/AuthContext";
import { socket } from "src/socket/socket";
import { useState, useEffect } from "react";

export default function Message({
  setConversationPicker,
  chatPartnerId,
  conversationId
}) {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);

  const query = useQuery({
    queryKey: ["chatPartner", chatPartnerId],
    queryFn: getChatPartner
  });

  const { status, data, refetch } = useQuery({
    queryKey: ["currentMessages", conversationId],
    queryFn: getMessages,
    enabled: false
  });

  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (status === "success") {
      setMessages(data?.result);
    }
  }, [status, data?.result]);

  useEffect(() => {
    refetch();
    socket.on("receive_message", message => {
      if (message.id_conversation == conversationId) {
        setMessages(messages => messages.concat(message));
      }
    });

    return () => socket.off("receive_message");
  }, [conversationId]);

  const sendMessage = () => {
    if (messageContent !== "") {
      socket.emit("message_sended", {
        idUserRequester: currentUser.id,
        idUserReceiver: chatPartnerId,
        conversationId: conversationId,
        messageContent: messageContent
      });
    }
    setMessageContent("");
  };

  return (
    <div className="messages-container">
      <header>
        <AiOutlineLeft
          onClick={() => setConversationPicker(true)}
          className="messages-container-back-button"
        />
        <img src={query?.data?.profile_picture} alt="chat partner avatar" />
        <p className="body">{query?.data?.username}</p>
      </header>
      <section className="messages">
        {messages?.map(message => {
          return (
            <p
              key={message.id}
              className={
                message.id_user_requester === currentUser.id
                  ? "body message message-sended"
                  : "body message message-received"
              }
            >
              {message.content}
            </p>
          );
        })}
      </section>
      <form className="search-form">
        <input
          value={messageContent}
          className="search-form--input"
          type="text"
          onChange={e => setMessageContent(e.target.value)}
        />
        <PiPaperPlaneRightFill
          className="search-from--send"
          size={24}
          onClick={() => sendMessage()}
        />
      </form>
    </div>
  );
}

Message.propTypes = {
  setConversationPicker: PropTypes.func.isRequired,
  chatPartnerId: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired
};
