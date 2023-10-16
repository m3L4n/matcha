import "./ConversationPicker.scoped.css";
import Conversation from "./Conversation/Conversation";
import { useEffect, useState } from "react";
import Message from "./Message/Message";
import { useMedia } from "react-media";
import getConversations from "./fetchConversations";
import { useQuery } from "@tanstack/react-query";

const ConversationPicker = () => {
  const [conversationPicker, setConversationPicker] = useState(true);
  const [conversationId, setConversationId] = useState("");
  const [conversationPartnerId, setConversationPartnerId] = useState("");
  const isMobile = useMedia({ query: "(max-width: 1259px)" });

  const { status, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations
  });

  if (status === "error") {
    conversations = [];
  }

  let conversations = data?.result?.rows?.map(conversation => (
    <Conversation
      key={conversation.conversation_id}
      partnerId={conversation.chat_partner_id}
      id={conversation.conversation_id}
      firstName={conversation.chat_partner_name}
      lastMessage={
        conversation.last_message
          ? conversation.last_message
          : "Don't be shy say hi! 👋"
      }
      setConversationPicker={setConversationPicker}
      setConversationId={setConversationId}
      setConversationPartnerId={setConversationPartnerId}
    />
  ));

  useEffect(() => {
    if (status === "success") {
      setConversationPartnerId(data?.result.rows[0].chat_partner_id);
    }
  }, [data?.result.rows, status]);

  return (
    <section>
      <h1 className="header">mat-chat</h1>
      {isMobile ? (
        conversationPicker ? (
          <section className="conversations">{conversations}</section>
        ) : (
          <Message
            setConversationPicker={setConversationPicker}
            chatPartnerId={conversationPartnerId}
          />
        )
      ) : (
        <section className="conversation-container">
          <section className="conversations">{conversations}</section>
          {conversationId !== "" && (
            <Message
              setConversationPicker={setConversationPicker}
              chatPartnerId={conversationPartnerId}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default ConversationPicker;
