import React, { useEffect, useState } from "react";
import ConversationHeader from "../components/bot-conversations/ConversationHeader";
import ConversationTable from "../components/bot-conversations/ConversationTable";
import EmptyConversationTable from "../components/bot-conversations/EmptyConversationTable";

export default function BotAndConversation() {
    const [viewConversations, setViewConversations] = useState(0);
    useEffect(() => {
      setViewConversations(new Date().getMilliseconds() % 2);
    }, []);
  return (
    <>
      <ConversationHeader />
      {viewConversations ? (
          <EmptyConversationTable/>
          ) : (
          <ConversationTable />
      )}
    </>
  );
}
