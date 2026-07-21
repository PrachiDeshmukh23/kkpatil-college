import React from "react";
import { staticCourses } from "@/lib/staticData";
import CourseList from "@/components/CourseList";

export default async function CoursesPage() {
  const courses = [...staticCourses].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-green-medical bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Academic Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          Our Offered Courses
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Explore specialized programs in medical laboratory technologies and sanitation, and find the right path for your medical career.
        </p>
      </div>

      {/* Interactive course filters and cards */}
      <CourseList courses={courses} />
    </div>
  );
}
