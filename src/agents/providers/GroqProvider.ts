import { ChatGroq } from "@langchain/groq";

export class GroqProvider {
    private llm: ChatGroq;

    constructor() {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY not found");
        }

        this.llm = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: "llama-3.1-8b-instant",
            temperature: 0,
        });
    }

    async invoke(prompt: string): Promise<string> {
        try {
            const response = await this.llm.invoke(prompt);
            return response.content.toString();
        } catch (error: any) {
            console.error(error.response?.data || error);
            throw error;
        }
    }
}