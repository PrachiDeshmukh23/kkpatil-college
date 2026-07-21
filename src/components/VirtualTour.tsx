"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, HelpCircle, Eye } from "lucide-react";

interface TourScene {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hotspots: {
    x: string;
    y: string;
    label: string;
    details: string;
  }[];
}

export default function VirtualTour() {
  const scenes: TourScene[] = [
    {
      id: 1,
      title: "Main Campus Building",
      subtitle: "K. K. Patil Paramedical College, Sangamner",
      description: "Our premium multi-story academic block houses modern lecture halls, clinical labs, and student support centers on New Nagar Road.",
      image: "/images/college_building.png",
      hotspots: [
        { x: "50%", y: "40%", label: "Academic Wing", details: "Spacious classrooms designed for theoretical lectures and seminars." },
        { x: "25%", y: "65%", label: "Entrance lobby", details: "Information desk and visitor registration center." }
      ]
    },
    {
      id: 2,
      title: "Pathology & Biochemistry Lab",
      subtitle: "Clinical Diagnosis Training Wing",
      description: "Equipped with advanced diagnostic instrumentation, students learn to perform chemical analysis, blood profiling, and pathology tests.",
      image: "/images/pathology_lab.png",
      hotspots: [
        { x: "42%", y: "55%", label: "Biochemistry Analyzer", details: "Automated equipment used to analyze blood chemistry profiles." },
        { x: "75%", y: "48%", label: "Diagnostic Station", details: "Reagents and centrifuge setups for sample preparation." }
      ]
    },
    {
      id: 3,
      title: "Clinical Classroom Lab",
      subtitle: "Practical Medical Training Facility",
      description: "A hybrid classroom-laboratory where students practice sample collection, microscopy, and general sanitation guidelines.",
      image: "/images/students_lab.png",
      hotspots: [
        { x: "30%", y: "50%", label: "Pathology Microscopes", details: "High-power optical microscopes for tissue and blood cell inspection." },
        { x: "65%", y: "45%", label: "Training Workbenches", details: "Student desks equipped with test tubes, racks, and analysis kits." }
      ]
    },
    {
      id: 4,
      title: "Operation Theatre (OT) Lab",
      subtitle: "Sterile Surgical Training Environment",
      description: "Simulating a real hospital surgical theatre, this lab trains OT technicians in sterile field setup and surgical assistant protocols.",
      image: "/images/operation_theatre.png",
      hotspots: [
        { x: "50%", y: "50%", label: "Surgical Table", details: "Adjustable table for teaching patient positioning during surgeries." },
        { x: "20%", y: "45%", label: "Anaesthesia Setup", details: "Anesthetic gas loops, flow meters, and monitoring equipment." }
      ]
    }
  ];

  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<{ sceneId: number; hotspotIndex: number } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sceneDuration = 7000; // 7 seconds per scene

  // Manage progress bar and scene rotation
  useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isPlaying) {
      const startTime = Date.now();
      const intervalTime = 50; // Update progress bar every 50ms

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const calculatedProgress = Math.min((elapsed / sceneDuration) * 100, 100);
        setProgress(calculatedProgress);
      }, intervalTime);

      timerRef.current = setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % scenes.length);
        setProgress(0);
      }, sceneDuration);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentScene, isPlaying]);

  const handleNext = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
    setProgress(0);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setCurrentScene((prev) => (prev === 0 ? scenes.length - 1 : prev - 1));
    setProgress(0);
    setActiveHotspot(null);
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setProgress(0);
    setIsPlaying(isPlaying ? isPlaying : true);
    setActiveHotspot(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Video Viewport */}
      <div 
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
      >
        {/* Animated Background Image */}
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentScene ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center ${
                idx === currentScene && isPlaying ? "animate-[kenBurns_7.5s_ease-out_forwards]" : ""
              }`}
              style={{ backgroundImage: `url(${scene.image})`, transformOrigin: "center" }}
            />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Interactive Hotspots */}
            {idx === currentScene &&
              scene.hotspots.map((hs, hsIdx) => (
                <div
                  key={hsIdx}
                  className="absolute z-30"
                  style={{ left: hs.x, top: hs.y }}
                >
                  <button
                    onClick={() =>
                      setActiveHotspot(
                        activeHotspot?.sceneId === scene.id && activeHotspot?.hotspotIndex === hsIdx
                          ? null
                          : { sceneId: scene.id, hotspotIndex: hsIdx }
                      )
                    }
                    className="h-5 w-5 rounded-full bg-blue-bright/90 border border-white text-white flex items-center justify-center animate-ping duration-10000 shadow-lg cursor-pointer focus:outline-none hover:scale-110 transition"
                    title={hs.label}
                  >
                    <span className="absolute h-2 w-2 rounded-full bg-white" />
                  </button>

                  {/* Hotspot details card */}
                  {activeHotspot?.sceneId === scene.id && activeHotspot?.hotspotIndex === hsIdx && (
                    <div className="absolute top-7 -left-20 w-48 bg-white/95 border border-slate-200/80 rounded-xl p-3 text-slate-800 text-left shadow-xl backdrop-blur-md animate-slide-up z-50">
                      <h4 className="text-[11px] font-bold text-blue-bright uppercase tracking-wider">{hs.label}</h4>
                      <p className="text-[10px] text-slate-600 mt-1 leading-normal">{hs.details}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}

        {/* Live Tour Blinking Indicator */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>College Video Tour</span>
        </div>

        {/* Interactive Overlay Info */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1 text-[10px] text-slate-700 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          <Eye size={12} className="text-blue-bright" />
          <span>Click glowing rings to explore lab details</span>
        </div>

        {/* Subtitles / Scene Caption Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/90 border border-slate-200/50 rounded-xl p-4 shadow-lg backdrop-blur-md space-y-1.5 animate-slide-up">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-bright bg-blue-50 px-2 py-0.5 rounded-full inline-block">
              {scenes[currentScene].subtitle}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-navy-dark leading-tight">
              {scenes[currentScene].title}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {scenes[currentScene].description}
          </p>
        </div>

        {/* Play overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-white/30 z-40 flex items-center justify-center transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="p-5 bg-blue-bright text-white rounded-full scale-110 shadow-xl hover:scale-125 transition duration-200">
                <Play size={36} className="ml-1 fill-white" />
              </div>
              <span className="text-navy-dark text-[10px] font-bold uppercase tracking-widest bg-white/95 px-4 py-2 rounded-full border border-slate-200 shadow-md">
                Start Virtual Tour Video
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Video Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden shrink-0">
        <div
          className="bg-blue-bright h-full transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Media Controller Panel */}
      <div className="px-6 py-4 bg-slate-50 flex flex-wrap justify-between items-center gap-4 border-t border-slate-200/85 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-10 w-10 rounded-full bg-blue-bright hover:bg-blue-hover text-white flex items-center justify-center shadow transition active:scale-95 focus:outline-none cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button
            onClick={handleRestart}
            className="p-2 text-slate-500 hover:text-slate-800 transition focus:outline-none cursor-pointer"
            title="Restart Tour"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Scene Navigation dots & labels */}
        <div className="hidden md:flex items-center gap-2">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentScene(idx);
                setProgress(0);
                setActiveHotspot(null);
              }}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition ${
                idx === currentScene
                  ? "bg-blue-bright text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-200"
              }`}
            >
              Scene {scene.id}
            </button>
          ))}
        </div>

        {/* Next / Prev Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Previous scene"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-semibold text-slate-600 select-none">
            {currentScene + 1} / {scenes.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Next scene"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
