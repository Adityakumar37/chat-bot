# 🚀 Rocket AI Assistant

**Rocket AI** is a premium, multi-modal AI assistant built with **React** and **Vite**. It combines lightning-fast conversational logic with state-of-the-art image generation, all wrapped in a sleek, glassmorphic dark-mode interface.

![Rocket AI Logo](/public/logo.png)

## ✨ Key Features

- **🧠 Intelligent Chat**: Powered by the `Qwen/Qwen3-Coder-Next:novita` model via the HuggingFace Router for sub-second responses.
- **🎨 Image Generation**: Uses `stabilityai/stable-diffusion-xl-base-1.0` to turn your imagination into high-quality visuals.
- **📥 Instant Downloads**: Generate an image and download it instantly with a single click. Rocket handles the binary data seamlessly using Blob URLs.
- **✨ Gemini-style UX**: A modern, floating input bar with auto-intent detection and a smooth conversation flow.
- **🔥 Performance-First**: Optimized with **Framer Motion** for micro-animations and **Lucide React** for lightweight iconography.

## 📥 Image Downloads

When you generate an image, **Rocket AI** provides a high-quality preview in a glass container. 
1. Hover/Click on the generated image.
2. Click the **Download (📥)** button in the bottom-right corner.
3. The image will be saved to your device immediately as a `.png` file.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Clients**: 
  - `@huggingface/inference` (Images)
  - `openai` (Chat via HuggingFace Router)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Adityakumar37/chat-bot.git
cd chat-bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your HuggingFace token:
```env
VITE_HF_TOKEN=your_huggingface_token_here
```

### 4. Run the development server
```bash
npm run dev
```

## 🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

Built with ❤️ by [Aditya Kumar](https://github.com/Adityakumar37)
