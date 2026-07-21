import React from "react";
import prisma from "@/lib/db";
import NoticeList from "@/components/NoticeList";

export const revalidate = 0;

export default async function NewsPage() {
  const notices = await prisma.notice.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-yellow-notice bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Announcements
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          News, Events & Notices
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Keep track of important academic cycles, registration circulars, upcoming workshops, and holiday listings.
        </p>
      </div>

      {/* Render list */}
      <NoticeList notices={notices} />
    </div>
  );
}
