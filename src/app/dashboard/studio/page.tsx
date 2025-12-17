"use client";

import { useState } from "react";
import VoiceStudio from "@/components/dashboard/studio/voice-studio";
import AICoDirector from "@/components/dashboard/studio/ai-co-director";
import GenerationProgress from "@/components/dashboard/studio/generation-progress";
import VideoPreview from "@/components/dashboard/studio/video-preview";

export default function StudioPage() {
  const [stage, setStage] = useState<"input" | "planning" | "generating" | "preview">("input");
  const [voiceInput, setVoiceInput] = useState("");
  const [recommendations, setRecommendations] = useState<any>(null);
  const [videoResult, setVideoResult] = useState<any>(null);

  const handleVoiceComplete = (transcript: string) => {
    setVoiceInput(transcript);
    setStage("planning");
    
    setTimeout(() => {
      setRecommendations({
        talent: [
          { id: 1, name: "Sophia Chen", type: "Luxury Brand Specialist", image: "/talent/1.jpg", matchScore: 98 },
          { id: 2, name: "Marcus Johnson", type: "Tech Innovator", image: "/talent/2.jpg", matchScore: 95 },
          { id: 3, name: "Aisha Rahman", type: "Fashion Icon", image: "/talent/3.jpg", matchScore: 92 }
        ],
        scripts: [
          { id: 1, hook: "Time doesn't wait...", duration: "30s", ctaPower: 9.2, emotionalImpact: "Desire" },
          { id: 2, hook: "Elegance redefined...", duration: "30s", ctaPower: 8.8, emotionalImpact: "Aspiration" }
        ],
        music: [
          { id: 1, name: "Cinematic Strings", mood: "Sophisticated", bpm: 80, energy: 7 },
          { id: 2, name: "Modern Pulse", mood: "Contemporary", bpm: 95, energy: 8 }
        ],
        shots: [
          { id: 1, name: "Hero Close-up", angle: "Low Angle", movement: "Slow Push", impact: 9.5 },
          { id: 2, name: "Product Reveal", angle: "Overhead", movement: "Crane Down", impact: 9.2 }
        ],
        culturalInsights: {
          primaryMarket: "Middle East Premium Segment",
          colorPalette: ["#D4AF37", "#000000", "#FFFFFF"],
          visualStyle: "Minimalist Luxury",
          culturalNotes: "Arabic-friendly composition, RTL-optimized text placement"
        }
      });
    }, 2000);
  };

  const handleGenerate = (config: any) => {
    setStage("generating");
    
    setTimeout(() => {
      setVideoResult({
        url: "/preview/generated.mp4",
        thumbnail: "/preview/thumb.jpg",
        duration: 30,
        resolution: "4K",
        fileSize: "45MB",
        performance: {
          predictedCTR: 4.8,
          predictedConversion: 2.3,
          estimatedROI: 340,
          audienceScore: 92
        }
      });
      setStage("preview");
    }, 60000);
  };

  return (
    <div className="flex-1 overflow-hidden bg-bg-underlay">
        {stage === "input" && (
          <VoiceStudio onComplete={handleVoiceComplete} />
        )}
        
        {stage === "planning" && (
          <AICoDirector 
            voiceInput={voiceInput}
            recommendations={recommendations}
            onGenerate={handleGenerate}
            onBack={() => setStage("input")}
          />
        )}
        
        {stage === "generating" && (
          <GenerationProgress />
        )}
        
        {stage === "preview" && (
          <VideoPreview 
            video={videoResult}
            onPublishToMarketplace={() => {}}
            onRegenerate={() => setStage("planning")}
            onNewVideo={() => setStage("input")}
          />
        )}
    </div>
  );
}

