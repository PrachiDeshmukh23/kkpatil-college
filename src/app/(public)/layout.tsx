import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/db";

export const revalidate = 0; // Disable caching so settings edits show up immediately

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsMap: Record<string, string> = {
    phone: "Details will be updated shortly",
    whatsapp: "Details will be updated shortly",
    email: "sandipkute785@gmail.com",
    address: "Details will be updated shortly",
    collegeName: "K. K. Patil Paramedical College",
    location: "Sangamner, Maharashtra",
  };

  try {
    const dbSettings = await prisma.adminSettings.findMany();
    dbSettings.forEach((setting) => {
      settingsMap[setting.key] = setting.value;
    });
  } catch (error) {
    console.error("Failed to load settings from database:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        phone={settingsMap.phone}
        email={settingsMap.email}
        collegeName={settingsMap.collegeName}
        location={settingsMap.location}
      />
      <main className="flex-grow bg-slate-50/50">{children}</main>
      <Footer
        phone={settingsMap.phone}
        whatsapp={settingsMap.whatsapp}
        email={settingsMap.email}
        address={settingsMap.address}
        collegeName={settingsMap.collegeName}
      />
    </div>
  );
}
