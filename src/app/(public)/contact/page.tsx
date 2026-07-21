import React from "react";
import prisma from "@/lib/db";
import { MapPin, Phone, Mail, Clock, Instagram, Info } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await prisma.adminSettings.findMany();
  const settingsMap: Record<string, string> = {
    phone: "Details will be updated shortly",
    whatsapp: "Details will be updated shortly",
    email: "sandipkute785@gmail.com",
    address: "Details will be updated shortly",
    officeTimings: "Details will be updated shortly",
    instagramUrl: "https://www.instagram.com/kkpatil_paramedical_college"
  };

  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  // Check function to display "Details will be updated shortly" cleanly
  const renderContactInfo = (val: string) => {
    if (!val || val.toLowerCase().includes("will be updated") || val.trim() === "") {
      return (
        <span className="text-slate-400 font-medium italic text-xs">
          Details will be updated shortly
        </span>
      );
    }
    return <span className="font-semibold text-navy-dark">{val}</span>;
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-blue-bright bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Reach Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          Contact College Office
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Have queries about admissions, syllabus structure, or documents? Contact us directly or visit our Sangamner campus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy-dark border-b pb-2 border-slate-100 flex items-center gap-2">
              <Info size={20} className="text-blue-bright" />
              Office Directory
            </h2>

            {/* Address */}
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="h-10 w-10 bg-blue-50 text-blue-bright flex items-center justify-center rounded-xl shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider">Campus Address</h4>
                <p className="text-slate-700 leading-normal">
                  {renderContactInfo(settingsMap.address)}
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="h-10 w-10 bg-emerald-50 text-green-medical flex items-center justify-center rounded-xl shrink-0">
                <Phone size={20} />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider">Helpline Contacts</h4>
                <div className="space-y-1 text-slate-700">
                  <p>Call: {renderContactInfo(settingsMap.phone)}</p>
                  <p>WhatsApp: {renderContactInfo(settingsMap.whatsapp)}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl shrink-0">
                <Mail size={20} />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                <p className="text-slate-700">
                  <a href={`mailto:${settingsMap.email}`} className="hover:underline font-semibold text-navy-dark">
                    {settingsMap.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="h-10 w-10 bg-amber-50 text-yellow-notice flex items-center justify-center rounded-xl shrink-0">
                <Clock size={20} />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider">Office Hours</h4>
                <p className="text-slate-700">
                  {renderContactInfo(settingsMap.officeTimings)}
                </p>
              </div>
            </div>
          </div>

          {/* Social buttons */}
          <div className="p-5 bg-slate-900 text-white rounded-xl space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider">Follow activities</h4>
            <p className="text-[11px] text-slate-400">View public posts and student highlights on our Instagram page.</p>
            <a
              href={settingsMap.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition"
            >
              <Instagram size={14} />
              College Instagram Profile
            </a>
          </div>
        </div>

        {/* Right Column: Google Maps & Message Enquiry */}
        <div className="lg:col-span-7 space-y-6">
          {/* Map placeholder */}
          <div className="w-full h-72 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <MapPin size={36} className="mb-2 text-slate-400 shrink-0" />
            <h4 className="font-bold text-navy-dark text-sm uppercase tracking-wide">
              Campus Location Map
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Google Maps integration will be enabled shortly once official coordinates are verified by administration.
            </p>
          </div>

          {/* Direct contact form Client Component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
