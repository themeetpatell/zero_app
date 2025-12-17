"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Sparkles, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceStudioProps {
  onComplete: (transcript: string) => void;
}

export default function VoiceStudio({ onComplete }: VoiceStudioProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [volume, setVolume] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript("");
    
    setTimeout(() => {
      const demoText = language === "en" 
        ? "Create a luxury watch advertisement. I want a sophisticated feel with a dark, elegant background. Show the watch in extreme detail with dramatic lighting. The target audience is affluent professionals aged 30-50. Make it feel exclusive and timeless."
        : "أنشئ إعلان ساعة فاخرة. أريد إحساسًا راقيًا مع خلفية داكنة وأنيقة. اعرض الساعة بتفاصيل دقيقة مع إضاءة درامية. الجمهور المستهدف هم المحترفون الأثرياء الذين تتراوح أعمارهم بين 30-50 عامًا.";
      
      let currentText = "";
      const words = demoText.split(" ");
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < words.length) {
          currentText += (index > 0 ? " " : "") + words[index];
          setTranscript(currentText);
          setVolume(Math.random() * 100);
          index++;
        } else {
          clearInterval(interval);
          setVolume(0);
        }
      }, 150);
    }, 500);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setVolume(0);
  };

  const handleGenerate = () => {
    if (transcript) {
      onComplete(transcript);
    }
  };

  useEffect(() => {
    if (transcript && !isRecording) {
      setSuggestions([
        "Add slow-motion product shots",
        "Include background music: cinematic",
        "Set duration to 30 seconds",
        "Add Arabic subtitles"
      ]);
    }
  }, [transcript, isRecording]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-teal-500/5 to-pink-500/5" />
      
      <motion.div 
        className="relative z-10 w-full max-w-4xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-teal-500" />
            <h1 className="text-4xl font-light text-sidebar-foreground tracking-tight">
              Voice Studio
            </h1>
          </div>
          <p className="text-lg text-text-quiet font-light max-w-2xl mx-auto">
            Speak your vision. Our AI Co-Director will bring it to life in broadcast-quality 4K.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setLanguage("en")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              language === "en"
                ? "bg-teal-500 text-white"
                : "bg-bg-subtle text-text-quiet hover:bg-bg-offset"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              language === "ar"
                ? "bg-teal-500 text-white"
                : "bg-bg-subtle text-text-quiet hover:bg-bg-offset"
            }`}
          >
            العربية
          </button>
        </div>

        <div className="relative">
          <div className="bg-bg-subtle border border-border-subtle rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center gap-6">
              <motion.button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-gradient-to-br from-red-500 to-pink-500"
                    : "bg-gradient-to-br from-teal-500 to-teal-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? (
                  <MicOff className="w-12 h-12 text-white" />
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
                
                {isRecording && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-red-500/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>

              {isRecording && (
                <div className="w-full max-w-md">
                  <div className="flex gap-1 h-12 items-center justify-center">
                    {[...Array(40)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-teal-500 to-teal-600 rounded-full"
                        animate={{
                          height: [
                            4,
                            Math.random() * volume * 0.4 + 4,
                            4,
                          ],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.02,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-text-quiet font-medium">
                  {isRecording ? "Listening..." : "Click to start speaking"}
                </p>
              </div>
            </div>

            <AnimatePresence>
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-border-subtle"
                >
                  <div className="bg-bg-underlay rounded-xl p-4 max-h-48 overflow-y-auto">
                    <p className={`text-sm text-sidebar-foreground leading-relaxed ${language === "ar" ? "text-right" : "text-left"}`}>
                      {transcript}
                    </p>
                  </div>

                  {!isRecording && suggestions.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-text-quiet font-medium">AI Suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => setTranscript(prev => prev + " " + suggestion)}
                            className="px-3 py-1.5 bg-bg-underlay hover:bg-teal-500/10 border border-border-subtle hover:border-teal-500/30 rounded-lg text-xs text-text-quiet hover:text-teal-400 transition-all"
                          >
                            + {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isRecording && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={handleStartRecording}
                        className="flex-1 px-6 py-3 bg-bg-offset hover:bg-bg-subtle border border-border-subtle rounded-xl text-sm font-medium text-text-quiet hover:text-sidebar-foreground transition-all"
                      >
                        Record Again
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all"
                      >
                        Continue to AI Co-Director →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-teal-500 mb-1">30s</div>
            <div className="text-xs text-text-quiet">Avg. Generation Time</div>
          </div>
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-blue-500 mb-1">4K</div>
            <div className="text-xs text-text-quiet">Broadcast Quality</div>
          </div>
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-pink-500 mb-1">24+</div>
            <div className="text-xs text-text-quiet">Languages Supported</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

