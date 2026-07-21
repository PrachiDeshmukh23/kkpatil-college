import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { Award, Compass, Shield, Target, BookOpen, User } from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
  const content = await prisma.webContent.findMany();
  const contentMap: Record<string, string> = {};
  content.forEach((c) => {
    contentMap[c.key] = c.value;
  });

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          About Our College
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
          Learn about the history, vision, and people driving paramedical education excellence in Sangamner.
        </p>
      </div>

      {/* College Overview & History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-navy-dark border-b pb-2 border-slate-100">
            College Profile & History
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {contentMap["about_text"] ||
              "K. K. Patil Paramedical College, Sangamner is a premier institute offering vocational training in medical diagnostic systems..."}
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Founded with the sole objective of meeting the growing demand for skilled technologists in regional healthcare centers, the college has established itself as a trustworthy institution. We provide career-oriented education that matches standard diagnostics laboratories and municipal sanitation practices.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 space-y-1">
              <span className="block text-2xl font-extrabold text-blue-bright">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Practical Oriented</span>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 space-y-1">
              <span className="block text-2xl font-extrabold text-green-medical">1.5 Yr</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Max Course Span</span>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 space-y-1">
              <span className="block text-2xl font-extrabold text-yellow-notice">Active</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Admission Open</span>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0 p-2.5 bg-blue-50 text-blue-bright rounded-lg h-10 w-10 flex items-center justify-center">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-navy-dark text-xs uppercase tracking-wider">Our Mission</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {contentMap["mission"] || "To provide industry-oriented training..."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 border-t border-slate-100 pt-4">
              <div className="shrink-0 p-2.5 bg-emerald-50 text-green-medical rounded-lg h-10 w-10 flex items-center justify-center">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="font-bold text-navy-dark text-xs uppercase tracking-wider">Our Vision</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {contentMap["vision"] || "To be the leading paramedical training college..."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 border-t border-slate-100 pt-4">
              <div className="shrink-0 p-2.5 bg-amber-50 text-yellow-notice rounded-lg h-10 w-10 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-bold text-navy-dark text-xs uppercase tracking-wider">Educational Values</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {contentMap["educational_values"] || "Integrity, excellence, hygiene, and compassion."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Messages & Staff Placeholder */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-navy-dark tracking-tight">
              Our Leadership Team
            </h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              Messages from our college directors and principal administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Principal Card */}
            <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6 gap-6 hover:shadow transition">
              {/* Image Placeholder */}
              <div className="w-full sm:w-40 h-48 bg-slate-100 rounded-lg shrink-0 flex flex-col items-center justify-center border border-slate-200 border-dashed text-slate-400 p-4">
                <User size={40} className="mb-2" />
                <span className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-500">
                  Principal Image Placeholder
                </span>
                <span className="text-[9px] text-slate-400 text-center mt-1">
                  (Upload in Admin Content)
                </span>
              </div>
              {/* Message */}
              <div className="space-y-3 flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-bright">
                  Academic Head
                </span>
                <h3 className="font-bold text-navy-dark text-base">Principal Message</h3>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  &ldquo;{contentMap["principal_message"] || "Welcome to KK Patil Paramedical College. We prepare students for crucial frontline roles..."}&rdquo;
                </p>
              </div>
            </div>

            {/* Chairman / Management Card */}
            <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6 gap-6 hover:shadow transition">
              {/* Image Placeholder */}
              <div className="w-full sm:w-40 h-48 bg-slate-100 rounded-lg shrink-0 flex flex-col items-center justify-center border border-slate-200 border-dashed text-slate-400 p-4">
                <User size={40} className="mb-2" />
                <span className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-500">
                  Chairman Image Placeholder
                </span>
                <span className="text-[9px] text-slate-400 text-center mt-1">
                  (Upload in Admin Content)
                </span>
              </div>
              {/* Message */}
              <div className="space-y-3 flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-medical">
                  Management Board
                </span>
                <h3 className="font-bold text-navy-dark text-base">Management Message</h3>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  &ldquo;{contentMap["management_message"] || "We are dedicated to building a high-quality educational resource center in Sangamner..."}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation, Recognition & Educational Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-slide-up">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-navy-dark">
            Recognition & Approvals
          </h2>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Our statutory compliance and institution recognition contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 shadow-sm">
          {/* College Building Image */}
          <div className="lg:col-span-5 aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/college_building.png"
              alt="K. K. Patil Paramedical College Building"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </div>
          
          {/* Affiliation details */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-bold text-blue-bright bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              College Affiliation
            </span>
            <h3 className="font-bold text-navy-dark text-lg sm:text-xl">
              K. K. Patil Paramedical College, Sangamner
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              K. K. Patil Paramedical College maintains formal academic affiliations and recognition pipelines. Our programs are designed to align with the curriculum and validation frameworks of renowned medical education bodies, ensuring our students receive high-quality diagnostic and sanitary training.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our examinations, practical training standards, and certification programs comply with statutory guidelines, ensuring your diploma holds high professional value in public and private medical settings across India.
            </p>
            <div className="pt-2">
              <Link href="/disclosure" className="inline-flex items-center gap-1 text-xs font-bold text-blue-bright hover:underline">
                View College Documents & Disclosures &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-4 hover-lift">
            <div className="flex items-center gap-3 border-b pb-2">
              <Shield className="text-green-medical" size={24} />
              <h3 className="font-bold text-navy-dark text-sm uppercase tracking-wider">
                Affiliation & Recognition Details
              </h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Official registration and course curriculum certifications are maintained transparently. Details regarding specific academic affiliations and board approvals will be updated shortly once officially verified.
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Please refer to the <Link href="/disclosure" className="text-blue-bright font-bold hover:underline">Mandatory Disclosure</Link> page to review our uploaded statutory documents, safety certificates, and recognition files.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-4 hover-lift">
            <div className="flex items-center gap-3 border-b pb-2">
              <BookOpen className="text-blue-bright" size={24} />
              <h3 className="font-bold text-navy-dark text-sm uppercase tracking-wider">
                Our Educational Approach
              </h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              We focus heavily on building hands-on mastery. Paramedical technicians deal with human pathology reports and environmental inspection. Errors in these professions are high-risk. Therefore, our testing procedures, workshops, and student internships are designed to ensure rigorous validation.
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Students go through periodic tests, hospital work shifts, sanitary audit reports, and mock inspections to build robust real-world capabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
