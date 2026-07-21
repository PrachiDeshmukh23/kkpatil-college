"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
      <h3 className="font-extrabold text-navy-dark text-base uppercase tracking-tight">
        Send Direct Message
      </h3>

      {submitted && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2 font-medium">
          <CheckCircle size={14} className="text-green-medical" />
          <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            disabled={loading}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-bright focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            disabled={loading}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-bright focus:outline-none"
          />
        </div>
        <input
          type="text"
          placeholder="Subject"
          required
          disabled={loading}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-bright focus:outline-none"
        />
        <textarea
          placeholder="Your Message..."
          rows={4}
          required
          disabled={loading}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-bright focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-2.5 px-4 bg-blue-bright hover:bg-blue-hover text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition disabled:bg-slate-300 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={12} />
              Sending...
            </>
          ) : (
            <>
              <Send size={12} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
