import React from "react";
import prisma from "@/lib/db";
import { isAuthenticated, loginAdmin } from "./actions";
import AdminPortal from "@/components/AdminPortal";
import { GraduationCap, ShieldAlert } from "lucide-react";

export const revalidate = 0; // Dynamic route

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const auth = await isAuthenticated();
  const params = await searchParams;

  if (auth) {
    // 1. User is authenticated - query all dashboard data
    const courses = await prisma.course.findMany({ orderBy: { name: "asc" } });
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    const notices = await prisma.notice.findMany({ orderBy: { date: "desc" } });
    const galleryItems = await prisma.galleryItem.findMany({ orderBy: { displayOrder: "asc" } });
    const socialPosts = await prisma.socialPost.findMany({ orderBy: { postDate: "desc" } });
    const documents = await prisma.mandatoryDocument.findMany({ orderBy: { name: "asc" } });
    const webContent = await prisma.webContent.findMany();
    const settings = await prisma.adminSettings.findMany();

    return (
      <AdminPortal
        courses={courses}
        enquiries={enquiries}
        notices={notices}
        galleryItems={galleryItems}
        socialPosts={socialPosts}
        documents={documents}
        webContent={webContent}
        settings={settings}
      />
    );
  }

  // 2. User is NOT authenticated - render login form
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 bg-slate-50 min-h-screen text-xs">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-blue-bright text-white flex items-center justify-center mx-auto shadow-md">
            <GraduationCap size={24} />
          </div>
          <div className="space-y-1">
            <h2 className="font-extrabold text-navy-dark text-lg uppercase tracking-wider">
              College Admin Panel
            </h2>
            <p className="text-slate-500 text-xs">
              KK Patil Paramedical College, Sangamner
            </p>
          </div>
        </div>

        {/* Action Form */}
        <form
          action={async (formData) => {
            "use server";
            const res = await loginAdmin(formData);
            if (res.success) {
              // Successfully set cookie on server, refresh page to show dashboard
              // Next.js redirection will trigger
            } else {
              // Redirect back with error param
              // Using redirect is easy in Server Actions
              const { redirect } = require("next/navigation");
              redirect(`/admin?error=${encodeURIComponent(res.message)}`);
            }
          }}
          className="space-y-4"
        >
          {params.error && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-2 leading-relaxed">
              <ShieldAlert className="shrink-0 text-red-500 mt-0.5" size={16} />
              <span>{params.error}</span>
            </div>
          )}

          {/* Username */}
          <div className="space-y-1">
            <label htmlFor="username" className="block font-bold text-slate-700 uppercase tracking-wider">
              Admin Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="admin"
              required
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-bright"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="block font-bold text-slate-700 uppercase tracking-wider">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-bright"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-navy-dark hover:bg-blue-bright text-white font-bold uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition duration-150 cursor-pointer"
          >
            Authenticate Admin
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div className="text-center text-[10px] text-slate-400/90 pt-4 border-t border-slate-100/60 leading-normal">
          <p>🔒 Session cookies automatically expire after 2 hours.</p>
          <p className="mt-1">
            Demo Credentials: <span className="font-bold text-slate-500">admin</span> / <span className="font-bold text-slate-500">admin@kkpatil</span>
          </p>
        </div>
      </div>
    </div>
  );
}
