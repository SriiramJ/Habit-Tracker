import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { BotIcon, SendIcon, UserIcon  } from "lucide-react";

export default function ChatbotWidget(){
    const {messages, loading, sendMessage} = useChatbot()
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom when new message arrives
    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const handleSend = async (e: React.FormEvent) =>{
        e.preventDefault()
        if(!input.trim()) return
        await sendMessage(input)
        setInput("")
    }

    return(
        <Card className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
        <BotIcon className="w-6 h-6" /> AI Motivator Chatbot
      </h2>
      <div className="h-64 overflow-y-auto mb-4 bg-blue-50 rounded p-2">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-16">Start a conversation!</div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "mb-2 flex",
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-xs px-3 py-2 rounded-lg",
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900 border"
                )}
              >
                <div className="flex items-center gap-2">
                  {msg.sender === "user" ? (
                    <UserIcon className="w-4 h-4" />
                  ) : (
                    <BotIcon className="w-4 h-4 text-blue-500" />
                  )}
                  <span>{msg.text}</span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button
          type="submit"
          variant="default"
          size="md"
          disabled={loading || !input.trim()}
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </Card>
    )
}