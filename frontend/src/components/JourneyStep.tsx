import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, SkipForward } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  image: string;
  description: string;
}

interface JourneyStepProps {
  title: string;
  description: string;
  options: Option[];
  backgroundImage: string;
  onSelect: (value: string) => void;
  onSkip: () => void;
}

const JourneyStep: React.FC<JourneyStepProps> = ({
  title,
  description,
  options,
  backgroundImage,
  onSelect,
  onSkip
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 backdrop-blur-sm z-10" />
      
      <div className="relative z-20 max-w-7xl w-full mx-4 px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-arabic">{title}</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">{description}</p>
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              onClick={() => onSelect(option.value)}
              className="group relative h-80 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-3 transform group-hover:translate-y-0 transition-transform duration-500">
                  {option.label}
                </h3>
                <p className="text-gray-200 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {option.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onSkip}
          className="mt-12 mx-auto flex items-center gap-3 px-8 py-4 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all duration-500 group"
        >
          <SkipForward size={20} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="text-lg">Skip this step</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JourneyStep;