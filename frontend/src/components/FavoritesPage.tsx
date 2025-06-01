import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Play,
  Pause,
  Share2,
  Trash2,
  ArrowLeft,
  BookOpenText,
} from "lucide-react";
import { VerseData } from "../types/types";
import { toast } from "react-toastify";

interface FavoriteVersesProps {
  onBack: () => void;
}

const FavoriteVerses: React.FC<FavoriteVersesProps> = ({ onBack }) => {
  const [favorites, setFavorites] = useState<VerseData[]>([]);
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{
    [key: string]: HTMLAudioElement;
  }>({});

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favoriteVerses");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      toast.error("Failed to load favorite verses");
    }
  }, []);

  // Create audio elements for verses that have audio
  useEffect(() => {
    const audioMap: { [key: string]: HTMLAudioElement } = {};

    favorites.forEach((verse) => {
      if (verse.audio) {
        const verseId = `${verse.surah_number}-${verse.verse_number}`;
        const audio = new Audio(verse.audio);
        audio.addEventListener("ended", () => setPlayingVerseId(null));
        audioMap[verseId] = audio;
      }
    });

    setAudioElements(audioMap);

    // Cleanup function
    return () => {
      Object.values(audioMap).forEach((audio) => {
        audio.pause();
        audio.removeEventListener("ended", () => setPlayingVerseId(null));
      });
    };
  }, [favorites]);

  const removeFromFavorites = (verseToRemove: VerseData) => {
    try {
      const updatedFavorites = favorites.filter(
        (verse) =>
          !(
            verse.surah_number === verseToRemove.surah_number &&
            verse.verse_number === verseToRemove.verse_number
          )
      );

      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteVerses", JSON.stringify(updatedFavorites));
      toast.success("Verse removed from favorites");
    } catch (error) {
      console.error("Error removing verse from favorites:", error);
      toast.error("Failed to remove verse from favorites");
    }
  };

  const togglePlay = (verse: VerseData) => {
    const verseId = `${verse.surah_number}-${verse.verse_number}`;
    const audio = audioElements[verseId];

    if (!audio) return;

    if (playingVerseId === verseId) {
      audio.pause();
      setPlayingVerseId(null);
    } else {
      // Pause any currently playing audio
      if (playingVerseId && audioElements[playingVerseId]) {
        audioElements[playingVerseId].pause();
      }

      audio.play();
      setPlayingVerseId(verseId);
    }
  };

  const shareVerse = (verse: VerseData) => {
    const text = `${verse.text}\n\nSurah ${verse.surah_name} (${verse.surah_number}:${verse.verse_number})`;

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900 text-white"
    >
      {/* Header */}
      <div className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-300"
                aria-label="Go back to homepage"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-500" />
                <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">
                  Favorite Verses
                </h1>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {favorites.length} verse{favorites.length !== 1 ? "s" : ""} saved
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <BookOpenText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">
              No favorite verses yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start exploring and save verses that speak to your heart
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors duration-300 font-medium"
            >
              Discover Verses
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {favorites.map((verse, index) => {
                const verseId = `${verse.surah_number}-${verse.verse_number}`;
                const isPlaying = playingVerseId === verseId;

                return (
                  <motion.div
                    key={verseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                  >
                    {/* Verse Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-emerald-400">
                        Surah {verse.surah_name} ({verse.surah_number}:
                        {verse.verse_number})
                      </h3>
                      <div className="flex items-center gap-2">
                        {verse.audio && (
                          <button
                            onClick={() => togglePlay(verse)}
                            className={`p-2 rounded-full transition-all duration-300 ${
                              isPlaying
                                ? "bg-red-500/80 hover:bg-red-600/80"
                                : "bg-emerald-500/80 hover:bg-emerald-600/80"
                            }`}
                            aria-label={
                              isPlaying ? "Pause recitation" : "Play recitation"
                            }
                          >
                            {isPlaying ? (
                              <Pause size={18} />
                            ) : (
                              <Play size={18} />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => shareVerse(verse)}
                          className="p-2 rounded-full bg-slate-700/80 hover:bg-slate-600/80 transition-colors duration-300"
                          aria-label="Share verse"
                        >
                          <Share2 size={18} />
                        </button>
                        <button
                          onClick={() => removeFromFavorites(verse)}
                          className="p-2 rounded-full bg-slate-700/80 hover:bg-red-600/80 transition-colors duration-300"
                          aria-label="Remove from favorites"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div className="mb-6">
                      <p
                        className="text-2xl md:text-3xl leading-relaxed text-right font-arabic mb-4"
                        dir="rtl"
                      >
                        {verse.text}
                      </p>

                      {/* Translation */}
                      {verse.translation && (
                        <p className="text-lg text-gray-300 leading-relaxed italic">
                          "{verse.translation}"
                        </p>
                      )}
                    </div>

                    {/* Audio Status */}
                    {isPlaying && (
                      <div className="text-sm text-emerald-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        Playing recitation...
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FavoriteVerses;
