import React from "react";
import { staticMandatoryDocuments } from "@/lib/staticData";
import { FileText, Eye, Download, ShieldCheck } from "lucide-react";

export default async function DisclosurePage() {
  const documents = staticMandatoryDocuments;

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-blue-bright bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Statutory Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          Mandatory Disclosure
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          In accordance with educational board standards, we disclose official certificates, affiliation papers, safety approvals, and fee regulations.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Banner Alert */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 leading-normal">
          <ShieldCheck className="shrink-0 text-green-medical mt-0.5" size={16} />
          <p>
            All publications listed below represent active approvals verified by KK Patil Paramedical College. Click <strong>View PDF</strong> to preview in browser, or <strong>Download</strong> to save locally.
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No mandatory disclosure documents are currently uploaded.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Document Title</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Academic Year</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-navy-dark flex items-center gap-2">
                      <FileText size={16} className="text-blue-bright shrink-0" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-500">
                      {doc.academicYear}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-bright hover:underline"
                      >
                        <Eye size={13} />
                        View
                      </a>
                      <span className="text-slate-300">|</span>
                      <a
                        href={doc.pdfUrl}
                        download
                        className="inline-flex items-center gap-1 text-xs font-bold text-green-medical hover:underline"
                      >
                        <Download size={13} />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
