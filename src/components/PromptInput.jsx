import { motion } from 'framer-motion';

const PromptInput = ({ value, onChange, placeholder, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass"
      style={{
        width: '100%',
        padding: '1.25rem',
        marginTop: '1.5rem',
        marginBottom: '1.5rem'
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        style={{
          width: '100%',
          resize: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--foreground)',
          fontSize: '1rem',
          lineHeight: '1.5',
          fontFamily: 'inherit'
        }}
      />
    </motion.div>
  );
};

export default PromptInput;
