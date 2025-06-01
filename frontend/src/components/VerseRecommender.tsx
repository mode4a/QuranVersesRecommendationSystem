import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { getRandomVerse } from "../services/quranApi";
import { getBackgroundClass } from "../utils/backgroundHelper";
import { VerseData, VerseParameters } from "../types/types";
import LoadingIndicator from "./LoadingIndicator";
import JourneyStep from "./JourneyStep";
import VerseDisplay from "./VerseDisplay";
import TunnelEffect from "./TunnelEffect";
import WelcomeSection from "./WelcomeSection";
import FavoriteVerses from "./FavoritesPage";
import {
  themeOptions,
  audienceOptions,
  lengthOptions,
  toneOptions,
  locationOptions,
} from "../data/parameterOptions";

const steps = [
  {
    id: "theme",
    title: "Begin Your Journey",
    description:
      "Choose a theme that resonates with your heart and current needs. Each selection will guide you to relevant verses from the Holy Quran.",
    options: themeOptions,
    backgroundImage:
      "https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg",
  },
  {
    id: "audience",
    title: "Divine Addressees",
    description:
      "The Quran speaks to different audiences. Select who this divine message was intended for.",
    options: audienceOptions,
    backgroundImage:
      "https://images.pexels.com/photos/8851634/pexels-photo-8851634.jpeg",
  },
  {
    id: "length",
    title: "Depth of Guidance",
    description:
      "How detailed would you like the divine message to be? Choose the length that suits your contemplation.",
    options: lengthOptions,
    backgroundImage:
      "https://images.pexels.com/photos/1112186/pexels-photo-1112186.jpeg",
  },
  {
    id: "tone",
    title: "Nature of the Message",
    description:
      "The Quran carries different tones for different purposes. What kind of message are you seeking today?",
    options: toneOptions,
    backgroundImage:
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
  },
  {
    id: "location",
    title: "Period of Revelation",
    description:
      "The Quran was revealed in two distinct periods, each with its unique focus and characteristics.",
    options: locationOptions,
    backgroundImage:
      "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg",
  },
];

const VerseRecommender: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [showTunnel, setShowTunnel] = useState(false);
  const [zoomEffect, setZoomEffect] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null); // New state for API errors
  const [parameters, setParameters] = useState<VerseParameters>({
    theme: "",
    audience: "",
    length: "",
    tone: "",
    location: "",
  });

  const progress = currentStep >= 0 ? currentStep / steps.length : 0;

  useEffect(() => {
    if (zoomEffect > 0) {
      const timer = setTimeout(() => {
        setZoomEffect(0);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [zoomEffect]);

  // Reset all states to return to homepage
  const handleExit = () => {
    setVerse(null);
    setCurrentStep(-1);
    setLoading(false);
    setShowTunnel(false);
    setShowFavorites(false);
    setZoomEffect(0);
    setApiError(null); // Reset API error
    setParameters({
      theme: "",
      audience: "",
      length: "",
      tone: "",
      location: "",
    });
    setShowWelcome(true);
  };

  const handleViewFavorites = () => {
    setShowWelcome(false);
    setShowFavorites(true);
  };

  const handleBackFromFavorites = () => {
    setShowFavorites(false);
    setShowWelcome(true);
  };

  const handleSelect = (value: string) => {
    setZoomEffect(1);

    const param = steps[currentStep].id as keyof VerseParameters;
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }));

    setTimeout(() => {
      moveToNextStep();
    }, 300);
  };

  const handleSkip = () => {
    setZoomEffect(1);
    setTimeout(() => {
      moveToNextStep();
    }, 300);
  };

  const handleSkipAll = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const verseData = await getRandomVerse({
        theme: "",
        audience: "",
        length: "",
        tone: "",
        location: "",
      });
      setVerse(verseData);
    } catch (error) {
      console.error("Error fetching verse:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Could not fetch a verse. Please try again.";
      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const moveToNextStep = async () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep >= steps.length - 1) {
      setLoading(true);
      setApiError(null);

      try {
        console.log("Fetching verse with parameters:", parameters);
        const verseData = await getRandomVerse(parameters);

        setTimeout(() => {
          setVerse(verseData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching verse:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Could not fetch a verse. Please try again.";
        setApiError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    }
  };

  const handleStartJourney = () => {
    setShowWelcome(false);
    setShowTunnel(true);

    setTimeout(() => {
      setCurrentStep(0);
    }, 150);
  };

  // Handle retry after API error
  const handleRetry = () => {
    setApiError(null);
    if (currentStep >= steps.length - 1) {
      moveToNextStep();
    }
  };

  const backgroundClass = verse ? getBackgroundClass(verse.tone) : "";

  const currentOptions =
    currentStep >= 0 && currentStep < steps.length
      ? steps[currentStep].options
      : [];

  return (
    <div className="bg-slate-900 min-h-screen">
      {showWelcome && (
        <WelcomeSection
          onStartJourney={handleStartJourney}
          onViewFavorites={handleViewFavorites}
        />
      )}

      {showFavorites && <FavoriteVerses onBack={handleBackFromFavorites} />}

      <div className="min-h-screen">
        {showTunnel && (
          <TunnelEffect
            progress={progress}
            options={currentOptions}
            onOptionSelect={handleSelect}
            currentStep={currentStep}
            zoomEffect={zoomEffect}
            skipSelection={handleSkip}
          />
        )}

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <LoadingIndicator size="large" />
              <p className="text-white mt-4 text-lg">Fetching your verse...</p>
            </div>
          </motion.div>
        ) : apiError ? (
          // Error state display
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-8 text-white shadow-2xl max-w-md w-full text-center">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold mb-4">Connection Error</h3>
              <p className="text-gray-300 mb-6">{apiError}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={handleExit}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors duration-300"
                >
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        ) : verse ? (
          <VerseDisplay
            verse={verse}
            backgroundClass={backgroundClass}
            onExit={handleExit}
          />
        ) : (
          currentStep >= 0 &&
          !showTunnel && (
            <AnimatePresence mode="wait">
              <JourneyStep
                key={currentStep}
                title={steps[currentStep].title}
                description={steps[currentStep].description}
                options={steps[currentStep].options}
                backgroundImage={steps[currentStep].backgroundImage}
                onSelect={handleSelect}
                onSkip={handleSkip}
              />
            </AnimatePresence>
          )
        )}
      </div>
    </div>
  );
};

export default VerseRecommender;
