import './Message.scoped.css';
import Conversation from './Conversation/Conversation';
import dummy from './dummy-data.json';

const Message = () => {
  const conversations = dummy.map(conversation => <Conversation
    key={conversation.id}
    firstName={conversation.firstName}
    lastMessage={conversation.lastMessage}
  />)
  return (
    <section>
      <h1 className="header">mat-chat</h1>
      <div className="conversations">
        {conversations}
      </div>
    </section>
  )
}

export default Message;
