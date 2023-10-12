import "./ConversationPicker.scoped.css";
import Conversation from "./Conversation/Conversation";
import dummy from "./dummy-data.json";
import { useState } from "react";
import Message from "./Message/Message";
import { useMedia } from "react-media";

const ConversationPicker = () => {
  const [conversationPicker, setConversationPicker] = useState(true);
  const [conversationId, setConversationId] = useState("");
  const isMobile = useMedia({ query: "(max-width: 1259px)" });
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
      {isMobile ? (
        conversationPicker ? (
          <section className="conversations">{conversations}</section>
        ) : (
          <Message setConversationPicker={setConversationPicker} />
        )
      ) : (
        <section className="conversation-container">
          <section className="conversations">{conversations}</section>
          <Message setConversationPicker={setConversationPicker} />
        </section>
      )}
    </section>
  );
};

export default ConversationPicker;
