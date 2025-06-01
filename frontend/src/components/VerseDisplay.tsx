import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2, X } from "lucide-react";
import { VerseData } from "../types/types";
import { toast } from "react-toastify";
import { fetchVerseText } from "../services/quranApi"; // Import the new function

interface VerseDisplayProps {
  verse: VerseData;
  backgroundClass: string;
  onExit: () => void;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({
  verse,
  backgroundClass,
  onExit,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<VerseData[]>([]); // In-memory favorites
  const [actualVerseText, setActualVerseText] = useState<{
    text: string;
    translation: string;
  } | null>(null);
  const [loadingText, setLoadingText] = useState(true);

  // Load favorites from memory (you could also pass this as props from parent)
  useEffect(() => {
    // For now, initialize empty favorites array
    // In a real app, you might want to pass favorites from a parent component or context
    setFavorites([]);
  }, []);

  // Fetch actual verse text when component mounts
  useEffect(() => {
    const loadVerseText = async () => {
      try {
        const textData = await fetchVerseText(
          verse.surah_number,
          verse.verse_number
        );
        setActualVerseText(textData);
      } catch (error) {
        console.error("Failed to fetch verse text:", error);
        // Fallback to provided text
        setActualVerseText({
          text: verse.text,
          translation: verse.translation || "",
        });
      } finally {
        setLoadingText(false);
      }
    };

    loadVerseText();
  }, [verse]);

  // Show content after initial entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullContent(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (verse && verse.audio) {
      const audio = new Audio(verse.audio);
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("error", (e) => {
        console.error("Audio loading error:", e);
        toast.error("Audio file not available for this verse");
      });
      setAudioElement(audio);
      return () => {
        audio.pause();
        audio.removeEventListener("ended", () => setIsPlaying(false));
        audio.removeEventListener("error", () => {});
      };
    }
  }, [verse]);

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
          toast.error("Could not play audio. Audio file may not be available.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const saveToFavorites = () => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem("favoriteVerses") || "[]"
      );
      const isAlreadySaved = favorites.some(
        (fav: VerseData) =>
          fav.surah_number === verse.surah_number &&
          fav.verse_number === verse.verse_number
      );

      if (isAlreadySaved) {
        toast.info("This verse is already in your favorites");
        return;
      }

      favorites.push(verse);
      localStorage.setItem("favoriteVerses", JSON.stringify(favorites));
      toast.success("Verse saved to favorites");
    } catch (error) {
      console.error("Error saving verse to favorites:", error);
      toast.error("Failed to save verse to favorites");
    }
  };

  const shareVerse = () => {
    const verseText = actualVerseText?.text || verse.text;
    const translation = actualVerseText?.translation || verse.translation || "";

    const text = `${verseText}\n\n"${translation}"\n\nSurah ${verse.surah_name} (${verse.surah_number}:${verse.verse_number})`;

    if (navigator.share) {
      navigator
        .share({
          title: `Verse from Surah ${verse.surah_name}`,
          text: text,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing verse:", error);
          copyToClipboard(text);
        });
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Verse copied to clipboard"))
      .catch(() => toast.error("Failed to copy verse to clipboard"));
  };

  const displayText = actualVerseText?.text || verse.text;
  const displayTranslation = actualVerseText?.translation || verse.translation;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Background with a bright flash transition */}
      <motion.div
        className={`absolute inset-0 ${backgroundClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Light beam effect - simulates coming out of the tunnel */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 backdrop-blur-sm" />

      {/* Exit button in top-right corner */}
      <motion.button
        onClick={onExit}
        className="fixed top-6 right-6 z-30 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-300 text-white group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Exit to homepage"
      >
        <X
          size={24}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </motion.button>

      {/* Main content card with staggered reveal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 text-white shadow-2xl overflow-hidden"
      >
        {/* Decorative light beam from top */}
        <motion.div
          className="absolute top-0 left-1/2 w-[120%] h-20 bg-gradient-to-b from-blue-400/40 to-transparent -translate-x-1/2 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, delay: 0.6 }}
        />

        <div className="flex items-center justify-between mb-8">
          <motion.h3
            className="text-2xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Surah {verse.surah_name} ({verse.surah_number}:{verse.verse_number})
          </motion.h3>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <button
              onClick={saveToFavorites}
              className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors duration-300 cursor-pointer relative z-20"
              aria-label="Save to favorites"
            >
              <Heart size={20} className="text-pink-500" />
            </button>
            <button
              onClick={shareVerse}
              className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors duration-300 cursor-pointer relative z-20"
              aria-label="Share verse"
            >
              <Share2 size={20} />
            </button>
          </motion.div>
        </div>

        <div className="mb-10">
          {loadingText ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-300">Loading verse text...</p>
            </div>
          ) : (
            <>
              <motion.p
                className="text-4xl leading-relaxed text-right font-arabic mb-8"
                dir="rtl"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showFullContent ? 1 : 0,
                  y: showFullContent ? 0 : 20,
                }}
                transition={{ duration: 0.8 }}
              >
                {displayText}
              </motion.p>

              {displayTranslation && (
                <motion.p
                  className="text-xl text-gray-200 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: showFullContent ? 1 : 0,
                    y: showFullContent ? 0 : 20,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  "{displayTranslation}"
                </motion.p>
              )}
            </>
          )}
        </div>

        <motion.div
          className="flex items-center justify-between mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showFullContent ? 1 : 0,
            y: showFullContent ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className={`p-4 rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-red-500/80 hover:bg-red-600/80"
                  : "bg-emerald-500/80 hover:bg-emerald-600/80"
              }`}
              aria-label={isPlaying ? "Pause recitation" : "Play recitation"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <span className="text-lg">
              {isPlaying ? "Playing recitation..." : "Listen to recitation"}
            </span>
          </div>

          <div className="text-gray-200">
            Recited by Sheikh Mishary Rashid Alafasy
          </div>
        </motion.div>

        {/* Additional exit button at the bottom for better UX */}
        <motion.div
          className="flex justify-center mt-8 pt-6 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showFullContent ? 1 : 0,
            y: showFullContent ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={onExit}
            className="px-6 py-3 bg-slate-700/60 hover:bg-slate-600/60 rounded-full transition-all duration-300 text-white font-medium"
          >
            Return to Homepage
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VerseDisplay;
