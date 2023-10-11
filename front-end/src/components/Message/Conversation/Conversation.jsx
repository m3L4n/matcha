import PropTypes from "prop-types";
import "./Conversation.scoped.css";

const Conversation = ({
  id,
  firstName,
  lastMessage,
  setConversationPicker,
  setConversationId
}) => {
  const pickConversation = () => {
    setConversationPicker(false);
    setConversationId(id);
  };
  return (
    <div className="conversation" onClick={pickConversation}>
      <p className="body-highlight">{firstName}</p>
      <p className="body">{lastMessage}</p>
    </div>
  );
};

Conversation.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  setConversationPicker: PropTypes.func.isRequired,
  setConversationId: PropTypes.func.isRequired
};

export default Conversation;
