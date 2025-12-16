
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";
import { MOVIES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchWithAI = async (query: string): Promise<Movie[]> => {
  if (!process.env.API_KEY) return MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following movie list: ${JSON.stringify(MOVIES.map(m => ({ id: m.id, title: m.title, description: m.description })))}, which movies best match this query: "${query}"? Return only the list of IDs in a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const matchedIds: string[] = JSON.parse(response.text || '[]');
    return MOVIES.filter(movie => matchedIds.includes(movie.id));
  } catch (error) {
    console.error("AI Search Error:", error);
    return MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
};
