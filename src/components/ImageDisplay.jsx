import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Download, Share2 } from 'lucide-react';

const ImageDisplay = ({ imageUrl, isLoading }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `rocket-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="glass"
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '2rem'
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="animate-pulse"
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <ImageIcon size={48} color="var(--border)" />
            <p style={{ color: 'var(--border)' }}>Painting your imagination...</p>
          </motion.div>
        ) : imageUrl ? (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={imageUrl}
              alt="Generated"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Actions Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <button
                onClick={handleDownload}
                className="glass"
                style={{
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Download size={20} />
              </button>
              <button
                className="glass"
                style={{
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white'
                }}
              >
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              color: 'var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <ImageIcon size={48} />
            <p>Your creation will appear here</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageDisplay;
