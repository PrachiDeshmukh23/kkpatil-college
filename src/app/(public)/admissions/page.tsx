import React from "react";
import prisma from "@/lib/db";
import EnquiryForm from "@/components/EnquiryForm";
import { Download, FileText, CheckSquare, Calendar, Phone, Info } from "lucide-react";

export const revalidate = 0;

export default async function AdmissionsPage() {
  const settings = await prisma.adminSettings.findMany();
  const settingsMap: Record<string, string> = {
    phone: "Details will be updated shortly",
    email: "sandipkute785@gmail.com",
  };
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-green-medical bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Enrollment 2026-27
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          Admissions & Registration
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Secure your seat in our job-oriented Sanitary Inspector and PGDMLT batches. Fill out the online registration enquiry today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Info (Criteria, Process, Documents) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Overview & Important Dates */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-navy-dark border-b pb-2 border-slate-100 flex items-center gap-2">
              <Calendar size={20} className="text-blue-bright" />
              Admission Schedule & Process
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Admissions for the academic cycle 2026-2027 are currently open for all eligible students. Seats are allocated on a first-come, first-served basis matching minimum marks requirements.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2">
              <p>📅 <strong>Online Enquiry Commencement:</strong> Ongoing</p>
              <p>📅 <strong>Document Verification & Registration:</strong> In Progress</p>
              <p>📅 <strong>Classes Commencement:</strong> September 2026 (Tentative)</p>
            </div>
          </div>

          {/* Step-by-Step Enrollment Flow */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy-dark border-b pb-2 border-slate-100 flex items-center gap-2">
              <CheckSquare size={20} className="text-green-medical" />
              Enrollment Workflow
            </h2>
            
            <div className="relative border-l border-blue-100 ml-3 pl-6 space-y-6 text-xs text-slate-600">
              {/* Step 1 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-bright text-white text-[9px] font-bold">
                  1
                </span>
                <h3 className="font-bold text-navy-dark text-sm">Submit Online Enquiry</h3>
                <p className="mt-1">Fill out the online form on this page with correct contact details and course selection.</p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-bright text-white text-[9px] font-bold">
                  2
                </span>
                <h3 className="font-bold text-navy-dark text-sm">Counseling & Guidance</h3>
                <p className="mt-1">Our academic desk will call you to discuss syllabus details, job opportunities, and fees structure.</p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-bright text-white text-[9px] font-bold">
                  3
                </span>
                <h3 className="font-bold text-navy-dark text-sm">Document Verification</h3>
                <p className="mt-1">Visit our Sangamner campus with your original documents (10th/12th/B.Sc. certificates, photo ID).</p>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-medical text-white text-[9px] font-bold">
                  4
                </span>
                <h3 className="font-bold text-navy-dark text-sm">Confirm Admission</h3>
                <p className="mt-1">Pay the registration fees at the office counter and receive your official admission receipt and calendar.</p>
              </div>
            </div>
          </div>

          {/* Required Documents checklist */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-navy-dark border-b pb-2 border-slate-100 flex items-center gap-2">
              <FileText size={20} className="text-yellow-notice" />
              Required Document Checklist
            </h2>
            <p className="text-slate-600 text-sm">
              Please carry three self-attested sets of the following documents during campus registration:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pl-4 list-disc">
              <li>10th SSC Marks sheet & Certificate</li>
              <li>12th HSC Marks sheet & Certificate</li>
              <li>B.Sc. Degree certificate (for PGDMLT)</li>
              <li>School/College Leaving Certificate</li>
              <li>Aadhar Card (UIDAI Copy)</li>
              <li>Recent passport size color photos (3 copies)</li>
              <li>Caste Certificate (if claiming quota)</li>
              <li>Domicile Certificate (Maharashtra State)</li>
            </ul>
          </div>

          {/* Fee & Scholarship Placeholders */}
          <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
            <h3 className="font-bold text-navy-dark text-sm flex items-center gap-1.5">
              <Info size={16} className="text-blue-bright" />
              Fee Structure & Scholarship details
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              KK Patil Paramedical College maintains highly competitive and affordable fee configurations. Scholarship guidance is available for eligible reserved category candidates.
            </p>
            <p className="text-[11px] text-slate-500 font-semibold italic">
              * Note: Please contact the college admissions counselor directly or download the prospectus to view current academic year fees.
            </p>
          </div>
        </div>

        {/* Right column: Enquiry form */}
        <div className="lg:col-span-5 space-y-6">
          <EnquiryForm />

          {/* Download and Contact Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wide border-b border-slate-800 pb-2">
              Admissions Resources
            </h4>
            
            <div className="space-y-3">
              <a
                href="/disclosure"
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Download size={14} />
                Download Prospectus
              </a>
              
              <div className="text-xs text-slate-400 space-y-2 pt-2">
                <p className="font-bold text-white uppercase tracking-wider text-[10px]">Admission Counseling Helpline:</p>
                <p className="flex items-center gap-2">
                  <Phone size={12} className="text-green-medical" />
                  <span>{settingsMap.phone}</span>
                </p>
                <p>📧 <a href={`mailto:${settingsMap.email}`} className="hover:underline">{settingsMap.email}</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
