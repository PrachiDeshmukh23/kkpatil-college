"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Heart, MessageCircle, Share2, Sparkles, Volume2, VolumeX } from "lucide-react";

interface ReelSlide {
  id: number;
  image: string;
  title: string;
  badge: string;
  caption: string;
}

export default function PromoReel() {
  const slides: ReelSlide[] = [
    {
      id: 1,
      image: "/images/flyer_1.png",
      title: "12वी नंतर करिअर संधी",
      badge: "Admission Open",
      caption: "Healthcare क्षेत्रात बनवा उज्वल भविष्य! K. K. Patil Paramedical College, Sangamner."
    },
    {
      id: 2,
      image: "/images/flyer_3.png",
      title: "DMLT Course Admission",
      badge: "Clinical Lab",
      caption: "क्लिनिकल लॅबोरेटरी क्षेत्रात करिअर करण्याची सुवर्णसंधी. कालावधी: २ वर्षे."
    },
    {
      id: 3,
      image: "/images/flyer_4.png",
      title: "Hospital Management",
      badge: "Specialized Course",
      caption: "पॅरामेडिकल क्षेत्रात व्यवस्थापन करिअर. कालावधी: २ वर्षे. आजच संपर्क साधा!"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likes, setLikes] = useState([142, 98, 120]);
  const [hasLiked, setHasLiked] = useState([false, false, false]);

  const slideDuration = 6000; // 6 seconds per flyer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Play a gentle synth note on scene transition
  const playBeep = () => {
    if (typeof window === "undefined" || isMuted || !isPlaying) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      const frequencies = [329.63, 392.00, 440.00]; // E4, G4, A4 notes
      osc.frequency.setValueAtTime(frequencies[currentSlide % frequencies.length], ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.error("Web Audio API error", e);
    }
  };

  // Speak slide details using SpeechSynthesis API (Text-to-Speech)
  const speakCurrentSlide = (index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    // Cancel any active speech
    window.speechSynthesis.cancel();

    if (isMuted || !isPlaying) return;

    const currentSlideData = slides[index];
    const textToSpeak = `${currentSlideData.title}. ${currentSlideData.caption}`;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Look for Marathi, Hindi or Indian English voices
    const voices = window.speechSynthesis.getVoices();
    const marathiVoice = voices.find(v => v.lang.startsWith("mr-IN") || v.lang.startsWith("mr"));
    const hindiVoice = voices.find(v => v.lang.startsWith("hi-IN") || v.lang.startsWith("hi"));
    const englishInVoice = voices.find(v => v.lang.startsWith("en-IN") || v.lang.startsWith("en"));

    if (marathiVoice) {
      utterance.voice = marathiVoice;
      utterance.lang = "mr-IN";
    } else if (hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = "hi-IN";
    } else if (englishInVoice) {
      utterance.voice = englishInVoice;
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.92; // Natural reading rate
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    if (isPlaying) {
      const startTime = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / slideDuration) * 100, 100));
      }, 50);

      timerRef.current = setTimeout(() => {
        setCurrentScene((currentSlide + 1) % slides.length);
      }, slideDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentSlide, isPlaying]);

  useEffect(() => {
    // Speak narration and play audio tone when active scene changes, isMuted changes, or playing status changes
    speakCurrentSlide(currentSlide);
    playBeep();

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSlide, isPlaying, isMuted]);

  const setCurrentScene = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleLike = (index: number) => {
    const updatedHasLiked = [...hasLiked];
    const updatedLikes = [...likes];

    if (updatedHasLiked[index]) {
      updatedLikes[index] -= 1;
    } else {
      updatedLikes[index] += 1;
    }
    updatedHasLiked[index] = !updatedHasLiked[index];

    setLikes(updatedLikes);
    setHasLiked(updatedHasLiked);
  };

  return (
    <div className="relative w-full max-w-[340px] aspect-[9/16] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 mx-auto select-none">
      {/* Slides images container */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Panning Image */}
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              idx === currentSlide && isPlaying ? "animate-[kenBurns_6.5s_ease-out_forwards]" : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
      ))}

      {/* Progress Bars (at the top, like Instagram Stories) */}
      <div className="absolute top-4 left-3 right-3 z-30 flex gap-1">
        {slides.map((_, idx) => (
          <div key={idx} className="flex-1 h-1 bg-slate-300/60 rounded-full overflow-hidden">
            <div
              className={`h-full bg-blue-bright transition-all ${
                idx === currentSlide
                  ? "ease-linear"
                  : idx < currentSlide
                  ? "w-full"
                  : "w-0"
              }`}
              style={{
                width: idx === currentSlide ? `${progress}%` : undefined,
                transitionDuration: idx === currentSlide ? "50ms" : "0ms"
              }}
            />
          </div>
        ))}
      </div>

      {/* Header Info */}
      <div className="absolute top-8 left-3 right-3 z-30 flex justify-between items-center bg-white/90 border border-slate-200/50 rounded-full px-3 py-2 shadow-sm backdrop-blur-md text-slate-800 animate-slide-up">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-bright text-white flex items-center justify-center font-bold text-[10px] border border-white">
            KK
          </div>
          <div className="leading-tight">
            <h4 className="text-[10px] font-bold tracking-tight text-navy-dark">kkpatil_paramedical</h4>
            <span className="text-[8px] text-slate-500 block leading-none">Sangamner, Maharashtra</span>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition focus:outline-none cursor-pointer"
        >
          {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
      </div>

      {/* Play/Pause Center Indicator */}
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
      >
        {!isPlaying && (
          <div className="p-4 bg-white/95 text-navy-dark border border-slate-200/60 rounded-full scale-110 shadow-lg transition backdrop-blur-sm">
            <Play size={28} className="ml-1 fill-navy-dark" />
          </div>
        )}
      </div>

      {/* Sidebar Action Buttons (Instagram Style) */}
      <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4 text-slate-700">
        {/* Like */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike(currentSlide);
          }}
          className="flex flex-col items-center gap-1 group focus:outline-none cursor-pointer"
        >
          <div className="p-2.5 bg-white/90 border border-slate-200/50 backdrop-blur-sm rounded-full transition group-hover:scale-105 shadow-md">
            <Heart
              size={16}
              className={hasLiked[currentSlide] ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-700"}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-700">{likes[currentSlide]}</span>
        </button>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2.5 bg-white/90 border border-slate-200/50 backdrop-blur-sm rounded-full shadow-md">
            <MessageCircle size={16} className="text-slate-700" />
          </div>
          <span className="text-[10px] font-bold text-slate-700">14</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2.5 bg-white/90 border border-slate-200/50 backdrop-blur-sm rounded-full shadow-md">
            <Share2 size={16} className="text-slate-700" />
          </div>
          <span className="text-[10px] font-bold text-slate-700">Share</span>
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-4 left-3 right-16 z-30 bg-white/90 border border-slate-200/50 rounded-2xl p-3.5 shadow-lg backdrop-blur-md space-y-2 text-slate-800 animate-slide-up">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-bold text-navy-dark bg-yellow-notice px-2 py-0.5 rounded uppercase tracking-wider">
              {slides[currentSlide].badge}
            </span>
            <span className="text-[8px] font-bold text-white bg-blue-bright px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5">
              <Sparkles size={8} />
              Reel
            </span>
          </div>
          <h3 className="text-xs font-extrabold tracking-tight text-navy-dark">{slides[currentSlide].title}</h3>
          <p className="text-[9px] text-slate-600 leading-normal line-clamp-2">
            {slides[currentSlide].caption}
          </p>
        </div>

        {/* Audio visualizer */}
        <div className="flex items-center gap-1.5 border-t border-slate-100 pt-1.5">
          <div className="flex items-end gap-0.5 h-2.5">
            <span className={`w-0.5 bg-blue-bright rounded ${isPlaying && !isMuted ? "h-2.5 animate-[pulse_0.6s_infinite]" : "h-0.5"}`} />
            <span className={`w-0.5 bg-blue-bright rounded ${isPlaying && !isMuted ? "h-1.5 animate-[pulse_0.4s_infinite]" : "h-1"}`} style={{ animationDelay: "0.15s" }} />
            <span className={`w-0.5 bg-blue-bright rounded ${isPlaying && !isMuted ? "h-3 animate-[pulse_0.7s_infinite]" : "h-0.5"}`} style={{ animationDelay: "0.3s" }} />
            <span className={`w-0.5 bg-blue-bright rounded ${isPlaying && !isMuted ? "h-2.5 animate-[pulse_0.5s_infinite]" : "h-1"}`} style={{ animationDelay: "0.45s" }} />
          </div>
          <span className="text-[8px] text-slate-500 truncate font-semibold w-28 font-mono">
            🎵 KK Patil - Official Audio
          </span>
        </div>
      </div>
    </div>
  );
}
