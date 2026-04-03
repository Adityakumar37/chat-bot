import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, onClick, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center justify-center px-6 py-3 font-semibold text-white transition-all overflow-hidden bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={isLoading}
      {...props}
      style={{
        backgroundColor: 'var(--primary)',
        borderRadius: 'var(--radius)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Generating...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
