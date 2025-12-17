"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Music, Video, User, ChevronRight, Check } from "lucide-react";

interface AICoDirectorProps {
  voiceInput: string;
  recommendations: any;
  onGenerate: (config: any) => void;
  onBack: () => void;
}

export default function AICoDirector({ voiceInput, recommendations, onGenerate, onBack }: AICoDirectorProps) {
  const [selectedTalent, setSelectedTalent] = useState(recommendations?.talent[0]);
  const [selectedScript, setSelectedScript] = useState(recommendations?.scripts[0]);
  const [selectedMusic, setSelectedMusic] = useState(recommendations?.music[0]);
  const [selectedShots, setSelectedShots] = useState(recommendations?.shots.slice(0, 2));
  const [customizations, setCustomizations] = useState({
    brandColors: true,
    logoPlacement: true,
    ctaButton: true,
    duration: 30
  });

  if (!recommendations) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 text-teal-500 mx-auto animate-pulse" />
          <p className="text-text-quiet">AI Co-Director is analyzing your vision...</p>
        </div>
      </div>
    );
  }

  const handleGenerate = () => {
    onGenerate({
      talent: selectedTalent,
      script: selectedScript,
      music: selectedMusic,
      shots: selectedShots,
      customizations,
      culturalInsights: recommendations.culturalInsights
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-teal-500" />
              <h1 className="text-3xl font-light text-sidebar-foreground">AI Co-Director</h1>
            </div>
            <p className="text-text-quiet">Curated recommendations based on your vision</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-bg-subtle hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-text-quiet transition-all"
          >
            ← Back
          </button>
        </div>

        <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-quiet mb-3">Your Vision</h3>
          <p className="text-sm text-sidebar-foreground leading-relaxed">{voiceInput}</p>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-sidebar-foreground mb-2">Cultural Intelligence Insights</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-quiet">Target Market:</span>
                  <span className="ml-2 text-sidebar-foreground">{recommendations.culturalInsights.primaryMarket}</span>
                </div>
                <div>
                  <span className="text-text-quiet">Visual Style:</span>
                  <span className="ml-2 text-sidebar-foreground">{recommendations.culturalInsights.visualStyle}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-text-quiet">Notes:</span>
                  <span className="ml-2 text-sidebar-foreground">{recommendations.culturalInsights.culturalNotes}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {recommendations.culturalInsights.colorPalette.map((color: string, i: number) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg border-2 border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-light text-sidebar-foreground">AI Talent Selection</h2>
            </div>
            <div className="space-y-3">
              {recommendations.talent.map((talent: any) => (
                <motion.button
                  key={talent.id}
                  onClick={() => setSelectedTalent(talent)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTalent?.id === talent.id
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-border-subtle bg-bg-subtle hover:border-border-offset"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sidebar-foreground">{talent.name}</h3>
                        {selectedTalent?.id === talent.id && (
                          <Check className="w-5 h-5 text-teal-500" />
                        )}
                      </div>
                      <p className="text-sm text-text-quiet mb-2">{talent.type}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-bg-underlay rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
                            style={{ width: `${talent.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-teal-400 font-medium">{talent.matchScore}%</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-light text-sidebar-foreground">High-Performance Scripts</h2>
            </div>
            <div className="space-y-3">
              {recommendations.scripts.map((script: any) => (
                <motion.button
                  key={script.id}
                  onClick={() => setSelectedScript(script)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedScript?.id === script.id
                      ? "border-green-500 bg-green-500/10"
                      : "border-border-subtle bg-bg-subtle hover:border-border-offset"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sidebar-foreground">{script.hook}</h3>
                    {selectedScript?.id === script.id && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-text-quiet">Duration:</span>
                      <div className="text-sidebar-foreground font-medium mt-1">{script.duration}</div>
                    </div>
                    <div>
                      <span className="text-text-quiet">CTA Power:</span>
                      <div className="text-green-400 font-medium mt-1">{script.ctaPower}/10</div>
                    </div>
                    <div>
                      <span className="text-text-quiet">Emotion:</span>
                      <div className="text-sidebar-foreground font-medium mt-1">{script.emotionalImpact}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-pink-500" />
              <h2 className="text-xl font-light text-sidebar-foreground">Soundtrack Selection</h2>
            </div>
            <div className="space-y-3">
              {recommendations.music.map((track: any) => (
                <motion.button
                  key={track.id}
                  onClick={() => setSelectedMusic(track)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMusic?.id === track.id
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-border-subtle bg-bg-subtle hover:border-border-offset"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sidebar-foreground">{track.name}</h3>
                    {selectedMusic?.id === track.id && (
                      <Check className="w-5 h-5 text-pink-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-text-quiet">Mood: </span>
                      <span className="text-sidebar-foreground">{track.mood}</span>
                    </div>
                    <div>
                      <span className="text-text-quiet">BPM: </span>
                      <span className="text-sidebar-foreground">{track.bpm}</span>
                    </div>
                    <div>
                      <span className="text-text-quiet">Energy: </span>
                      <span className="text-pink-400">{track.energy}/10</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-light text-sidebar-foreground">Cinematic Shots</h2>
            </div>
            <div className="space-y-3">
              {recommendations.shots.map((shot: any) => (
                <motion.button
                  key={shot.id}
                  onClick={() => {
                    if (selectedShots.find((s: any) => s.id === shot.id)) {
                      setSelectedShots(selectedShots.filter((s: any) => s.id !== shot.id));
                    } else {
                      setSelectedShots([...selectedShots, shot]);
                    }
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedShots.find((s: any) => s.id === shot.id)
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-border-subtle bg-bg-subtle hover:border-border-offset"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sidebar-foreground">{shot.name}</h3>
                    {selectedShots.find((s: any) => s.id === shot.id) && (
                      <Check className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-text-quiet">Angle: </span>
                      <span className="text-sidebar-foreground">{shot.angle}</span>
                    </div>
                    <div>
                      <span className="text-text-quiet">Movement: </span>
                      <span className="text-sidebar-foreground">{shot.movement}</span>
                    </div>
                    <div>
                      <span className="text-text-quiet">Impact: </span>
                      <span className="text-orange-400">{shot.impact}/10</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
          <h2 className="text-xl font-light text-sidebar-foreground mb-4">Brand Customization</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 bg-bg-underlay rounded-lg cursor-pointer hover:bg-bg-offset transition-all">
              <input
                type="checkbox"
                checked={customizations.brandColors}
                onChange={(e) => setCustomizations({...customizations, brandColors: e.target.checked})}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm text-sidebar-foreground">Apply Brand Colors</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-bg-underlay rounded-lg cursor-pointer hover:bg-bg-offset transition-all">
              <input
                type="checkbox"
                checked={customizations.logoPlacement}
                onChange={(e) => setCustomizations({...customizations, logoPlacement: e.target.checked})}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm text-sidebar-foreground">Auto Logo Placement</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-bg-underlay rounded-lg cursor-pointer hover:bg-bg-offset transition-all">
              <input
                type="checkbox"
                checked={customizations.ctaButton}
                onChange={(e) => setCustomizations({...customizations, ctaButton: e.target.checked})}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm text-sidebar-foreground">Dynamic CTA Button</span>
            </label>
            <div className="p-3 bg-bg-underlay rounded-lg">
              <label className="text-sm text-text-quiet block mb-2">Duration</label>
              <select
                value={customizations.duration}
                onChange={(e) => setCustomizations({...customizations, duration: parseInt(e.target.value)})}
                className="w-full px-3 py-1.5 bg-bg-subtle border border-border-subtle rounded text-sm text-sidebar-foreground"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-4 bg-bg-subtle hover:bg-bg-offset border border-border-subtle rounded-xl text-sm font-medium text-text-quiet hover:text-sidebar-foreground transition-all"
          >
            Modify Voice Input
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 via-teal-500 to-pink-500 hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
          >
            Generate 4K Video
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

