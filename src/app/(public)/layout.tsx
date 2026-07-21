import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { staticSettings } from "@/lib/staticData";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsMap: Record<string, string> = {
    ...staticSettings
  };

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
