"use client";

import React, { useState } from "react";
import { Search, Calendar, FileText, Download, ArrowUpRight, Bell } from "lucide-react";

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  pdfUrl?: string | null;
}

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Admission", "Exam", "Holiday", "Event", "Workshop", "Circular"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" ||
      notice.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Search and Filter panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search */}
        <div className="w-full md:max-w-xs relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs focus:outline-none text-slate-800 bg-transparent"
          />
        </div>

        {/* Category Filter tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-navy-dark text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-xl border border-slate-100">
          No notices or updates found matching your selection.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow hover:border-blue-100 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2.5 flex-grow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-bold text-yellow-notice bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Bell size={9} className="animate-pulse" />
                    {notice.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {notice.date}
                  </span>
                </div>
                
                <h3 className="font-bold text-navy-dark text-sm sm:text-base leading-snug">
                  {notice.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {notice.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-end">
                {notice.pdfUrl && (
                  <a
                    href={notice.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-slate-200 transition"
                  >
                    <Download size={12} />
                    Download PDF
                  </a>
                )}
                <span className="p-2 rounded bg-slate-50 border border-slate-100 text-slate-400 hover:text-blue-bright transition hidden sm:inline-block cursor-pointer">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
