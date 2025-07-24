import axios from "axios";

export async function getAIResponse(userMessage) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3", // or "llama2", "mistral", etc.
      prompt: `You are a motivational AI coach. Respond to the user in a positive, encouraging way. User: "${userMessage}"`,
      stream: false,
    });
    return response.data.response.trim();
  } catch (error) {
    console.error(
      "Ollama AI Service Error:",
      error?.response?.data || error.message,
    );
    return "Sorry, I'm unable to provide a motivational response right now. Please try again later!";
  }
}
