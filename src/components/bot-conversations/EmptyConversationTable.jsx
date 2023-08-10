import { useEffect, useState } from "react";
import BotConversation from "../../assets/BotConversation";

function EmptyConversationTable() {
  const [oddNum, setOddNum] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setOddNum(!oddNum);
      }, 5000);
  
      return () => clearInterval(intervalId);
  }, [setOddNum, oddNum]);

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex justify-center items-center flex-col">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <BotConversation/>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No conversations
                </h3>
                <p className="mt-1 text-sm text-gray-500">Enable bot and wait for your customers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EmptyConversationTable;
