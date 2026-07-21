"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, GraduationCap, Calendar, Compass } from "lucide-react";

export interface Slide {
  title: string;
  subtitle: string;
  bgImage: string;
  badge?: string;
}

interface HeroSliderProps {
  slidesJson?: string;
}

export default function HeroSlider({ slidesJson }: HeroSliderProps) {
  const defaultSlides: Slide[] = [
    {
      title: "K. K. Patil Paramedical College, Sangamner",
      subtitle: "Build Your Career in Healthcare with Quality Paramedical Education",
      bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop",
      badge: "Admissions Open 2026-27"
    },
    {
      title: "Advanced Diagnostic Laboratories",
      subtitle: "Gain Practical Hands-on Training with Modern Diagnostic Equipment",
      bgImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format&fit=crop",
      badge: "Hands-on Learning"
    },
    {
      title: "Experienced Medical Faculty",
      subtitle: "Learn from Leading Healthcare Experts and Professionals",
      bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop",
      badge: "Expert Guidance"
    }
  ];

  let slides: Slide[] = defaultSlides;
  if (slidesJson) {
    try {
      slides = JSON.parse(slidesJson);
    } catch (e) {
      console.error("Failed to parse hero slides JSON, using defaults.", e);
    }
  }

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />

          {/* Slide Content */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl space-y-6">
                {slide.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-notice/90 backdrop-blur-sm text-navy-dark text-xs font-bold uppercase tracking-wider rounded-full shadow">
                    <Calendar size={13} className="shrink-0 animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
                  {slide.subtitle}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-bright hover:bg-blue-hover text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg transition-transform hover:-translate-y-0.5 duration-150"
                  >
                    <Compass size={16} />
                    Explore Courses
                  </Link>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-medical hover:bg-green-hover text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg transition-transform hover:-translate-y-0.5 duration-150"
                  >
                    <GraduationCap size={16} />
                    Apply for Admission
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider rounded-lg backdrop-blur-sm transition duration-150"
                  >
                    Contact College
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition focus:outline-none hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition focus:outline-none hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-blue-bright" : "w-2.5 bg-white/55 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
