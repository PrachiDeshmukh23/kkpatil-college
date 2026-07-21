import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroSlider from "@/components/HeroSlider";
import GalleryPreview from "@/components/GalleryPreview";
import {
  ShieldAlert,
  Users,
  FlaskConical,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Download,
  Calendar,
  Building,
  GraduationCap,
  Sparkles,
  Instagram,
  MessageSquare,
  Phone,
  FileText
} from "lucide-react";

export const revalidate = 0; // Disable static cache for live DB edits

export default async function HomePage() {
  // 1. Fetch web content
  const webContent = await prisma.webContent.findMany();
  const contentMap: Record<string, string> = {};
  webContent.forEach((c) => {
    contentMap[c.key] = c.value;
  });

  // 2. Fetch courses
  const courses = await prisma.course.findMany({
    where: { active: true }
  });

  // 3. Fetch latest 3 notices
  const notices = await prisma.notice.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  // 4. Fetch gallery items
  const galleryItems = await prisma.galleryItem.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" }
  });

  // 5. Fetch social posts
  const socialPosts = await prisma.socialPost.findMany({
    where: { active: true },
    orderBy: { postDate: "desc" }
  });

  // 6. Fetch settings
  const settings = await prisma.adminSettings.findMany();
  const settingsMap: Record<string, string> = {
    phone: "Details will be updated shortly",
    whatsapp: "Details will be updated shortly",
    email: "sandipkute785@gmail.com",
    instagramUrl: "https://www.instagram.com/kkpatil_paramedical_college"
  };
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  const heroSlidesJson = contentMap["hero_slides"];

  // Quick Info Cards definition
  const quickCards = [
    {
      title: "Admissions Open",
      description: "Secure your seat for 2026-2027 Sanitary Inspector & PGDMLT batches.",
      icon: <GraduationCap className="text-yellow-notice" size={24} />,
      bg: "bg-amber-50/50 border-amber-200"
    },
    {
      title: "Experienced Faculty",
      description: "Learn from specialized doctors, microbiologists, and sanitation experts.",
      icon: <Users className="text-blue-bright" size={24} />,
      bg: "bg-blue-50/50 border-blue-200"
    },
    {
      title: "Modern Laboratories",
      description: "Equipped with high-tech diagnostic kits, autoclaves, and analyzers.",
      icon: <FlaskConical className="text-green-medical" size={24} />,
      bg: "bg-emerald-50/50 border-emerald-200"
    },
    {
      title: "Career-Oriented Courses",
      description: "Job-focused training that maps directly to healthcare sector requirements.",
      icon: <Award className="text-purple-600" size={24} />,
      bg: "bg-purple-50/50 border-purple-200"
    },
    {
      title: "Student Support",
      description: "Comprehensive guidance, mock exams, and internship placement advice.",
      icon: <BookOpen className="text-red-500" size={24} />,
      bg: "bg-red-50/50 border-red-200"
    },
    {
      title: "Practical Training",
      description: "Intense laboratory training sessions and municipal/hospital field visits.",
      icon: <Sparkles className="text-indigo-600" size={24} />,
      bg: "bg-indigo-50/50 border-indigo-200"
    }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Slider Section */}
      <HeroSlider slidesJson={heroSlidesJson} />

      {/* 2. Quick Information Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickCards.map((card, idx) => (
            <div
              key={idx}
              className={`flex gap-4 p-6 rounded-xl border shadow-sm hover-lift animate-slide-up ${card.bg}`}
            >
              <div className="shrink-0 p-3 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center h-12 w-12">
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-navy-dark text-sm uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About College Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-bright text-xs font-bold uppercase tracking-wider rounded-full">
              <span>Established in Sangamner</span>
            </div>
            <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight leading-tight">
              Empowering Healthcare Through Quality Education
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {contentMap["about_text"] ||
                "K. K. Patil Paramedical College is a premier institute committed to offering top-tier training in diagnostic sciences and public health administration..."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm space-y-2">
                <h4 className="font-bold text-navy-dark text-xs uppercase tracking-wider text-blue-bright border-b pb-1">
                  Our Mission
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {contentMap["mission"] || "To offer career-focused paramedical education..."}
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm space-y-2">
                <h4 className="font-bold text-navy-dark text-xs uppercase tracking-wider text-green-medical border-b pb-1">
                  Our Vision
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {contentMap["vision"] || "To emerge as the leading healthcare training hub..."}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy-dark hover:bg-blue-bright text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:shadow transition duration-200"
              >
                Read More About Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right illustration / Info Badge */}
          <div className="lg:col-span-5 relative bg-gradient-to-tr from-slate-50 to-blue-50/50 p-8 rounded-2xl border border-slate-100 shadow-inner flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <span className="text-marathi text-yellow-notice font-bold text-sm tracking-wide bg-slate-900 px-3 py-1 rounded-full inline-block">
                प्रवेश सुरू शैक्षणिक वर्ष २०२६-२७
              </span>
              <h3 className="text-lg font-bold text-navy-dark">
                Why Choose KK Patil Paramedical?
              </h3>
              <ul className="space-y-2 text-slate-600 text-xs">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-bright rounded-full" />
                  Practical-based training structure
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-bright rounded-full" />
                  State-of-the-art biochemistry & pathology labs
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-bright rounded-full" />
                  Affordable fee structure with scholarship guidance
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-bright rounded-full" />
                  Municipal corporation internship for Sanitary Inspectors
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-bright rounded-full" />
                  Direct placement support in diagnostic centers
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
              <div className="h-9 w-9 bg-green-medical/10 text-green-medical flex items-center justify-center rounded-full shrink-0">
                <ShieldAlert size={16} />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Our courses comply with industry sanitation guidelines and pathology training safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Courses Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-green-medical bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Specialized Courses
          </span>
          <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight">
            Popular Paramedical Programs
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Choose career-defining academic tracks carefully designed to get you placed immediately in hospital and municipal roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 hover-lift animate-slide-up overflow-hidden group"
            >
              {/* Image Banner */}
              <div className="h-48 w-full bg-slate-100 relative overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop"}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-navy-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                  ⌛ {course.duration}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-navy-dark text-base md:text-lg tracking-tight group-hover:text-blue-bright transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                  <div className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <p>
                      <strong>🎓 Eligibility:</strong> {course.eligibility}
                    </p>
                    <p>
                      <strong>👥 Intake Capacity:</strong> {course.intake} seats
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <Link
                    href={`/courses`}
                    className="w-full text-center py-2 px-3 border border-slate-200 hover:border-blue-bright hover:bg-slate-50 text-slate-700 hover:text-blue-bright text-xs font-bold uppercase tracking-wider rounded-lg transition duration-150"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/admissions#enquiry-form"
                    className="w-full text-center py-2 px-3 bg-green-medical hover:bg-green-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition duration-150"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-16 bg-navy-dark text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title block */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-yellow-notice uppercase tracking-widest block">
                Academic Excellence
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Clinical Mastery in the Heart of Sangamner
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                We believe that paramedical sciences cannot be learned from books alone. Our curriculum is structured around intensive lab practice and real hospital exposure.
              </p>
              <div className="pt-2">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green-medical hover:bg-green-hover text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md transition duration-150"
                >
                  Join Next Batch
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right features grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Practical-Based Education",
                  desc: "Over 60% of our course time is dedicated to clinical lab work and field inspections."
                },
                {
                  title: "Well-Equipped Laboratories",
                  desc: "Modern instrumentation setup so students run diagnostics independently."
                },
                {
                  title: "Qualified Teaching Staff",
                  desc: "Trained by experienced medical experts and industry-grade inspectors."
                },
                {
                  title: "Career & Placement Guidance",
                  desc: "Partnerships with local labs, hospitals, and municipal departments for jobs."
                }
              ].map((f, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide text-blue-bright">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Facilities Preview Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-bright bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Campus Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight">
              Modern Campus Facilities
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Equipping our students with standard tools, textbooks, and classrooms needed to excel in active laboratory diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Pathology & Biochemistry Labs",
                desc: "High-power microscopes, centrifuges, and biochemistry reagents for tests.",
                img: "/images/pathology_lab.png"
              },
              {
                title: "Modern Classrooms",
                desc: "Comfortable seating, visual aids, and interactive tutorial whiteboards.",
                img: "/images/students_lab.png"
              },
              {
                title: "College Reference Library",
                desc: "Extensive medical catalogs, textbooks, and silent research cubicles.",
                img: "/images/college_building.png"
              },
              {
                title: "Operation Theatre Lab",
                desc: "Fitted with anesthesia carts, sterile setups, and surgical practice tools.",
                img: "/images/operation_theatre.png"
              }
            ].map((facility, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover-lift animate-slide-up"
              >
                <div className="h-40 w-full overflow-hidden relative bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={facility.img}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-navy-dark text-sm uppercase tracking-wide">
                    {facility.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-1 px-5 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-lg shadow-sm hover:shadow transition"
            >
              Explore All Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Latest News and Notices */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-bold text-yellow-notice bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
              Notice Board
            </span>
            <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight">
              Latest College Updates
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Stay updated with academic circulars, exam timings, holidays, and admissions notifications.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-bright hover:underline self-start md:self-auto"
          >
            View All Updates
            <ArrowRight size={14} />
          </Link>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-100">
            No active notices or news items available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover-lift animate-slide-up"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-bold text-yellow-notice bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {notice.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                      <Clock size={12} />
                      {notice.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-dark text-sm md:text-base leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {notice.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100/60 flex items-center justify-between">
                  <Link
                    href={`/news`}
                    className="text-xs font-bold text-blue-bright hover:underline"
                  >
                    View Details
                  </Link>
                  {notice.pdfUrl && (
                    <a
                      href={notice.pdfUrl}
                      download
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 text-[10px] font-semibold uppercase tracking-wider rounded transition"
                    >
                      <Download size={10} />
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. Gallery Preview Grid */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-green-medical bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
              College Life
            </span>
            <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight">
              Photo Gallery Preview
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Snapshots of student workshops, classrooms, labs, and interactive events at our Sangamner campus.
            </p>
          </div>

          <GalleryPreview items={galleryItems} showViewAll={true} />
        </div>
      </section>

      {/* 9. Social Media Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
            <Instagram size={12} />
            Social Hub
          </span>
          <h2 className="text-3xl font-extrabold text-navy-dark tracking-tight">
            Follow Our College Activities
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Stay in touch with student events and daily campus operations by following our official public feed.
          </p>
        </div>

        {/* Social Posts Grid */}
        {socialPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-100">
            No social updates listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {socialPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover-lift animate-slide-up"
              >
                {/* Image */}
                <div className="aspect-square w-full bg-slate-50 relative overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt="Instagram Post"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-pink-600/90 text-white p-1.5 rounded-full shadow">
                    <Instagram size={14} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 block">
                      📅 Published: {post.postDate}
                    </span>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {post.caption}
                    </p>
                  </div>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-700 transition"
                  >
                    View Original Post
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-8">
          <a
            href={settingsMap.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-sm hover:shadow transition"
          >
            <Instagram size={16} />
            Visit Official Instagram Profile
          </a>
        </div>
      </section>

      {/* 10. Admission Call-to-Action */}
      <section className="py-16 bg-gradient-to-tr from-navy-dark via-navy-light to-slate-900 text-white text-center border-t border-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-marathi text-yellow-notice font-bold text-sm tracking-wide bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full inline-block">
            प्रवेश सुरू शैक्षणिक वर्ष २०२६-२७
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Start Your Career in the Healthcare Sector
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Gain immediate industry job prospects with our Sanitary Inspector or PGDMLT diplomas. Get trained in local diagnostic settings.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions#enquiry-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-medical hover:bg-green-hover text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg hover:scale-102 transition duration-150"
            >
              <FileText size={16} />
              Apply Now
            </Link>
            <Link
              href="/disclosure"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-bright hover:bg-blue-hover text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg hover:scale-102 transition duration-150"
            >
              <Download size={16} />
              Download Prospectus
            </Link>
            <a
              href={`tel:${settingsMap.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider rounded-lg backdrop-blur-sm transition duration-150"
            >
              <Phone size={16} />
              Call for Admission
            </a>
            <a
              href={`https://wa.me/${settingsMap.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white text-sm font-semibold uppercase tracking-wider rounded-lg border border-slate-800 transition duration-150"
            >
              <MessageSquare size={16} />
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
