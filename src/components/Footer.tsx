import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Instagram } from "lucide-react";

interface FooterProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  collegeName?: string;
}

export default function Footer({
  phone = "Details will be updated shortly",
  whatsapp = "Details will be updated shortly",
  email = "sandipkute785@gmail.com",
  address = "Details will be updated shortly",
  collegeName = "K. K. Patil Paramedical College"
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses Offered", href: "/courses" },
    { name: "Admissions info", href: "/admissions" },
    { name: "College Facilities", href: "/facilities" },
    { name: "Mandatory Disclosure", href: "/disclosure" },
    { name: "Contact College", href: "/contact" }
  ];

  const courses = [
    { name: "Sanitary Inspector (1 Year)", href: "/courses" },
    { name: "PGDMLT (1.5 Years)", href: "/courses" }
  ];

  return (
    <footer className="bg-navy-dark text-slate-300 pt-16 pb-8 border-t-4 border-blue-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-bright flex items-center justify-center text-white shadow-md">
              <GraduationCap size={22} />
            </div>
            <span className="font-bold text-white text-base tracking-tight uppercase">
              KK Patil Paramedical
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nurturing competent, caring, and professional medical laboratory technologists and sanitary inspector personnel in Sangamner. Build a career in clinical health diagnostics.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/kkpatil_paramedical_college"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white uppercase text-sm tracking-wider mb-5 pb-2 border-b border-slate-800">
            Quick Navigation
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all duration-150"
                >
                  <ArrowRight size={12} className="text-blue-bright" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses Offered */}
        <div>
          <h3 className="font-semibold text-white uppercase text-sm tracking-wider mb-5 pb-2 border-b border-slate-800">
            Courses Offered
          </h3>
          <ul className="space-y-2.5">
            {courses.map((course) => (
              <li key={course.name}>
                <Link
                  href={course.href}
                  className="text-sm text-slate-400 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all duration-150"
                >
                  <ArrowRight size={12} className="text-green-medical" />
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 p-3 rounded bg-slate-900 border border-slate-800 text-xs">
            <span className="text-marathi text-yellow-notice font-semibold block mb-1">
              प्रवेश सुरू शैक्षणिक वर्ष २०२६-२७
            </span>
            <p className="text-slate-500">Contact college for immediate registration and brochures.</p>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white uppercase text-sm tracking-wider mb-5 pb-2 border-b border-slate-800">
            Official Address & Contact
          </h3>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-bright mt-0.5 shrink-0" />
              <div className="text-sm text-slate-400 leading-normal">
                <p className="font-semibold text-white">{collegeName}</p>
                <p>{address}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-green-medical shrink-0" />
              <span className="text-sm text-slate-400">{phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-bright shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-sm text-slate-400 hover:text-white hover:underline transition"
              >
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {currentYear} {collegeName}, Sangamner. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-slate-300">Privacy Policy</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-slate-300">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
