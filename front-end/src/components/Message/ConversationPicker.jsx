import "./ConversationPicker.scoped.css";
import Conversation from "./Conversation/Conversation";
import dummy from "./dummy-data.json";
import { useState } from "react";
import Message from "./Message/Message";
import { useMedia } from "react-media";
import getConversations from "./fetchConversations";
import { useQuery } from "@tanstack/react-query";

const ConversationPicker = () => {
  const [conversationPicker, setConversationPicker] = useState(true);
  const [conversationId, setConversationId] = useState("");
  const isMobile = useMedia({ query: "(max-width: 1259px)" });

  const { status, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations
  });

  if (status === "error") {
    conversations = [];
  }

  let conversations = data?.result?.rows?.map(conversation => (
    <Conversation
      key={conversation.conversation_id}
      id={conversation.conversation_id}
      firstName={conversation.chat_partner_name}
      lastMessage={conversation.last_message ? conversation.last_message : ""}
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
