"use server"
import 'dotenv/config'
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function run(previousState, formData) {

    const { prompt } = Object.fromEntries(formData)
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  console.log(text);
  return text;
}
