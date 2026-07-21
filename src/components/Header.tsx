"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, GraduationCap } from "lucide-react";

interface HeaderProps {
  phone?: string;
  email?: string;
  collegeName?: string;
  location?: string;
}

export default function Header({
  phone = "Details will be updated shortly",
  email = "sandipkute785@gmail.com",
  collegeName = "K. K. Patil Paramedical College",
  location = "Sangamner"
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Admissions", href: "/admissions" },
    { name: "Facilities", href: "/facilities" },
    { name: "Gallery", href: "/gallery" },
    { name: "News & Events", href: "/news" },
    { name: "Mandatory Disclosure", href: "/disclosure" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <header className="w-full z-50">
      {/* Top Banner Info bar */}
      <div className="bg-navy-dark text-white text-xs py-2 px-4 sm:px-6 md:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone size={12} className="text-green-medical" />
            <span>{phone}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={12} className="text-blue-bright" />
            <a href={`mailto:${email}`} className="hover:underline">{email}</a>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-marathi text-[10px] sm:text-xs text-yellow-notice font-medium">
            प्रवेश सुरू आहेत शैक्षणिक वर्ष २०२६-२७
          </span>
          <Link
            href="/admin"
            className="hover:text-blue-bright transition text-[10px] sm:text-xs font-semibold px-2 py-0.5 border border-slate-700 rounded bg-slate-900"
          >
            Admin Panel
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full sticky-header ${
          isScrolled
            ? "py-2.5 shadow-md border-slate-200"
            : "py-4 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo & College Info */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-full bg-blue-bright flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-bold text-navy-dark leading-tight text-sm md:text-base tracking-tight uppercase group-hover:text-blue-bright transition-colors">
                {collegeName}
              </h1>
              <p className="text-[10px] md:text-xs font-medium text-slate-500 flex items-center gap-1">
                <span>{location}</span>
                <span className="text-xs text-slate-300">|</span>
                <span className="text-marathi text-[10px] text-green-medical font-semibold">
                  संगमनेर, महाराष्ट्र
                </span>
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-blue-bright bg-blue-50"
                      : "text-navy-light hover:text-blue-bright hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/admissions#enquiry-form"
              className="ml-3 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-green-medical hover:bg-green-hover rounded-full shadow-sm hover:shadow transition duration-200"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Hamburger menu */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-dark hover:text-blue-bright p-2 rounded focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 bg-white shadow-xl flex flex-col justify-between transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-bright flex items-center justify-center text-white">
                <GraduationCap size={18} />
              </div>
              <span className="font-bold text-navy-dark text-xs uppercase tracking-tight">
                KK Patil College
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-900 p-1.5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-bright bg-blue-50 font-bold"
                      : "text-slate-700 hover:text-blue-bright hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <Link
              href="/admissions#enquiry-form"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 px-4 bg-green-medical hover:bg-green-hover text-white rounded-lg text-sm font-bold uppercase tracking-wide transition duration-150"
            >
              Apply Now
            </Link>
            <div className="text-[11px] text-slate-500 text-center space-y-1">
              <p>📍 Sangamner, Maharashtra</p>
              <p>📞 {phone}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
