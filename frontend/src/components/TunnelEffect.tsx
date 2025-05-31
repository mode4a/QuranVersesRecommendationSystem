import React, { useState, useRef, useEffect } from "react";
import { Option } from "../data/parameterOptions";

interface TunnelEffectProps {
  progress: number;
  options?: Option[];
  onOptionSelect?: (optionValue: string) => void;
  currentStep?: number;
  zoomEffect?: number;
  skipSelection?: () => void;
}

const TunnelEffect: React.FC<TunnelEffectProps> = ({
  progress = 0,
  options = [],
  onOptionSelect = () => {},
  currentStep = 0,
  zoomEffect = 0,
  skipSelection,
}) => {
  const [tunnelZoom, setTunnelZoom] = useState(0);
  const tunnelRef = useRef<HTMLDivElement>(null);

  // Handle zoom effect animation
  useEffect(() => {
    if (zoomEffect > 0) {
      setTunnelZoom(0.2);
      const timer = setTimeout(() => {
        setTunnelZoom(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [zoomEffect]);

  // Calculate light intensity and revelation based on progress (0-1)
  const lightIntensity = 40 + progress * 60;
  const revealFactor = Math.min(1, progress * 1.5); // Controls how much detail is revealed
  const whiteTransition = progress > 0.95 ? (progress - 0.95) * 20 : 0;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Tunnel main structure */}
      <div
        ref={tunnelRef}
        className="absolute inset-0 bg-slate-900 overflow-hidden"
        style={{
          perspective: "10000px",
          perspectiveOrigin: "center",
        }}
      >
        {/* Enhanced tunnel rings with texture and depth */}
        {Array.from({ length: 25 }).map((_, index) => {
          const ringPosition = index / 29;
          const normalizedPos = index / 24;
          const distanceFromViewer =
            normalizedPos * 1.5 - progress * 1.2 + tunnelZoom;

          if (distanceFromViewer < 0) return null;

          const scale = 1 - distanceFromViewer * 0.5;
          const opacity = 0.15 + normalizedPos * 0.3 * revealFactor;
          const blur = normalizedPos * 2;
          const glowIntensity = Math.max(
            0,
            (1 - normalizedPos) * revealFactor * 30
          );

          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 border-2 border-blue-400 rounded-full"
              style={{
                width: `${Math.max(50, 120 * scale)}vmin`,
                height: `${Math.max(50, 120 * scale)}vmin`,
                transform: `
                  translate(-50%, -50%) 
                  translateZ(${-distanceFromViewer * 400}px)
                  scale(${Math.max(0.1, scale)})
                `,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                boxShadow: `
                  0 0 ${10 + ringPosition * 30}px rgba(59, 130, 246, ${
                  opacity * 0.5
                }),
                  inset 0 0 ${glowIntensity}px rgba(255, 255, 255, ${
                  lightIntensity * 0.3
                })
                `,
                borderColor: `rgba(59, 130, 246, ${opacity})`,
                transition: "none",
              }}
            />
          );
        })}

        {/* Enhanced light source at tunnel's end */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-white via-blue-200 to-white"
          style={{
            width: `${20 + lightIntensity * 1.5}px`,
            height: `${20 + lightIntensity * 1.5}px`,
            transform: `translate(-50%, -50%) translateZ(-1000px) scale(${
              1 + progress * 2
            })`,
            boxShadow: `
              0 0 ${
                50 + lightIntensity
              }px ${lightIntensity}px rgba(255, 255, 255, 0.8),
              0 0 ${100 + lightIntensity * 2}px ${
              lightIntensity * 2
            }px rgba(59, 130, 246, 0.4)
            `,
            opacity: 0.3 + progress * 0.7,
            filter: `blur(${5 + progress * 10}px)`,
          }}
        />

        {/* Tunnel Walls Texture */}
        <div
          className="absolute inset-0"
          style={{ opacity: 0.3 + progress * 0.7 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 bg-gradient-to-t from-slate-700/20 to-transparent"
              style={{
                width: "4px",
                height: "100%",
                transform: `
                  translate(-50%, -50%) 
                  rotate(${i * 45}deg) 
                  scale(${1 + zoomEffect * 0.5})
                `,
                filter: `blur(${2 + zoomEffect * 3}px)`,
                opacity: 0.6 - zoomEffect * 0.4,
              }}
            />
          ))}
        </div>

        {/* Enhanced light beams with dynamic movement */}
        <div className="absolute inset-0 z-10 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-blue-400/30 to-white/30"
              style={{
                width: `${3 + Math.sin((i / 12) * Math.PI) * 2}px`,
                height: "100%",
                transform: `
                  translate(-50%, -50%) 
                  rotate(${i * 30}deg) 
                  scale(${1 + progress * 0.5})
                `,
                opacity: 0.1 + progress * 0.4,
                filter: `blur(${3 + progress * 5}px)`,
                animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* Enhanced particles with varied sizes and movements */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 40 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const speed = Math.random() * 5 + 3;
            const delay = Math.random() * 5;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const particleProgress = Math.max(0, progress - i / 40);

            return (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-300 to-white"
                style={{
                  width: `${size * (1 + particleProgress)}px`,
                  height: `${size * (1 + particleProgress)}px`,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  opacity: (0.3 + Math.random() * 0.5) * particleProgress,
                  filter: "blur(1px)",
                  animation: `particle-move ${speed}s linear ${delay}s infinite`,
                  transform: `scale(${1 + particleProgress * 2})`,
                }}
              />
            );
          })}
        </div>

        {/* Atmospheric fog/mist effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent, rgba(59, 130, 246, ${
              0.05 * progress
            }))`,
            opacity: revealFactor,
          }}
        />

        {/* Final White Transition */}
        <div
          className="absolute inset-0 bg-white pointer-events-none"
          style={{
            opacity: whiteTransition,
            transition: "opacity 0.3s ease-out",
          }}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Title and progress indicator */}
        <div className="mb-4 text-center z-10 pointer-events-none">
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {currentStep >= 0 && options.length > 0
              ? `Step ${currentStep + 1}`
              : ""}
          </h2>

          {/* Progress bar */}
          {progress < 1 && (
            <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-blue-400 transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Skip button */}
        {skipSelection && progress < 1 && (
          <div className="absolute top-4 right-4 pointer-events-auto">
            <button
              onClick={skipSelection}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors font-medium shadow-lg flex items-center"
            >
              Skip All <span className="ml-1">→</span>
            </button>
          </div>
        )}

        {/* Options grid - displayed with proper spacing and styling */}
        {progress < 1 && (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pointer-events-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onOptionSelect(option.value)}
                className="bg-black/40 backdrop-blur-sm border border-gray-700 hover:border-blue-500 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="relative h-36">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {option.label}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TunnelEffect;
