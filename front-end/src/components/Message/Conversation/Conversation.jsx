import PropTypes from "prop-types";
import "./Conversation.scoped.css";
import { Link } from 'react-router-dom';

const Conversation = ({ id, firstName, lastMessage }) => {
  return (
    <section className="conversation">
      <Link to={`/messages/${id}`}>
        <p className="body-highlight">{firstName}</p>
        <p className="body">{lastMessage}</p>
      </Link>
    </section>
  )
}

Conversation.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
}

export default Conversation;
