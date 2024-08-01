"use server"
import 'dotenv/config'
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
// Access your API key as an environment variable (see "Set up your API key" above)

import geminiString from "@/components/preferencesPage/preferences"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function generateText(geminiString) {

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });  

  const result = await model.generateContent(geminiString);
  const response = result.response;
  const text = response.text();
  const obj = JSON.parse(text)
  console.log(text)
  // console.log(new Date(obj.days[0].locations[0].startTime).toString())
  // console.log(new Date(obj.days[0].locations[0].endTime).toString())

  return obj;
}
