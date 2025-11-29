"use client";

import React, { useRef, useEffect, useState } from "react";
import { User, Copy, Share, Flag, ThumbsUp, ThumbsDown, Download, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Film, Scissors, Wand2, Lightbulb, Maximize2, MoreHorizontal, Check, Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  videoUrl?: string;
  aspectRatio?: "16:9" | "9:16" | "1:1" | "4:5";
  timestamp?: Date;
}

interface ConversationViewProps {
  messages: Message[];
}

function ConversationView({ messages }: ConversationViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [expandedActions, setExpandedActions] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [favoritedMessages, setFavoritedMessages] = useState<Set<string>>(new Set());
  const [showShareDialog, setShowShareDialog] = useState<string | null>(null);
  const [shareType, setShareType] = useState<"private" | "public">("private");
  const [linkCopied, setLinkCopied] = useState(false);
  const [userActions, setUserActions] = useState<Set<string>>(new Set());
  const [collapsedSuggestions, setCollapsedSuggestions] = useState<Set<string>>(new Set());
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePlay = (messageId: string) => {
    const video = videoRefs.current.get(messageId);
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideo(messageId);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  const toggleMute = (messageId: string) => {
    const video = videoRefs.current.get(messageId);
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => {
        const next = new Set(prev);
        if (video.muted) {
          next.add(messageId);
        } else {
          next.delete(messageId);
        }
        return next;
      });
    }
  };

  const toggleFullscreen = (messageId: string) => {
    const video = videoRefs.current.get(messageId);
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const toggleExpandMessage = (messageId: string) => {
    setExpandedMessages(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const toggleExpandedActions = (messageId: string) => {
    setExpandedActions(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const toggleLike = (messageId: string) => {
    setLikedMessages(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const toggleFavorite = (messageId: string) => {
    setFavoritedMessages(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const toggleSuggestion = (messageId: string) => {
    setCollapsedSuggestions(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const handleAction = (messageId: string, action: string) => {
    setUserActions(prev => new Set(prev).add(`${messageId}-${action}`));
  };

  const handleDownload = async (messageId: string) => {
    try {
      const video = videoRefs.current.get(messageId);
      if (video) {
        const a = document.createElement('a');
        a.href = video.src;
        a.download = `ai-video-${messageId}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setCopiedId(messageId);
        setTimeout(() => setCopiedId(null), 1500);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = (messageId: string) => {
    const shareUrl = shareType === 'private' 
      ? `${window.location.origin}/private/${messageId}?token=${btoa(messageId)}`
      : `${window.location.origin}/share/${messageId}`;
    
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
      setShowShareDialog(null);
    }, 2000);
  };

  const getAspectRatioClass = (ratio?: string) => {
    switch (ratio) {
      case "9:16": return "aspect-[9/16] max-w-[240px]";
      case "1:1": return "aspect-square max-w-[360px]";
      case "4:5": return "aspect-[4/5] max-w-[320px]";
      default: return "aspect-video max-w-full";
    }
  };

  const getAspectRatioLabel = (ratio?: string) => {
    switch (ratio) {
      case "9:16": return "9:16";
      case "1:1": return "1:1";
      case "4:5": return "4:5";
      default: return "16:9";
    }
  };

  const getAISuggestion = (messageId: string) => {
    const actions = Array.from(userActions).filter(action => action.startsWith(`${messageId}-`));
    
    if (actions.length === 0) {
      return "Try Co-Director for pacing analysis or Extend to continue the sequence.";
    }

    const hasCoDirector = actions.some(action => action.includes('co-director'));
    const hasExtend = actions.some(action => action.includes('extend'));
    const hasRemix = actions.some(action => action.includes('remix'));
    const hasUpscale = actions.some(action => action.includes('upscale'));

    if (hasUpscale && hasCoDirector) {
      return "4K upscale + analysis complete! Try Remix for creative variations.";
    } else if (hasUpscale) {
      return "4K ready! Use Co-Director for detailed analysis or Extend for more content.";
    } else if (hasCoDirector && hasExtend) {
      return "Great work! Extended footage analyzed. Consider 4K upscaling next.";
    } else if (hasCoDirector) {
      return "Analysis complete! Strong composition detected. Try Extend or Upscale.";
    } else if (hasExtend) {
      return "Extended successfully! Use Co-Director to analyze new composition.";
    } else if (hasRemix) {
      return "New variation created! Consider upscaling to 4K for best quality.";
    }

    return "Try Co-Director for analysis or Extend to continue the sequence.";
  };

  const shouldTruncateMessage = (content: string) => {
    return content.split('\n').length > 3 || content.length > 200;
  };

  const getTruncatedContent = (content: string) => {
    const lines = content.split('\n');
    if (lines.length > 3) {
      return lines.slice(0, 3).join('\n');
    }
    if (content.length > 200) {
      return content.slice(0, 200);
    }
    return content;
  };

  const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="flex-1 overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600">
      <div className="mx-auto max-w-4xl px-2.5 py-2 sm:px-3">
        {messages.map((message) => (
          <div key={message.id} className="mb-2.5">
            {/* User message */}
            {message.role === "user" && (
              <div className="flex items-start gap-1.5 justify-end group">
                <div className="flex flex-col items-end max-w-[82%]">
                  <div className="backdrop-blur-xl bg-[#00665fff] border border-[#00bdb0]/30 rounded-xl rounded-tr-sm px-2.5 py-1.5 shadow-lg shadow-[#00bdb0]/20">
                    <p className={cn(
                      "text-[14px] leading-relaxed text-white/95",
                      !expandedMessages.has(message.id) && shouldTruncateMessage(message.content) && "line-clamp-3"
                    )}>
                      {expandedMessages.has(message.id) || !shouldTruncateMessage(message.content)
                        ? message.content
                        : getTruncatedContent(message.content)}
                    </p>
                    {shouldTruncateMessage(message.content) && (
                      <button
                        onClick={() => toggleExpandMessage(message.id)}
                        className="text-[9px] text-[#00bdb0] hover:text-[#00e8d9] mt-1 flex items-center gap-0.5 font-medium"
                      >
                        {expandedMessages.has(message.id) ? (
                          <>Show less <ChevronUp className="h-2.5 w-2.5" /></>
                        ) : (
                          <>Show more <ChevronDown className="h-2.5 w-2.5" /></>
                        )}
                      </button>
                    )}
                  </div>
                  <span className="mt-0.5 px-1 text-[8px] text-gray-600">
                    {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                  </span>
                </div>
                <div className="flex-shrink-0 w-5 h-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <User className="h-2.5 w-2.5 text-gray-400" strokeWidth={2} />
                </div>
              </div>
            )}

            {/* Assistant message */}
            {message.role === "assistant" && (
              <div 
                className="flex items-start gap-1.5 group"
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-lg backdrop-blur-xl bg-gradient-to-br from-[#00bdb0]/20 to-[#00bdb0]/20 border border-[#00bdb0]/30 flex items-center justify-center shadow-lg shadow-[#00bdb0]/10">
                  <Sparkles className="h-2.5 w-2.5 text-[#00bdb0]" strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Text response */}
                  {message.content && (
                    <div className="mb-1.5">
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl rounded-tl-sm px-2.5 py-1.5 shadow-xl">
                        <p className={cn(
                          "text-[14px] leading-relaxed text-gray-300",
                          !expandedMessages.has(message.id) && shouldTruncateMessage(message.content) && "line-clamp-3"
                        )}>
                          {expandedMessages.has(message.id) || !shouldTruncateMessage(message.content)
                            ? message.content
                            : getTruncatedContent(message.content)}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          {shouldTruncateMessage(message.content) && (
                            <button
                              onClick={() => toggleExpandMessage(message.id)}
                              className="text-[9px] text-gray-500 hover:text-gray-300 flex items-center gap-0.5 font-medium"
                            >
                              {expandedMessages.has(message.id) ? (
                                <>Show less <ChevronUp className="h-2.5 w-2.5" /></>
                              ) : (
                                <>Show more <ChevronDown className="h-2.5 w-2.5" /></>
                              )}
                            </button>
                          )}
                          <span className="text-[8px] text-gray-600 ml-auto">
                            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video output */}
                  {message.videoUrl && (
                    <div className="space-y-1.5">
                      {/* Video container with inline controls */}
                      <div className={cn(
                        "relative rounded-lg overflow-hidden bg-black shadow-2xl group/video backdrop-blur-xl border border-white/10",
                        getAspectRatioClass(message.aspectRatio)
                      )}>
                        <video
                          ref={(el) => {
                            if (el) {
                              videoRefs.current.set(message.id, el);
                              el.addEventListener('play', () => setPlayingVideo(message.id));
                              el.addEventListener('pause', () => setPlayingVideo(null));
                              el.addEventListener('ended', () => setPlayingVideo(null));
                            }
                          }}
                          src={sampleVideoUrl}
                          className="w-full h-full object-cover"
                          loop
                          muted={mutedVideos.has(message.id)}
                          playsInline
                        />
                        
                        {/* Video overlay controls */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/video:opacity-100 transition-all duration-300">
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1">
                            <button
                              onClick={() => togglePlay(message.id)}
                              className="w-6 h-6 rounded-full backdrop-blur-xl bg-white/95 hover:bg-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                              {playingVideo === message.id ? (
                                <Pause className="h-2.5 w-2.5 text-gray-900" fill="currentColor" />
                              ) : (
                                <Play className="h-2.5 w-2.5 text-gray-900 ml-0.5" fill="currentColor" />
                              )}
                            </button>
                            
                            <button
                              onClick={() => toggleMute(message.id)}
                              className="w-5 h-5 rounded-full backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-all"
                            >
                              {mutedVideos.has(message.id) ? (
                                <VolumeX className="h-2 w-2 text-white" />
                              ) : (
                                <Volume2 className="h-2 w-2 text-white" />
                              )}
                            </button>

                            <div className="flex-1" />

                            <button
                              onClick={() => toggleFullscreen(message.id)}
                              className="w-5 h-5 rounded-full backdrop-blur-xl bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-all"
                            >
                              <Maximize className="h-2 w-2 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Format badge */}
                        <div className="absolute top-1.5 right-1.5">
                          <div className="px-1.5 py-0.5 rounded-full backdrop-blur-xl bg-black/70 border border-white/20">
                            <span className="text-[8px] font-bold text-white tracking-wider">
                              {getAspectRatioLabel(message.aspectRatio)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Primary action buttons - always visible */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => handleAction(message.id, 'co-director')}
                            className="group/btn relative flex items-center gap-1 px-2 py-1 rounded-md 
backdrop-blur-xl bg-gradient-to-r from-[#00bdb0]/90 to-[#00e8d9]/90
hover:from-[#00bdb0] hover:to-[#00e8d9]
border border-[#00bdb0]/30 text-white text-[10px] font-semibold
transition-all shadow-lg shadow-[#00bdb0]/30 hover:shadow-xl 
hover:shadow-[#00bdb0]/40 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Lightbulb className="h-2.5 w-2.5" strokeWidth={2.5} />
                            <span>Co-Director</span>
                          </button>
                          
                          <button
                            onClick={() => handleAction(message.id, 'extend')}
                            className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 text-[10px] font-semibold transition-all"
                          >
                            <Film className="h-2.5 w-2.5" strokeWidth={2.5} />
                            <span>Extend</span>
                          </button>
                          
                          <button
                            onClick={() => handleAction(message.id, 'remix')}
                            className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 text-[10px] font-semibold transition-all"
                          >
                            <Wand2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                            <span>Remix</span>
                          </button>

                          <button
                            onClick={() => handleAction(message.id, 'upscale')}
                            className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 text-[10px] font-semibold transition-all"
                          >
                            <Maximize2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                            <span>Upscale</span>
                          </button>
                        </div>

                        {/* Quick actions - show on hover */}
                        <div className={cn(
                          "flex items-center gap-0.5 transition-all duration-200",
                          hoveredMessage === message.id ? "opacity-100" : "opacity-0"
                        )}>
                          <button
                            onClick={() => toggleLike(message.id)}
                            className={cn(
                              "p-1 rounded-md backdrop-blur-xl transition-all",
                              likedMessages.has(message.id) 
                                ? "text-[#00bdb0] bg-[#00bdb0]/10 border border-[#00bdb0]/20" 
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                            )}
                          >
                            <ThumbsUp className={cn("h-2.5 w-2.5", likedMessages.has(message.id) && "fill-current")} strokeWidth={2} />
                          </button>
                          
                          <button
                            onClick={() => handleCopy("video-link", message.id)}
                            className={cn(
                              "p-1 rounded-md backdrop-blur-xl transition-all",
                              copiedId === message.id 
                                ? "text-[#00bdb0] bg-[#00bdb0]/10 border border-[#00bdb0]/20" 
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                            )}
                          >
                            {copiedId === message.id ? (
                              <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                            ) : (
                              <Copy className="h-2.5 w-2.5" strokeWidth={2} />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleDownload(message.id)}
                            className="p-1 rounded-md backdrop-blur-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all border border-transparent"
                          >
                            <Download className="h-2.5 w-2.5" strokeWidth={2} />
                          </button>

                          <button
                            onClick={() => toggleFavorite(message.id)}
                            className={cn(
                              "p-1 rounded-md backdrop-blur-xl transition-all",
                              favoritedMessages.has(message.id) 
                                ? "text-[#00bdb0] bg-[#00bdb0]/10 border border-[#00bdb0]/20" 
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                            )}
                          >
                            <Heart className={cn("h-2.5 w-2.5", favoritedMessages.has(message.id) && "fill-current")} strokeWidth={2} />
                          </button>
                          
                          <div className="relative">
                            <button
                              onClick={() => setShowShareDialog(showShareDialog === message.id ? null : message.id)}
                              className="p-1 rounded-md backdrop-blur-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all border border-transparent"
                            >
                              <Share className="h-2.5 w-2.5" strokeWidth={2} />
                            </button>

                            {/* Share Dialog */}
                            {showShareDialog === message.id && (
                              <div className="absolute top-full right-0 mt-1 w-52 bg-[#191A1A] rounded-lg border border-white/10 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="p-2">
                                  <h3 className="text-white text-[10px] font-semibold mb-1.5">Share Thread</h3>
                                  
                                  <div className="space-y-1 mb-2">
                                    <button
                                      onClick={() => setShareType('private')}
                                      className="w-full flex items-start gap-1.5 p-1.5 rounded-md hover:bg-white/5 transition-colors text-left"
                                    >
                                      <div className={cn(
                                        "w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0",
                                        shareType === 'private' 
                                          ? "border-[#00bdb0] bg-[#00bdb0]" 
                                          : "border-gray-500"
                                      )} />
                                      <div>
                                        <div className="text-white text-[10px] font-medium">Private</div>
                                        <div className="text-gray-400 text-[8px]">Author only</div>
                                      </div>
                                    </button>

                                    <button
                                      onClick={() => setShareType('public')}
                                      className="w-full flex items-start gap-1.5 p-1.5 rounded-md hover:bg-white/5 transition-colors text-left"
                                    >
                                      <div className={cn(
                                        "w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0",
                                        shareType === 'public' 
                                          ? "border-[#00bdb0] bg-[#00bdb0]" 
                                          : "border-gray-500"
                                      )} />
                                      <div>
                                        <div className="text-white text-[10px] font-medium">Public</div>
                                        <div className="text-gray-400 text-[8px]">Anyone with link</div>
                                      </div>
                                    </button>
                                  </div>

                                  <div className="border-t border-white/10 pt-1.5">
                                    {linkCopied ? (
                                      <div className="flex items-center justify-center gap-1 p-1.5 text-[#00bdb0] text-[9px]">
                                        <Check className="h-3 w-3" />
                                        Link copied
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleShare(message.id)}
                                        className="w-full bg-[#00bdb0] text-white py-1.5 px-2 rounded-md text-[9px] font-medium hover:bg-[#00a89c] transition-colors flex items-center justify-center gap-1"
                                      >
                                        <Copy className="h-2.5 w-2.5" />
                                        Copy Link
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => toggleExpandedActions(message.id)}
                            className={cn(
                              "p-1 rounded-md backdrop-blur-xl transition-all",
                              expandedActions.has(message.id) 
                                ? "text-[#00bdb0] bg-[#00bdb0]/10 border border-[#00bdb0]/20" 
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                            )}
                          >
                            <MoreHorizontal className="h-2.5 w-2.5" strokeWidth={2} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded actions panel */}
                      {expandedActions.has(message.id) && (
                        <div className="p-1.5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button
                            className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-white/5 text-gray-300 text-[10px] font-medium transition-all"
                          >
                            <Scissors className="h-2.5 w-2.5 text-gray-500" strokeWidth={2} />
                            <span>Edit Video</span>
                          </button>
                          
                          <button
                            onClick={() => handleAction(message.id, 'retry')}
                            className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-white/5 text-gray-300 text-[10px] font-medium transition-all"
                          >
                            <RotateCcw className="h-2.5 w-2.5 text-gray-500" strokeWidth={2} />
                            <span>Retry Generation</span>
                          </button>

                          <div className="border-t border-white/10 pt-0.5 mt-0.5">
                            <button
                              className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-white/5 text-gray-400 text-[10px] font-medium transition-all"
                            >
                              <ThumbsDown className="h-2.5 w-2.5 text-gray-500" strokeWidth={2} />
                              <span>Not helpful</span>
                            </button>
                            
                            <button
                              className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-white/5 text-gray-400 text-[10px] font-medium transition-all"
                            >
                              <Flag className="h-2.5 w-2.5 text-gray-500" strokeWidth={2} />
                              <span>Report issue</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* AI insight card - collapsible */}
                      <div className="rounded-lg backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden">
                        <button
                          onClick={() => toggleSuggestion(message.id)}
                          className="w-full p-1.5 flex items-center gap-1.5 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex-shrink-0 w-4 h-4 rounded-md backdrop-blur-xl bg-[#00bdb0]/10 border border-[#00bdb0]/30 flex items-center justify-center">
                            <Lightbulb className="h-2 w-2 text-[#00bdb0]" strokeWidth={2.5} />
                          </div>
                          <span className="text-[11px] font-bold text-gray-300">AI Suggestion</span>
                          <div className="ml-auto">
                            {collapsedSuggestions.has(message.id) ? (
                              <ChevronDown className="h-3 w-3 text-gray-500" />
                            ) : (
                              <ChevronUp className="h-3 w-3 text-gray-500" />
                            )}
                          </div>
                        </button>
                        {!collapsedSuggestions.has(message.id) && (
                          <div className="px-1.5 pb-1.5">
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                              {getAISuggestion(message.id)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

// Mock data with longer messages for preview
const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Create a 30-second product ad for a luxury watch. I want cinematic lighting with dramatic shadows, slow-motion close-ups that capture every detail of the watch face and band, set in an urban rooftop environment during golden hour. The atmosphere should feel aspirational and sophisticated, with a color grade that emphasizes warm tones and metallic reflections. Include some dynamic camera movements like smooth dolly shots and subtle parallax effects.",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "2",
    role: "assistant",
    content: "I've created a cinematic luxury watch advertisement with golden hour lighting and dynamic camera movements. The video features smooth dolly shots across the rooftop setting, with dramatic close-ups that highlight the watch's craftsmanship. The color grading emphasizes warm amber tones and metallic reflections, creating that aspirational feel you requested.",
    videoUrl: "sample.mp4",
    aspectRatio: "16:9",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "3",
    role: "user",
    content: "Now create a vertical version for Instagram Stories with the same aesthetic.",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect! I've optimized it for Instagram Stories with vertical framing (9:16) and mobile-first composition. The key elements are now centered and sized appropriately for mobile viewing, while maintaining the same cinematic quality and golden hour aesthetic.",
    videoUrl: "sample.mp4",
    aspectRatio: "9:16",
    timestamp: new Date(),
  },
];

// Demo component
function Demo() {
  return (
    <div className="h-screen bg-black">
      <style jsx global>{`
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
          border: 2px solid #0a0a0a;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
        
        /* Firefox scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #374151 #0a0a0a;
        }
        
        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <ConversationView messages={mockMessages} />
    </div>
  );
}

export default Demo;