import { useState, useRef, useEffect } from 'react';
import { Send, Image, MessageSquare, Sparkles, Plus, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInput = ({ onSend, isLoading, currentMode, setMode }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-area">
      <div className="mode-toggle">
         <motion.button 
            whileTap={{ scale: 0.95 }}
            className={`mode-btn ${currentMode === 'chat' ? 'active' : ''}`}
            onClick={() => setMode('chat')}
         >
           <MessageSquare size={16} /> Chat
         </motion.button>
         <motion.button 
            whileTap={{ scale: 0.95 }}
            className={`mode-btn ${currentMode === 'image' ? 'active' : ''}`}
            onClick={() => setMode('image')}
         >
           <Image size={16} /> Image
         </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="glass-input">
        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--foreground)', opacity: 0.8 }}>
          <Plus size={24} />
        </button>
        
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={currentMode === 'chat' ? "Ask anything..." : "Describe an image to create..."}
          rows={1}
          disabled={isLoading}
        />

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button type="button" style={{ background: 'none', border: 'none', color: 'var(--accent)' }}>
            <Layers size={20} />
          </button>
          
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: input.trim() ? 'white' : 'var(--secondary)',
              color: 'black',
              border: 'none',
              borderRadius: '50%',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
          >
            <Send size={20} />
          </motion.button>
        </div>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', opacity: 0.5 }}>
        DreamCanvas Assistant can make mistakes. Verify important info.
      </div>
    </div>
  );
};

export default ChatInput;
