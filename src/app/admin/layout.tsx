import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | KK Patil Paramedical College",
  description: "Secure administration portal to manage college website details.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {children}
    </div>
  );
}
