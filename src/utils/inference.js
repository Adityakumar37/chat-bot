import { OpenAI } from "openai";
import { InferenceClient } from "@huggingface/inference";

const hfToken = import.meta.env.VITE_HF_TOKEN;

// Initialize OpenAI client for Chat (HuggingFace Router)
export const chatClient = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: hfToken,
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

// Initialize InferenceClient for Image Generation
export const imageClient = new InferenceClient(hfToken);

/**
 * Generate Chat Completion using Qwen
 */
export const getChatResponse = async (messages) => {
  const completion = await chatClient.chat.completions.create({
    model: "Qwen/Qwen3-Coder-Next:novita",
    messages: messages,
  });
  return completion.choices[0].message.content;
};

/**
 * Generate Image using SDXL
 */
export const generateImage = async (prompt) => {
  const response = await imageClient.textToImage({
    provider: "nscale",
    model: "stabilityai/stable-diffusion-xl-base-1.0",
    inputs: prompt,
    parameters: { num_inference_steps: 5 },
  });
  
  // Return Blob URL
  return URL.createObjectURL(response);
};

/**
 * Simple intent detection to see if the user wants an image
 */
export const isImagePrompt = (text) => {
  const imageKeywords = ['generate image', 'create image', 'draw', 'paint', 'image of', 'picture of', 'visualize'];
  const lowerText = text.toLowerCase();
  return imageKeywords.some(keyword => lowerText.includes(keyword));
};
