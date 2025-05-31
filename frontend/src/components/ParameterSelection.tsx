import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, SkipForward } from 'lucide-react';
import ParameterCard from './ParameterCard';

interface Option {
  value: string;
  label: string;
  image: string;
  description: string;
}

interface ParameterSelectionProps {
  title: string;
  description: string;
  options: Option[];
  onSelect: (value: string) => void;
  onSkip: () => void;
}

const ParameterSelection: React.FC<ParameterSelectionProps> = ({
  title,
  description,
  options,
  onSelect,
  onSkip
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-16 max-w-4xl"
      >
        <h2 className="text-5xl font-bold text-white mb-6 font-arabic">{title}</h2>
        <p className="text-xl text-gray-200 leading-relaxed">{description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {options.map((option, index) => (
          <ParameterCard
            key={option.value}
            title={option.label}
            description={option.description}
            image={option.image}
            onClick={() => onSelect(option.value)}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onSkip}
        className="mt-12 flex items-center gap-3 px-8 py-4 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all duration-500 group"
      >
        <SkipForward size={20} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="text-lg">Skip this step</span>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
};

export default ParameterSelection;