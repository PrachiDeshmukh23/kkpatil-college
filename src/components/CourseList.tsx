"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Book, Clock, GraduationCap, X, ChevronRight, CheckCircle, FileText, Download } from "lucide-react";

export interface Course {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  intake: number;
  syllabus: string;
  image: string;
  brochureUrl?: string | null;
}

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="max-w-md mx-auto relative bg-white rounded-xl shadow-sm border border-slate-200">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search courses by name or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-bright focus:border-transparent text-slate-800"
        />
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-xl border border-slate-100">
          No courses found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Image Banner */}
              <div className="h-52 w-full bg-slate-100 relative overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-navy-dark/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Clock size={12} className="text-yellow-notice" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-bold text-navy-dark text-base sm:text-lg leading-snug group-hover:text-blue-bright transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100/50 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-blue-bright shrink-0" />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Book size={13} className="text-green-medical shrink-0" />
                      <span><strong>Intake Capacity:</strong> {course.intake} seats</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100/60 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full text-center py-2.5 px-3 border border-slate-200 hover:border-blue-bright hover:bg-slate-50 text-slate-700 hover:text-blue-bright text-xs font-bold uppercase tracking-wider rounded-lg transition"
                  >
                    View Details
                  </button>
                  <Link
                    href="/admissions#enquiry-form"
                    className="w-full text-center py-2.5 px-3 bg-green-medical hover:bg-green-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Drawer / Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] text-slate-800 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-navy-dark text-white relative shrink-0 flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-bold text-yellow-notice bg-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
                  ⌛ {selectedCourse.duration} Program
                </span>
                <h2 className="text-lg md:text-xl font-bold mt-2.5 leading-snug">
                  {selectedCourse.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white p-1.5 bg-slate-900/60 hover:bg-slate-900 rounded-full transition"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
              {/* Overview */}
              <div className="space-y-2">
                <h3 className="font-bold text-navy-dark uppercase text-xs tracking-wider border-b pb-1.5 border-slate-100 flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-blue-bright" />
                  Course Overview
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Course Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <p>
                  <strong>🎓 Minimum Qualification:</strong>
                  <span className="block text-slate-600 mt-0.5">{selectedCourse.eligibility}</span>
                </p>
                <p>
                  <strong>👥 Total Intake Capacity:</strong>
                  <span className="block text-slate-600 mt-0.5">{selectedCourse.intake} seats per batch</span>
                </p>
                <p>
                  <strong>💰 Course Fees:</strong>
                  <span className="block text-slate-500 mt-0.5 font-medium italic">
                    Contact administrative office for fee structure details.
                  </span>
                </p>
                <p>
                  <strong>📁 Brochure & Syllabus:</strong>
                  <span className="block text-slate-600 mt-0.5">
                    {selectedCourse.brochureUrl ? (
                      <a href={selectedCourse.brochureUrl} download className="text-blue-bright hover:underline font-bold flex items-center gap-1">
                        <Download size={12} /> Download PDF Brochure
                      </a>
                    ) : (
                      "Available at registration desk"
                    )}
                  </span>
                </p>
              </div>

              {/* Syllabus / Subjects */}
              <div className="space-y-3">
                <h3 className="font-bold text-navy-dark uppercase text-xs tracking-wider border-b pb-1.5 border-slate-100 flex items-center gap-1.5">
                  <Book size={15} className="text-green-medical" />
                  Syllabus & Core Subjects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCourse.syllabus.split(",").map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50/70 border border-slate-100 rounded-lg text-xs">
                      <ChevronRight size={12} className="text-blue-bright shrink-0" />
                      <span className="font-medium text-slate-700">{subject.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Training & Opportunities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-navy-dark text-xs uppercase tracking-wider">
                    🔬 Practical Training details
                  </h4>
                  <p className="text-slate-600 text-xs">
                    {selectedCourse.name.includes("MLT")
                      ? "Includes hematology practices, chemical analyzer operations, validation, smear slides preparation, and hospital lab shifts."
                      : "Includes field surveys, sanitation audits, hygiene checklists, municipal waste disposal tracking, and village campaigns."}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-navy-dark text-xs uppercase tracking-wider">
                    💼 Career Opportunities
                  </h4>
                  <p className="text-slate-600 text-xs">
                    {selectedCourse.name.includes("MLT")
                      ? "Pathology Laboratories, Private Diagnostics centers, Government Health Departments, Hospital blood banks, and clinical research."
                      : "Municipal Corporations, Hospitality inspection boards, Food sanitation inspectors, Health departments, and railway hygiene units."}
                  </p>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-2 bg-yellow-light/40 border border-yellow-notice/20 p-4 rounded-xl">
                <h4 className="font-bold text-navy-dark text-xs uppercase tracking-wider flex items-center gap-1">
                  <FileText size={14} className="text-yellow-notice" />
                  Required Documents at Admission
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                  <li>Original 10th & 12th Marks sheets / Passing Certificates</li>
                  <li>Graduation (B.Sc.) passing certificate (for PGDMLT)</li>
                  <li>Leaving Certificate (TC) & Nationality Certificate</li>
                  <li>Caste Certificate & Caste Validity (if applicable)</li>
                  <li>Aadhar Card & 3 Passport sized photographs</li>
                </ul>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 text-xs font-bold uppercase rounded-lg transition"
              >
                Close Window
              </button>
              <Link
                href="/admissions#enquiry-form"
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2 bg-green-medical hover:bg-green-hover text-white text-xs font-bold uppercase rounded-lg shadow-sm transition"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
