"use client";

import React, { useState } from "react";
import { submitEnquiry } from "@/app/actions";
import { Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    mobile: "",
    email: "",
    dob: "",
    selectedCourse: "",
    qualification: "",
    city: "",
    message: "",
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) tempErrors.studentName = "Full name is required";
    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      tempErrors.mobile = "Please enter a valid 10-digit number";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Enter a valid email address";
    }
    if (!formData.dob) tempErrors.dob = "Date of birth is required";
    if (!formData.selectedCourse) tempErrors.selectedCourse = "Select a course";
    if (!formData.qualification) tempErrors.qualification = "Select qualification";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!formData.consent) tempErrors.consent = "You must agree to proceed";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val.toString());
      });

      const result = await submitEnquiry(null, data);
      setStatus(result);
      if (result.success) {
        setFormData({
          studentName: "",
          mobile: "",
          email: "",
          dob: "",
          selectedCourse: "",
          qualification: "",
          city: "",
          message: "",
          consent: false
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: "An unexpected network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="enquiry-form" className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
      <div className="space-y-1.5 text-center sm:text-left border-b pb-4 border-slate-100">
        <h3 className="font-extrabold text-navy-dark text-lg sm:text-xl uppercase tracking-tight">
          Online Admission Enquiry
        </h3>
        <p className="text-slate-500 text-xs">
          Submit this form to register interest and secure consultation on course availability.
        </p>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
            status.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {status.success ? (
            <CheckCircle className="shrink-0 text-green-medical" size={18} />
          ) : (
            <AlertTriangle className="shrink-0 text-red-500" size={18} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="studentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Student Full Name *
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="E.g. Sandip Kute"
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright ${
                errors.studentName ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.studentName && <p className="text-[10px] text-red-500">{errors.studentName}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <label htmlFor="mobile" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit number"
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright ${
                errors.mobile ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.mobile && <p className="text-[10px] text-red-500">{errors.mobile}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright ${
                errors.email ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
          </div>

          {/* DOB */}
          <div className="space-y-1">
            <label htmlFor="dob" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright ${
                errors.dob ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.dob && <p className="text-[10px] text-red-500">{errors.dob}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Selected Course */}
          <div className="space-y-1">
            <label htmlFor="selectedCourse" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Selected Course *
            </label>
            <select
              id="selectedCourse"
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright bg-white ${
                errors.selectedCourse ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">-- Choose Program --</option>
              <option value="Sanitary Inspector">Sanitary Inspector (1 Year)</option>
              <option value="PGDMLT">PGDMLT (1.5 Years)</option>
            </select>
            {errors.selectedCourse && <p className="text-[10px] text-red-500">{errors.selectedCourse}</p>}
          </div>

          {/* Previous Qualification */}
          <div className="space-y-1">
            <label htmlFor="qualification" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Previous Qualification *
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright bg-white ${
                errors.qualification ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">-- Choose Qualification --</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Arts/Commerce">12th Arts/Commerce</option>
              <option value="12th Science">12th Science</option>
              <option value="B.Sc Graduate">B.Sc Graduate</option>
              <option value="Other Graduate">Other Graduate</option>
            </select>
            {errors.qualification && <p className="text-[10px] text-red-500">{errors.qualification}</p>}
          </div>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label htmlFor="city" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            City / Village *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="E.g. Sangamner"
            className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright ${
              errors.city ? "border-red-400" : "border-slate-200"
            }`}
          />
          {errors.city && <p className="text-[10px] text-red-500">{errors.city}</p>}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Additional Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any specific query or subject interests..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-bright"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-1 pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-bright focus:ring-blue-bright"
            />
            <span className="text-[10px] sm:text-xs text-slate-500 select-none">
              I authorize KK Patil Paramedical College to contact me via email, phone, or WhatsApp regarding this registration enquiry. *
            </span>
          </label>
          {errors.consent && <p className="text-[10px] text-red-500">{errors.consent}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-medical hover:bg-green-hover disabled:bg-slate-300 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition duration-150 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Submitting Enquiry...
            </>
          ) : (
            <>
              <Send size={14} />
              Submit Registration
            </>
          )}
        </button>
      </form>
    </div>
  );
}
