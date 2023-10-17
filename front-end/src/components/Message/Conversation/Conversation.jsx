import PropTypes from "prop-types";
import "./Conversation.scoped.css";

const Conversation = ({
  id,
  partnerId,
  firstName,
  lastMessage,
  setConversationPicker,
  setConversationId,
  setConversationPartnerId
}) => {
  const pickConversation = () => {
    setConversationPicker(false);
    setConversationPartnerId(partnerId);
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
  partnerId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  setConversationPicker: PropTypes.func.isRequired,
  setConversationId: PropTypes.func.isRequired,
  setConversationPartnerId: PropTypes.func.isRequired
};

export default Conversation;
