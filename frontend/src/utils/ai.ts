import api from "./api"

// Send a user message to the backend AI chat endpoint and get a motivational response
export async function getAIChatResponse(userMessage: string): Promise<string>{
    try{
        const res = await api.post("/chatmessage",{message: userMessage})
        // Assuming the backend return {response: "AI reply..."}
        return res.data.response || "No response from AI."
    }catch(error: any){
        return(
            error.response?.data?.message ||
            "Sorry, I'm unable to provide a motivational response right now. Please try again later!"
        )
    }
}