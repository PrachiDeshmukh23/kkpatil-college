import React from "react";
import { staticGalleryItems } from "@/lib/staticData";
import GalleryPreview from "@/components/GalleryPreview";

export default async function GalleryPage() {
  const galleryItems = [...staticGalleryItems].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-green-medical bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Photo Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          College Gallery
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Explore pictures of student internships, medical laboratories, classroom seminars, workshops, and celebrations at KK Patil Paramedical College.
        </p>
      </div>

      {/* Render full Gallery preview without truncation */}
      <GalleryPreview items={galleryItems} showViewAll={false} />
    </div>
  );
}
