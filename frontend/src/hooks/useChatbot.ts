import { useState } from "react";
import { getAIChatResponse } from "@/utils/ai";

// Custom hook to interact with AI motivator chatbot
export function useChatbot(){
    const [messages, setMessages] = useState<{sender: "user" | "ai"; text: string} []>([])
    const [loading, setLoading] = useState(false)

    const sendMessage = async(text: string) =>{
        setMessages((msgs)=> [...msgs,{sender: "user", text}])
        setLoading(true)
        const aiResponse = await getAIChatResponse(text)
        setMessages((msgs)=> [...msgs,{sender: "ai", text: aiResponse}])
        setLoading(false)
    }
    return{
        messages,
        loading,
        sendMessage
    }
}