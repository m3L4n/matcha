import "./ConversationPicker.scoped.css";
import Conversation from "./Conversation/Conversation";
import dummy from "./dummy-data.json";
import { useState } from "react";
import Message from "./Message/Message";

const ConversationPicker = () => {
  const [conversationPicker, setConversationPicker] = useState(true);
  const [conversationId, setConversationId] = useState("");
  const conversations = dummy.map(conversation => (
    <Conversation
      key={conversation.id}
      id={conversation.id}
      firstName={conversation.firstName}
      lastMessage={conversation.lastMessage}
      setConversationPicker={setConversationPicker}
      setConversationId={setConversationId}
    />
  ));
  return (
    <section>
      <h1 className="header">mat-chat</h1>
      {conversationPicker && (
        <section className="conversations">{conversations}</section>
      )}
      {!conversationPicker && (
        <Message setConversationPicker={setConversationPicker} />
      )}
    </section>
  );
};

export default ConversationPicker;
