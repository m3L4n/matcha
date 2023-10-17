import PropTypes from "prop-types";
import "Message.scoped.css";
import { AiOutlineLeft } from "react-icons/ai";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import getChatPartner from "./fetchChatPartner";
import getMessages from "./fetchMessages";
import { useAuth } from "src/Context/AuthContext";

export default function Message({
  setConversationPicker,
  chatPartnerId,
  conversationId
}) {
  const query = useQuery({
    queryKey: ["chatPartner", chatPartnerId],
    queryFn: getChatPartner
  });

  const { data: messages } = useQuery({
    queryKey: ["currentMessages", conversationId],
    queryFn: getMessages
  });

  const { user: currentUser } = useAuth();

  return (
    <div className="messages-container">
      <header>
        <AiOutlineLeft
          onClick={() => setConversationPicker(true)}
          className="messages-container-back-button"
        />
        <img src="http://placekitten.com/40/40" alt="profile picture" />
        <p className="body">{query?.data?.username}</p>
      </header>
      <section className="messages">
        {messages?.result.map(message => {
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
        <input className="search-form--input" type="text" />
        <PiPaperPlaneRightFill
          className="search-from--send"
          color="#A4B07E"
          size={24}
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
