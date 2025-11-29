"use client";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface UseCase {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
}

const useCases: UseCase[] = [
  { 
    number: 1, 
    title: "Feel it Real", 
    description: "Cinematic realism that feels alive. Create authentic human performances with real actions and motion depth",
    imageUrl: "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
 
  { 
    number: 2, 
    title: "Virtual Location Scouting", 
    description: "Generate photorealistic environments from text; explore infinite location variations instantly",
    imageUrl: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 3, 
    title: "Script Analysis & Breakdown", 
    description: "AI identifies technical requirements, complex scenes, and suggests simplifications instantly",
    imageUrl: "https://images.pexels.com/photos/6899393/pexels-photo-6899393.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  
  { 
    number: 4, 
    title: "Synthetic Performer Testing", 
    description: "Generate digital doubles to preview scenes and test creative direction before hiring talent",
    imageUrl: "https://images.pexels.com/photos/8132616/pexels-photo-8132616.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 5, 
    title: "Real-Time VFX on Set", 
    description: "Integrate VFX effects during filming; see final result immediately without post-production",
    imageUrl: "https://images.pexels.com/photos/7991483/pexels-photo-7991483.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 6, 
    title: "Dynamic Lighting Optimization", 
    description: "AI predicts optimal lighting placement and color based on emotional mood and scene action",
    imageUrl: "https://images.pexels.com/photos/2928423/pexels-photo-2928423.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 7, 
    title: "Intelligent Camera Movement", 
    description: "AI suggests camera angles and paths; assists with motion and precise automated movements",
    imageUrl: "https://images.pexels.com/photos/5273046/pexels-photo-5273046.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 8, 
    title: "Performance Capture Enhancement", 
    description: "Standard footage enhanced with AI; actors integrated with digital characters seamlessly",
    imageUrl: "https://images.pexels.com/photos/7991226/pexels-photo-7991226.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  
  { 
    number: 9, 
    title: "Dialogue Fix (ADR)", 
    description: "Fix dialogue issues without reshoots; maintain lip-sync and expression automatically",
    imageUrl: "https://images.pexels.com/photos/7991442/pexels-photo-7991442.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 10, 
    title: "Continuity Checking", 
    description: "Detect continuity errors instantly; flag costume, lighting, and spatial inconsistencies",
    imageUrl: "https://images.pexels.com/photos/7991464/pexels-photo-7991464.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 11, 
    title: "Crowd Generation", 
    description: "Generate realistic crowds and extras digitally; change composition without hiring talent",
    imageUrl: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  
  { 
    number: 12, 
    title: "Intelligent Scene Detection", 
    description: "AI detects best takes automatically based on performance quality and technical execution",
    imageUrl: "https://images.pexels.com/photos/7991522/pexels-photo-7991522.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 13, 
    title: "Audio Transcription", 
    description: "Automatic transcription of all dialogue in seconds; generate multi-language subtitles",
    imageUrl: "https://images.pexels.com/photos/4087996/pexels-photo-4087996.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 14, 
    title: "Color Grading Automation", 
    description: "Automatic color grading from description or reference images; adjustable in real-time",
    imageUrl: "https://images.pexels.com/photos/3945320/pexels-photo-3945320.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 15, 
    title: "Background Replacement", 
    description: "Replace backgrounds without green screen; transform indoor to outdoor seamlessly",
    imageUrl: "https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 16, 
    title: "VFX Generation", 
    description: "Generate VFX effects instantly from text description; particle effects, creatures, sci-fi",
    imageUrl: "https://images.pexels.com/photos/2962135/pexels-photo-2962135.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 17, 
    title: "Video Upscaling to 4K", 
    description: "Convert low-resolution footage to 1080p or 4K automatically while preserving detail",
    imageUrl: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 18, 
    title: "Object & Element Removal", 
    description: "Mark unwanted object and AI removes it seamlessly; maintains lighting and motion",
    imageUrl: "https://images.pexels.com/photos/5202956/pexels-photo-5202956.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    number: 19, 
    title: "Sound Design & Synthesis", 
    description: "Describe desired sound and AI generates adaptive soundscapes and synthetic foley",
    imageUrl: "https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg?auto=compress&cs=tinysrgb&w=800"
  },


  { 
    number: 20, 
    title: "Archival Footage Restoration", 
    description: "Restore archival material to broadcast quality; enhance clarity and colorize B&W",
    imageUrl: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  
  { 
    number: 21, 
    title: "Rapid Prototyping & Animatics", 
    description: "Turn script into moving animatic in hours; present polished preview for approvals",
    imageUrl: "https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

const AppsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, useCases.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleCards = useCases.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center">
          <h2 className="text-[40px] font-normal tracking-[-2px] text-gray-900 mb-2">
            Use Case for Everything
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Ideal for businesses crafting quick advertisements, it streamlines the process from voice prompts to polished outputs, emphasizing speed, ease, and targeted creativity for marketing needs.
          </p>
        </div>

        <div className="mt-12 mb-6 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-900 transition-colors hover:text-gray-600 text-sm font-medium"
            >
              View All Features
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.number}
                    onClick={() => {
                      setCurrentIndex(Math.min(useCase.number - 1, maxIndex));
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-900">{useCase.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{useCase.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous page"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next page"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {currentIndex + 1}-{Math.min(currentIndex + cardsPerView, useCases.length)} of {useCases.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 px-12">
          {visibleCards.map((useCase) => (
            <div
              key={useCase.number}
              className="block rounded-lg border border-black/10 bg-white p-4 transition-all duration-300 hover:bg-gray-100 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="flex-shrink-0 w-5 h-5 rounded bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-[10px]">
                  {useCase.number}
                </div>
                <h3 className="text-lg font-semibold leading-tight text-gray-900">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                {useCase.description}
              </p>
              <img
                src={useCase.imageUrl}
                alt={useCase.title}
                className="w-full h-28 rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppsShowcase;