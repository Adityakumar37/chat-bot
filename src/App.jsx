import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatMessage, { TypingIndicator } from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { getChatResponse, generateImage, isImagePrompt } from './utils/inference';
import { Sparkles, Trash2, AlertCircle } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState('chat');
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content) => {
    if (!content.trim()) return;

    setError(null);
    const userMessage = { id: Date.now(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Intent mapping: either from mode toggle OR automatic discovery
      const shouldGenerateImage = currentMode === 'image' || isImagePrompt(content);
      
      if (shouldGenerateImage) {
        // Handle Image Generation
        const imageUrl = await generateImage(content);
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: content,
          type: 'image',
          imageUrl: imageUrl
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle Chat Completion
        const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
        chatHistory.push({ role: 'user', content: content });
        
        const response = await getChatResponse(chatHistory);
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: response,
          type: 'text'
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setError("AI encountered an unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <header className="glass" style={{ 
        padding: '0.75rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '1px solid var(--accent)'
            }} 
          />
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Rocket AI</h1>
        </div>
        <button onClick={clearChat} className="mode-btn" style={{ background: 'transparent' }}>
          <Trash2 size={18} /> Clear
        </button>
      </header>

      {/* Chat History Area */}
      <main className="chat-container" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginTop: '15vh' }}
            >
              <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: '800' }}>
                Rocket
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.4)', marginTop: '1rem', fontSize: '1.2rem' }}>
                How can I assist you today?
              </p>
            </motion.div>
          )}

          {messages.map((message, i) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLast={i === messages.length - 1} 
            />
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message-row assistant-row"
            >
              <div className="bubble" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
                <AlertCircle size={16} style={{ marginRight: '8px', display: 'inline' }} />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Input bar */}
      <ChatInput 
        onSend={handleSend} 
        isLoading={isLoading} 
        currentMode={currentMode}
        setMode={setCurrentMode}
      />
    </div>
  );
}

export default App;
