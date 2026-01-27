
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly in the function scope as per guidelines.
export const getProjectInsights = async (projectName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Describe the technical innovation and design excellence of an exhibition stand for ${projectName} in Nexhibit Arabia's portfolio. Keep it professional, high-end, and technical.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    // Accessing .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Exploring the nexus of design and reality...";
  }
};

export const generateVisualConcept = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A futuristic 3D architectural exhibition stand design based on: ${prompt}. Cinematic lighting, 8k resolution, Unreal Engine 5 aesthetic.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Iterate through candidates and parts to find the image part correctly.
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Visual Gen Error:", error);
    return null;
  }
};
