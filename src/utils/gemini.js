import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()

userInterface.on("line", async input => {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const result = await model.generateContentStream(input);
    for await(const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText)
    }
    
})
