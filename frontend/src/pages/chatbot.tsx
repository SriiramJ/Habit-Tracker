import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-lg mx-auto mt-8">
        <ChatbotWidget />
      </div>
    </ProtectedRoute>
  );
}