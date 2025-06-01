import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpenText, Heart } from "lucide-react";

interface WelcomeSectionProps {
  onStartJourney: () => void;
  onViewFavorites: () => void; // New prop for favorites
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onStartJourney,
  onViewFavorites,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Load favorites count
  useEffect(() => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem("favoriteVerses") || "[]"
      );
      setFavoritesCount(favorites.length);
    } catch (error) {
      console.error("Error loading favorites count:", error);
    }
  }, []);

  // Disable scroll on the homepage
  useEffect(() => {
    // Save the original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Enable scrolling on component unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isZooming) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        containerRef.current.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      containerRef.current.style.setProperty("--mouse-x", `${x * 20}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y * 20}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isZooming]);

  // Handle journey start with zoom animation
  const handleStartJourney = () => {
    setIsZooming(true);

    // Delay the actual navigation to allow the zoom animation to play
    setTimeout(() => {
      onStartJourney();
    }, 1000); // Match this timing with the animation duration
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: isZooming ? 2 : 1,
          filter: isZooming ? "brightness(2)" : "brightness(1)",
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isZooming ? 1 : 0.5,
          ease: "easeInOut",
        }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(30, 58, 138, 0.2) 100%)",
        }}
      >
        {/* Favorites Button - Fixed position */}
        <motion.button
          onClick={onViewFavorites}
          className="fixed top-6 right-6 z-20 flex items-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm rounded-full transition-all duration-300 text-white group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5 text-pink-500" />
          <span className="font-medium">Favorites</span>
          {favoritesCount > 0 && (
            <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {favoritesCount > 99 ? "99+" : favoritesCount}
            </span>
          )}
        </motion.button>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/5 to-slate-900/10" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(30, 58, 138, 0.1) 0%, transparent 70%)`,
              transform: "translate(var(--mouse-x, 0), var(--mouse-y, 0))",
            }}
          />
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: isZooming ? 0.8 : 1,
          }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            animate={
              isZooming
                ? { scale: 1.5, opacity: 0 }
                : { scale: [1, 1.05, 1], opacity: 1 }
            }
            transition={
              isZooming
                ? { duration: 0.8 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <BookOpenText className="w-16 h-16 text-emerald-500" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: isZooming ? 0 : 1,
              scale: isZooming ? 1.2 : 1,
            }}
            transition={{
              duration: isZooming ? 0.5 : 0.8,
              delay: 0.4,
            }}
          >
            Discover Divine Guidance
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: isZooming ? 0 : 1,
            }}
            transition={{
              duration: isZooming ? 0.3 : 0.8,
              delay: 0.6,
            }}
          >
            Embark on a journey through the wisdom of the Quran, tailored to
            your spiritual needs
          </motion.p>

          <motion.button
            onClick={handleStartJourney}
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full overflow-hidden transition-all duration-300 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: isZooming ? 0 : 1,
              scale: isZooming ? 1.5 : 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            whileHover={{ scale: isZooming ? 1 : 1.05 }}
            whileTap={{ scale: isZooming ? 1 : 0.95 }}
            disabled={isZooming}
          >
            <span className="relative z-10">Begin Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={
            isZooming ? { opacity: 0, y: 50 } : { y: [0, 10, 0], opacity: 1 }
          }
          transition={
            isZooming
              ? { duration: 0.3 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeSection;
