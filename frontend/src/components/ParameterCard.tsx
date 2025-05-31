import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ParameterCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  delay?: number;
}

const ParameterCard: React.FC<ParameterCardProps> = ({
  title,
  description,
  image,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className="group relative w-full aspect-[3/4] md:aspect-auto md:h-[28rem] rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-700 shadow-soft"
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold transform group-hover:translate-y-0 transition-transform duration-500">
            {title}
          </h3>
          <p className="text-base md:text-lg text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {description}
          </p>

          <div className="mt-4 md:mt-6 flex items-center gap-2 text-emerald-400 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <span className="text-md md:text-lg font-medium">Explore</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ParameterCard;
