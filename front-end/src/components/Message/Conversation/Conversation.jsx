import PropTypes from "prop-types";
import "./Conversation.scoped.css";

const Conversation = ({ firstName, lastMessage }) => {
  return (
    <section className="conversation">
      <p className="body-highlight">{firstName}</p>
      <p className="body">{lastMessage}</p>
    </section>
  )
}

Conversation.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
}

export default Conversation;
