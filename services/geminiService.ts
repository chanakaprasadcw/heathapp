import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const API_KEY = process.env.API_KEY;

const getAIInstance = (): GoogleGenAI => {
  if (!genAI) {
    if (!API_KEY) {
      console.error("API Key not found in environment variables");
      throw new Error("API Key is missing");
    }
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
  return genAI;
};

export const initializeChat = () => {
  const ai = getAIInstance();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are MedCey, a compassionate and knowledgeable AI medical assistant for a mobile health app. 
      Your goal is to provide general health information, explain medical terms, and offer wellness advice. 
      CRITICAL: You are NOT a doctor. You cannot diagnose diseases or prescribe medication. 
      Always include a disclaimer when discussing symptoms that the user should consult a healthcare professional. 
      Keep responses concise, friendly, and easy to read on a mobile screen. 
      Use Markdown for formatting lists or emphasis.`,
    },
  });
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
      throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            yield c.text;
        }
    }
  } catch (error) {
    console.error("Error in stream:", error);
    yield "I'm having trouble connecting to the health database right now. Please try again later.";
  }
};