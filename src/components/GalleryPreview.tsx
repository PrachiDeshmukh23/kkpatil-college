"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Maximize2, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  imageUrl: string;
  createdAt?: Date;
}

interface GalleryPreviewProps {
  items: GalleryItem[];
  showViewAll?: boolean;
}

export default function GalleryPreview({ items, showViewAll = true }: GalleryPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ["All", "Campus", "Laboratory", "Students", "Events", "Workshops", "Admissions"];

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  // Limit homepage preview to 6 items
  const displayItems = showViewAll ? filteredItems.slice(0, 6) : filteredItems;

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % displayItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + displayItems.length) % displayItems.length);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-bright text-white shadow-md scale-105"
                : "bg-white text-navy-light border border-slate-200 hover:border-blue-bright hover:text-blue-bright"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {displayItems.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100 shadow-sm">
          No images found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              {/* Image Box */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={20} />
                  </span>
                </div>
              </div>

              {/* Text Card */}
              <div className="p-4">
                <span className="text-[10px] font-bold text-green-medical bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="font-semibold text-navy-dark text-sm mt-2 group-hover:text-blue-bright transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {showViewAll && items.length > 6 && (
        <div className="text-center pt-4">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-bright text-blue-bright hover:bg-blue-bright hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-sm hover:shadow transition duration-200"
          >
            View Full Gallery
          </Link>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-slate-300 p-2 bg-white/10 hover:bg-white/20 rounded-full transition focus:outline-none"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-slate-300 p-2 bg-white/10 hover:bg-white/20 rounded-full transition focus:outline-none hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-slate-300 p-2 bg-white/10 hover:bg-white/20 rounded-full transition focus:outline-none hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4 bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 p-2 sm:p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden min-h-[40vh] max-h-[60vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayItems[activeImageIndex].imageUrl}
                alt={displayItems[activeImageIndex].title}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            <div className="w-full text-center px-4 pb-2 space-y-1.5">
              <div className="flex justify-center items-center gap-3">
                <span className="text-[10px] font-bold text-green-medical bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {displayItems[activeImageIndex].category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar size={12} />
                  <span>2026</span>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {displayItems[activeImageIndex].title}
              </h3>
              {displayItems[activeImageIndex].description && (
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {displayItems[activeImageIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
