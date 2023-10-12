import PropTypes from "prop-types";
import "Message.scoped.css";
import { AiOutlineLeft } from "react-icons/ai";
import { PiPaperPlaneRightFill } from "react-icons/pi";

export default function Message({ setConversationPicker }) {
  const messages = [
    { id: "receiver", content: "Hey Wanna grab a cup of tea ?" },
    { id: "sender", content: "With pleasure! Meet me at Republique Starbuck" },
    { id: "receiver", content: "Perfect! Tomorrow 16?" },
    { id: "sender", content: "Of course, see you tomorrow 😍" }
  ];
  return (
    <div className="messages-container">
      <header>
        <AiOutlineLeft onClick={() => setConversationPicker(true)} />
        <img src="http://placekitten.com/40/40" alt="profile picture" />
        <p className="body">Manon</p>
      </header>
      <section className="messages">
        {messages.map(message => {
          return (
            <p
              key={Math.random()}
              className={
                message.id === "receiver"
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
  setConversationPicker: PropTypes.func.isRequired
};
