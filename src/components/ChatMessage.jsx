import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import ImageDisplay from './ImageDisplay';

const ChatMessage = ({ message, isLast }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`message-row ${isUser ? 'user-row' : 'assistant-row'}`}
    >
      {!isUser && (
        <div style={{ marginRight: '12px', marginTop: '4px' }}>
          <img 
            src="/logo.png" 
            alt="Bot" 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '1px solid var(--accent)'
            }} 
          />
        </div>
      )}
      
      <div className={`bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        {message.type === 'image' ? (
          <div style={{ minWidth: '300px' }}>
             <p style={{ marginBottom: '12px', fontSize: '0.85rem', opacity: 0.8 }}>
               <Sparkles size={14} style={{ marginRight: '4px', display: 'inline' }} />
               Generated from prompt: "{message.content}"
             </p>
             <ImageDisplay imageUrl={message.imageUrl} isLoading={false} />
          </div>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        )}
      </div>

      {isUser && (
        <div style={{ marginLeft: '12px', marginTop: '4px' }}>
          <div className="glass" style={{ padding: '8px', borderRadius: '50%', background: 'var(--primary)' }}>
            <User size={20} color="white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const TypingIndicator = () => (
  <div className="message-row assistant-row">
     <div style={{ marginRight: '12px', marginTop: '4px' }}>
        <img 
          src="/logo.png" 
          alt="Bot" 
          style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '1px solid var(--accent)'
          }} 
        />
      </div>
      <div className="bubble assistant-bubble" style={{ padding: '12px 16px' }}>
        <div className="typing">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
  </div>
);

export default ChatMessage;
