"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Film, Palette, Music, Zap, Check } from "lucide-react";

const stages = [
  { id: 1, name: "Analyzing Script", icon: Sparkles, duration: 8 },
  { id: 2, name: "Rendering Scenes", icon: Film, duration: 25 },
  { id: 3, name: "Applying Visual Effects", icon: Palette, duration: 15 },
  { id: 4, name: "Mixing Audio", icon: Music, duration: 10 },
  { id: 5, name: "Final 4K Export", icon: Zap, duration: 5 },
];

export default function GenerationProgress() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);

  useEffect(() => {
    const totalDuration = stages.reduce((acc, stage) => acc + stage.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 0.1;
      
      let completedDuration = 0;
      let currentStageIndex = 0;
      
      for (let i = 0; i < stages.length; i++) {
        if (elapsed >= completedDuration + stages[i].duration) {
          completedDuration += stages[i].duration;
          currentStageIndex = i + 1;
        } else {
          break;
        }
      }
      
      setCurrentStage(Math.min(currentStageIndex, stages.length - 1));
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      
      if (currentStageIndex < stages.length) {
        const currentStageDuration = stages[currentStageIndex].duration;
        const currentStageElapsed = elapsed - completedDuration;
        setStageProgress((currentStageElapsed / currentStageDuration) * 100);
      } else {
        setStageProgress(100);
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-teal-500/5 to-pink-500/5" />
      
      <motion.div
        className="relative z-10 w-full max-w-3xl space-y-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center space-y-4">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-light text-sidebar-foreground">
            Creating Your Masterpiece
          </h1>
          <p className="text-text-quiet">
            AI is generating your 4K broadcast-quality video ad
          </p>
        </div>

        <div className="bg-bg-subtle border border-border-subtle rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-quiet">Overall Progress</span>
              <span className="text-sidebar-foreground font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-bg-underlay rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 via-teal-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isComplete = index < currentStage;
              const isCurrent = index === currentStage;
              const isPending = index > currentStage;

              return (
                <motion.div
                  key={stage.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isCurrent
                      ? "border-teal-500 bg-teal-500/10"
                      : isComplete
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-border-subtle bg-bg-underlay"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCurrent
                        ? "bg-gradient-to-br from-teal-500 to-teal-600"
                        : isComplete
                        ? "bg-green-500"
                        : "bg-bg-subtle"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isCurrent ? "text-white" : "text-text-quiet"}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${isCurrent || isComplete ? "text-sidebar-foreground" : "text-text-quiet"}`}>
                        {stage.name}
                      </span>
                      {isCurrent && (
                        <span className="text-xs text-teal-400 font-medium">
                          {Math.round(stageProgress)}%
                        </span>
                      )}
                      {isComplete && (
                        <span className="text-xs text-green-400 font-medium">Complete</span>
                      )}
                    </div>
                    
                    {isCurrent && (
                      <div className="h-1 bg-bg-underlay rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${stageProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-teal-500 mb-1">4K</div>
            <div className="text-xs text-text-quiet">Resolution</div>
          </div>
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-blue-500 mb-1">30fps</div>
            <div className="text-xs text-text-quiet">Frame Rate</div>
          </div>
          <div className="bg-bg-subtle/50 border border-border-subtle rounded-xl p-4">
            <div className="text-2xl font-light text-pink-500 mb-1">HDR</div>
            <div className="text-xs text-text-quiet">Color Depth</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-xl p-6 text-center">
          <p className="text-sm text-text-quiet">
            <span className="text-teal-400 font-medium">Pro Tip:</span> While we generate your ad, explore our marketplace to see top-performing videos in your industry
          </p>
        </div>
      </motion.div>
    </div>
  );
}

