import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto w-32 h-32 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
          >
            <span className="text-6xl font-bold text-gradient">404</span>
          </motion.div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </motion.button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;