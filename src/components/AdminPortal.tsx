"use client";

import React, { useState, useTransition } from "react";
import {
  logoutAdmin,
  upsertCourse,
  deleteCourse,
  upsertNotice,
  deleteNotice,
  upsertGalleryItem,
  deleteGalleryItem,
  upsertSocialPost,
  deleteSocialPost,
  upsertDocument,
  deleteDocument,
  updateEnquiryStatus,
  deleteEnquiry,
  updateWebContent,
  updateSetting
} from "@/app/admin/actions";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bell,
  Image as ImageIcon,
  Instagram,
  Settings,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Download,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  X,
  Save,
  Check,
  Calendar,
  AlertTriangle,
  FolderOpen
} from "lucide-react";

// --- TYPES SETUP ---
export interface AdminPortalProps {
  courses: any[];
  enquiries: any[];
  notices: any[];
  galleryItems: any[];
  socialPosts: any[];
  documents: any[];
  webContent: any[];
  settings: any[];
}

export default function AdminPortal({
  courses: initialCourses,
  enquiries: initialEnquiries,
  notices: initialNotices,
  galleryItems: initialGalleryItems,
  socialPosts: initialSocialPosts,
  documents: initialDocuments,
  webContent: initialWebContent,
  settings: initialSettings
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPending, startTransition] = useTransition();

  // Component local states for lists (so we can edit/delete responsively)
  const [courses, setCourses] = useState(initialCourses);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [notices, setNotices] = useState(initialNotices);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [socialPosts, setSocialPosts] = useState(initialSocialPosts);
  const [documents, setDocuments] = useState(initialDocuments);
  const [webContent, setWebContent] = useState(initialWebContent);
  const [settings, setSettings] = useState(initialSettings);

  // Search states
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryFilterStatus, setEnquiryFilterStatus] = useState("All");
  const [enquiryFilterCourse, setEnquiryFilterCourse] = useState("All");

  // Modals / Editing States
  const [editModal, setEditModal] = useState<{
    type: "course" | "notice" | "gallery" | "social" | "document" | null;
    item: any | null;
  }>({ type: null, item: null });

  // Notifications
  const [alert, setAlert] = useState<{ success: boolean; message: string } | null>(null);

  const triggerAlert = (success: boolean, message: string) => {
    setAlert({ success, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await logoutAdmin();
      window.location.reload();
    }
  };

  // --- CSV EXPORTER ---
  const handleCSVExport = () => {
    const headers = [
      "ID",
      "Student Name",
      "Mobile",
      "Email",
      "DOB",
      "Selected Course",
      "Qualification",
      "City",
      "Message",
      "Status",
      "Admin Notes",
      "Submission Date"
    ];

    const rows = enquiries.map((e) => [
      e.id,
      `"${e.studentName.replace(/"/g, '""')}"`,
      e.mobile,
      e.email,
      e.dob,
      `"${e.selectedCourse.replace(/"/g, '""')}"`,
      e.qualification,
      `"${e.city.replace(/"/g, '""')}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      e.status,
      `"${(e.adminNotes || "").replace(/"/g, '""')}"`,
      e.createdAt
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Admissions_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerAlert(true, "Enquiries list exported successfully!");
  };

  // --- ENQUIRY CRUD OPERATION ---
  const handleUpdateEnquiry = async (id: string, status: string, notes: string) => {
    const res = await updateEnquiryStatus(id, status, notes);
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status, adminNotes: notes } : e))
      );
      triggerAlert(true, "Enquiry record updated!");
    } else {
      triggerAlert(false, res.message);
    }
  };

  const handleDeleteEnquiryRecord = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this registration enquiry?")) {
      const res = await deleteEnquiry(id);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        triggerAlert(true, "Enquiry record deleted.");
      } else {
        triggerAlert(false, res.message);
      }
    }
  };

  // --- MOCK SAVE HANDLER FOR MODALS ---
  const handleModalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (editModal.type === "course") {
      const id = editModal.item?.id;
      const name = formData.get("name")?.toString() || "";
      const duration = formData.get("duration")?.toString() || "";
      const eligibility = formData.get("eligibility")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const intake = Number(formData.get("intake") || 30);
      const syllabus = formData.get("syllabus")?.toString() || "";
      const image = formData.get("image")?.toString() || "";
      const brochureUrl = formData.get("brochureUrl")?.toString() || "";

      const res = await upsertCourse({ id, name, duration, eligibility, description, intake, syllabus, image, brochureUrl });
      if (res.success) {
        triggerAlert(true, res.message);
        // Refresh local memory state
        const updatedCourse = { id: id || Math.random().toString(), name, duration, eligibility, description, intake, syllabus, image, brochureUrl, active: true };
        setCourses(prev => id ? prev.map(c => c.id === id ? updatedCourse : c) : [...prev, updatedCourse]);
        setEditModal({ type: null, item: null });
      } else {
        triggerAlert(false, res.message);
      }
    }

    else if (editModal.type === "notice") {
      const id = editModal.item?.id;
      const title = formData.get("title")?.toString() || "";
      const date = formData.get("date")?.toString() || "";
      const category = formData.get("category")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const pdfUrl = formData.get("pdfUrl")?.toString() || "";

      const res = await upsertNotice({ id, title, date, category, description, pdfUrl });
      if (res.success) {
        triggerAlert(true, res.message);
        const updatedNotice = { id: id || Math.random().toString(), title, date, category, description, pdfUrl, active: true };
        setNotices(prev => id ? prev.map(n => n.id === id ? updatedNotice : n) : [...prev, updatedNotice]);
        setEditModal({ type: null, item: null });
      } else {
        triggerAlert(false, res.message);
      }
    }

    else if (editModal.type === "gallery") {
      const id = editModal.item?.id;
      const title = formData.get("title")?.toString() || "";
      const category = formData.get("category")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const imageUrl = formData.get("imageUrl")?.toString() || "";
      const displayOrder = Number(formData.get("displayOrder") || 0);

      const res = await upsertGalleryItem({ id, title, category, description, imageUrl, displayOrder });
      if (res.success) {
        triggerAlert(true, res.message);
        const updatedItem = { id: id || Math.random().toString(), title, category, description, imageUrl, displayOrder, active: true };
        setGalleryItems(prev => id ? prev.map(g => g.id === id ? updatedItem : g) : [...prev, updatedItem]);
        setEditModal({ type: null, item: null });
      } else {
        triggerAlert(false, res.message);
      }
    }

    else if (editModal.type === "social") {
      const id = editModal.item?.id;
      const imageUrl = formData.get("imageUrl")?.toString() || "";
      const caption = formData.get("caption")?.toString() || "";
      const postUrl = formData.get("postUrl")?.toString() || "";
      const postDate = formData.get("postDate")?.toString() || "";

      const res = await upsertSocialPost({ id, imageUrl, caption, postUrl, postDate });
      if (res.success) {
        triggerAlert(true, res.message);
        const updatedPost = { id: id || Math.random().toString(), imageUrl, caption, postUrl, postDate, active: true };
        setSocialPosts(prev => id ? prev.map(s => s.id === id ? updatedPost : s) : [...prev, updatedPost]);
        setEditModal({ type: null, item: null });
      } else {
        triggerAlert(false, res.message);
      }
    }

    else if (editModal.type === "document") {
      const id = editModal.item?.id;
      const name = formData.get("name")?.toString() || "";
      const category = formData.get("category")?.toString() || "";
      const academicYear = formData.get("academicYear")?.toString() || "";
      const pdfUrl = formData.get("pdfUrl")?.toString() || "";

      const res = await upsertDocument({ id, name, category, academicYear, pdfUrl });
      if (res.success) {
        triggerAlert(true, res.message);
        const updatedDoc = { id: id || Math.random().toString(), name, category, academicYear, pdfUrl, active: true };
        setDocuments(prev => id ? prev.map(d => d.id === id ? updatedDoc : d) : [...prev, updatedDoc]);
        setEditModal({ type: null, item: null });
      } else {
        triggerAlert(false, res.message);
      }
    }
  };

  // --- DELETE HANDLERS ---
  const handleItemDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    if (type === "course") {
      const res = await deleteCourse(id);
      if (res.success) {
        setCourses(prev => prev.filter(c => c.id !== id));
        triggerAlert(true, res.message);
      }
    } else if (type === "notice") {
      const res = await deleteNotice(id);
      if (res.success) {
        setNotices(prev => prev.filter(n => n.id !== id));
        triggerAlert(true, res.message);
      }
    } else if (type === "gallery") {
      const res = await deleteGalleryItem(id);
      if (res.success) {
        setGalleryItems(prev => prev.filter(g => g.id !== id));
        triggerAlert(true, res.message);
      }
    } else if (type === "social") {
      const res = await deleteSocialPost(id);
      if (res.success) {
        setSocialPosts(prev => prev.filter(s => s.id !== id));
        triggerAlert(true, res.message);
      }
    } else if (type === "document") {
      const res = await deleteDocument(id);
      if (res.success) {
        setDocuments(prev => prev.filter(d => d.id !== id));
        triggerAlert(true, res.message);
      }
    }
  };

  // --- WEB CONTENT SAVE ---
  const handleSaveWebContent = async (key: string, value: string) => {
    const res = await updateWebContent(key, value);
    if (res.success) {
      setWebContent(prev => prev.map(w => w.key === key ? { ...w, value } : w));
      triggerAlert(true, "Content section saved successfully.");
    } else {
      triggerAlert(false, res.message);
    }
  };

  // --- ADMIN SETTING SAVE ---
  const handleSaveSetting = async (key: string, value: string) => {
    const res = await updateSetting(key, value);
    if (res.success) {
      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
      triggerAlert(true, "Setting saved successfully.");
    } else {
      triggerAlert(false, res.message);
    }
  };

  // --- KPI COUNTS ---
  const kpis = {
    totalCourses: courses.length,
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter(e => e.status === "New").length,
    totalNotices: notices.length,
    totalGallery: galleryItems.length
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-navy-dark text-slate-300 flex flex-col justify-between shrink-0 shadow-md">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-bright flex items-center justify-center text-white font-bold">
              K
            </div>
            <div>
              <h2 className="font-bold text-white uppercase text-xs tracking-wider">KK Patil Admin</h2>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Sangamner Campus</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5 text-xs font-bold uppercase tracking-wider">
            {[
              { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
              { id: "enquiries", label: "Enquiries", icon: <FileText size={16} /> },
              { id: "courses", label: "Courses", icon: <BookOpen size={16} /> },
              { id: "notices", label: "Notices Board", icon: <Bell size={16} /> },
              { id: "gallery", label: "Gallery grid", icon: <ImageIcon size={16} /> },
              { id: "social", label: "Instagram Cards", icon: <Instagram size={16} /> },
              { id: "documents", label: "Mandatory Docs", icon: <FolderOpen size={16} /> },
              { id: "content", label: "Page Text", icon: <Edit size={16} /> },
              { id: "settings", label: "Office Settings", icon: <Settings size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-bright text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom logout actions */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-950/60 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN BODY WRAPPER */}
      <main className="flex-grow p-6 sm:p-8 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Floating status alert */}
        {alert && (
          <div
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl border shadow-lg max-w-sm flex items-start gap-2.5 text-xs animate-slideDown ${
              alert.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <CheckCircle size={16} className={alert.success ? "text-green-medical" : "text-red-500"} />
            <p className="font-medium">{alert.message}</p>
          </div>
        )}

        {/* Dynamic tabs render */}
        
        {/* MODULE A: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy-dark">Dashboard Overview</h2>
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Total Courses", value: kpis.totalCourses, color: "text-blue-bright bg-blue-50 border-blue-100" },
                { label: "Total Enquiries", value: kpis.totalEnquiries, color: "text-slate-800 bg-slate-50 border-slate-200" },
                { label: "New Enquiries", value: kpis.newEnquiries, color: "text-yellow-notice bg-amber-50 border-amber-200" },
                { label: "Active Notices", value: kpis.totalNotices, color: "text-purple-600 bg-purple-50 border-purple-100" },
                { label: "Gallery Photos", value: kpis.totalGallery, color: "text-green-medical bg-emerald-50 border-emerald-100" }
              ].map((kpi, idx) => (
                <div key={idx} className={`p-5 border rounded-xl shadow-sm text-center space-y-1 ${kpi.color}`}>
                  <span className="block text-2xl font-black">{kpi.value}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">{kpi.label}</span>
                </div>
              ))}
            </div>

            {/* Recent Enquiries box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="font-bold text-navy-dark text-sm uppercase tracking-wide">Recent Admissions Enquiries</h3>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="text-xs font-bold text-blue-bright hover:underline"
                >
                  Manage All
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400">No enquiries received yet.</p>
              ) : (
                <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-1">
                  {enquiries.slice(0, 5).map((e) => (
                    <div key={e.id} className="py-4 flex justify-between items-center gap-4 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800">{e.studentName}</h4>
                        <p className="text-slate-500 text-[10px] mt-0.5">
                          📞 {e.mobile} | {e.selectedCourse}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        e.status === "New" ? "bg-blue-50 text-blue-bright border border-blue-100" :
                        e.status === "Admitted" ? "bg-emerald-50 text-green-medical border border-emerald-100" :
                        "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE B: ENQUIRIES VIEWER */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-navy-dark">Admissions Enquiries</h2>
              <button
                onClick={handleCSVExport}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                Export to CSV
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search by student name or city..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-bright"
                />
              </div>
              {/* Filter Status */}
              <div>
                <select
                  value={enquiryFilterStatus}
                  onChange={(e) => setEnquiryFilterStatus(e.target.value)}
                  className="py-2 px-3 w-full border border-slate-200 rounded-lg focus:outline-none bg-white font-semibold text-slate-600"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              {/* Filter Course */}
              <div>
                <select
                  value={enquiryFilterCourse}
                  onChange={(e) => setEnquiryFilterCourse(e.target.value)}
                  className="py-2 px-3 w-full border border-slate-200 rounded-lg focus:outline-none bg-white font-semibold text-slate-600"
                >
                  <option value="All">All Courses</option>
                  <option value="Sanitary Inspector">Sanitary Inspector</option>
                  <option value="PGDMLT">PGDMLT</option>
                </select>
              </div>
            </div>

            {/* enquiries list Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {enquiries.length === 0 ? (
                <div className="text-center py-16 text-slate-400">No enquiries found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                        <th className="p-4">Student Info</th>
                        <th className="p-4">Course Details</th>
                        <th className="p-4">Admission Status</th>
                        <th className="p-4">Admin Action Note</th>
                        <th className="p-4 text-right">Options</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries
                        .filter(e => {
                          const matchesSearch =
                            e.studentName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                            e.city.toLowerCase().includes(enquirySearch.toLowerCase());
                          const matchesStatus =
                            enquiryFilterStatus === "All" || e.status === enquiryFilterStatus;
                          const matchesCourse =
                            enquiryFilterCourse === "All" || e.selectedCourse.includes(enquiryFilterCourse);
                          return matchesSearch && matchesStatus && matchesCourse;
                        })
                        .map((e) => (
                          <tr key={e.id} className="hover:bg-slate-50/50">
                            <td className="p-4 space-y-1">
                              <p className="font-bold text-navy-dark text-sm">{e.studentName}</p>
                              <p className="text-slate-500">📞 {e.mobile} | {e.email}</p>
                              <p className="text-slate-400 text-[10px]">📍 {e.city} | DOB: {e.dob}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-slate-700">{e.selectedCourse}</p>
                              <p className="text-slate-500 text-[10px]">Qual: {e.qualification}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={e.status}
                                onChange={(opt) => handleUpdateEnquiry(e.id, opt.target.value, e.adminNotes || "")}
                                className={`py-1 px-2.5 rounded-full font-bold text-[9px] uppercase tracking-wider cursor-pointer border ${
                                  e.status === "New" ? "bg-blue-50 text-blue-bright border-blue-100" :
                                  e.status === "Admitted" ? "bg-emerald-50 text-green-medical border-emerald-100" :
                                  e.status === "Closed" ? "bg-red-50 text-red-700 border-red-100" :
                                  "bg-amber-50 text-yellow-notice border-amber-200"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Admitted">Admitted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="p-4 max-w-xs">
                              <textarea
                                defaultValue={e.adminNotes || ""}
                                placeholder="Add follow-up notes..."
                                onBlur={(area) => handleUpdateEnquiry(e.id, e.status, area.target.value)}
                                className="w-full p-1.5 border border-slate-200 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-bright"
                                rows={2}
                              />
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteEnquiryRecord(e.id)}
                                className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition"
                                title="Delete Record"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE C: COURSES */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-dark">Course Catalog Management</h2>
              <button
                onClick={() => setEditModal({ type: "course", item: null })}
                className="px-4 py-2 bg-blue-bright hover:bg-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                Add Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-navy-dark text-base">{course.name}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{course.description}</p>
                    <div className="text-[10px] text-slate-400 space-y-0.5">
                      <p>⌛ Duration: {course.duration}</p>
                      <p>👥 Intake capacity: {course.intake} seats</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end shrink-0">
                    <span className="text-[10px] font-bold text-green-medical bg-green-50 px-2 py-0.5 rounded border border-green-150">
                      Active
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditModal({ type: "course", item: course })}
                        className="p-1.5 hover:bg-slate-50 text-slate-600 rounded border border-slate-200"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        onClick={() => handleItemDelete("course", course.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded border border-red-200"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE D: NOTICES */}
        {activeTab === "notices" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-dark">Notice Board Notices</h2>
              <button
                onClick={() => setEditModal({ type: "notice", item: null })}
                className="px-4 py-2 bg-blue-bright hover:bg-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                Create Notice
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4">Publish Date</th>
                    <th className="p-4">Notice Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notices.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">{n.date}</td>
                      <td className="p-4 font-bold text-navy-dark">{n.title}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-100 border rounded text-[9px] font-bold uppercase text-slate-600 tracking-wider">
                          {n.category}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditModal({ type: "notice", item: n })}
                          className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 inline-flex items-center gap-1"
                        >
                          <Edit size={11} /> Edit
                        </button>
                        <button
                          onClick={() => handleItemDelete("notice", n.id)}
                          className="px-2 py-1 border border-red-200 rounded text-red-500 hover:bg-red-50 inline-flex items-center gap-1"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE E: GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-dark">Gallery Upload manager</h2>
              <button
                onClick={() => setEditModal({ type: "gallery", item: null })}
                className="px-4 py-2 bg-blue-bright hover:bg-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.map((g) => (
                <div key={g.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group">
                  <div className="aspect-[4/3] bg-slate-150 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-1 text-xs">
                    <span className="text-[9px] font-bold text-green-medical uppercase tracking-wider">{g.category}</span>
                    <h4 className="font-bold text-navy-dark truncate">{g.title}</h4>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button onClick={() => setEditModal({ type: "gallery", item: g })} className="text-slate-500 hover:text-blue-bright">
                        <Edit size={12} />
                      </button>
                      <button onClick={() => handleItemDelete("gallery", g.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE F: INSTAGRAM CARDS */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-dark">Mock Instagram Feed Manager</h2>
              <button
                onClick={() => setEditModal({ type: "social", item: null })}
                className="px-4 py-2 bg-blue-bright hover:bg-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                New Social Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="aspect-square bg-slate-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.imageUrl} alt="mock ig" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2 text-xs">
                    <p className="text-slate-500 text-[10px]">📅 Date: {post.postDate}</p>
                    <p className="text-slate-600 line-clamp-2 italic">{post.caption}</p>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-pink-600 font-bold hover:underline">
                        Visit Post link
                      </a>
                      <div className="flex gap-2">
                        <button onClick={() => setEditModal({ type: "social", item: post })} className="text-slate-500 hover:text-blue-bright">
                          <Edit size={12} />
                        </button>
                        <button onClick={() => handleItemDelete("social", post.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE G: MANDATORY DOCUMENTS */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-dark">Disclosure PDF documents</h2>
              <button
                onClick={() => setEditModal({ type: "document", item: null })}
                className="px-4 py-2 bg-blue-bright hover:bg-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                Upload PDF
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4">Document Title</th>
                    <th className="p-4">Compliance Type</th>
                    <th className="p-4">Academic Year</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-navy-dark">{doc.name}</td>
                      <td className="p-4 uppercase font-bold text-[9px] text-slate-500 tracking-wider">{doc.category}</td>
                      <td className="p-4 font-medium text-slate-600">{doc.academicYear}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditModal({ type: "document", item: doc })}
                          className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50"
                        >
                          <Edit size={11} /> Edit
                        </button>
                        <button
                          onClick={() => handleItemDelete("document", doc.id)}
                          className="px-2 py-1 border border-red-200 rounded text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE H: WEBSITE TEXT CONTENT */}
        {activeTab === "content" && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-xl font-bold text-navy-dark">Website Text Content Management</h2>

            {webContent.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy-dark uppercase tracking-wider text-[10px] bg-slate-100 px-2.5 py-1 rounded">
                    Key: {c.key}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{c.description}</span>
                </div>
                <textarea
                  defaultValue={c.value}
                  onBlur={(area) => handleSaveWebContent(c.key, area.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-bright"
                  rows={c.key === "hero_slides" ? 6 : 4}
                  placeholder={`Enter value for ${c.key}...`}
                />
                <p className="text-[9px] text-slate-400 italic">
                  * Note: Clicking outside the box automatically syncs edits to the database.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* MODULE I: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-xl font-bold text-navy-dark">Office Settings & Admin Details</h2>

            {settings.map((s) => (
              <div key={s.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 text-xs">
                <div className="w-1/4 shrink-0 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  {s.key}
                </div>
                <div className="w-3/4 flex gap-2">
                  <input
                    type="text"
                    defaultValue={s.value}
                    onBlur={(input) => handleSaveSetting(s.key, input.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-bright text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* 3. DYNAMIC MODALS FOR CRUD FORMS */}
      {editModal.type && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditModal({ type: null, item: null })}
        >
          <div
            className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-slideUp text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-navy-dark text-white flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wide">
                {editModal.item ? "Edit" : "Create"} {editModal.type}
              </h3>
              <button
                onClick={() => setEditModal({ type: null, item: null })}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Course Fields */}
              {editModal.type === "course" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Course Name</label>
                    <input type="text" name="name" required defaultValue={editModal.item?.name || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Duration</label>
                      <input type="text" name="duration" required defaultValue={editModal.item?.duration || ""} placeholder="E.g. 1 Year" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Intake Capacity</label>
                      <input type="number" name="intake" required defaultValue={editModal.item?.intake || 30} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Eligibility</label>
                    <input type="text" name="eligibility" required defaultValue={editModal.item?.eligibility || ""} placeholder="E.g. 12th Pass" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Description</label>
                    <textarea name="description" required defaultValue={editModal.item?.description || ""} rows={3} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Syllabus Subjects (comma-separated)</label>
                    <textarea name="syllabus" required defaultValue={editModal.item?.syllabus || ""} rows={2} placeholder="Subject 1, Subject 2..." className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Course Image URL</label>
                    <input type="text" name="image" defaultValue={editModal.item?.image || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Brochure PDF URL (Optional)</label>
                    <input type="text" name="brochureUrl" defaultValue={editModal.item?.brochureUrl || ""} placeholder="/documents/brochure.pdf" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </>
              )}

              {/* Notice Fields */}
              {editModal.type === "notice" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Notice Title</label>
                    <input type="text" name="title" required defaultValue={editModal.item?.title || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Publish Date</label>
                      <input type="date" name="date" required defaultValue={editModal.item?.date || new Date().toISOString().slice(0,10)} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Category</label>
                      <select name="category" required defaultValue={editModal.item?.category || "Admission"} className="w-full px-3 py-2 border rounded-lg bg-white">
                        <option value="Admission">Admission</option>
                        <option value="Exam">Exam</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Event">Event</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Circular">Circular</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Description Details</label>
                    <textarea name="description" required defaultValue={editModal.item?.description || ""} rows={3} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Attachment PDF URL (Optional)</label>
                    <input type="text" name="pdfUrl" defaultValue={editModal.item?.pdfUrl || ""} placeholder="/documents/notice_file.pdf" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </>
              )}

              {/* Gallery Fields */}
              {editModal.type === "gallery" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Image Title</label>
                    <input type="text" name="title" required defaultValue={editModal.item?.title || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Category</label>
                      <select name="category" required defaultValue={editModal.item?.category || "Campus"} className="w-full px-3 py-2 border rounded-lg bg-white">
                        <option value="Campus">Campus</option>
                        <option value="Laboratory">Laboratory</option>
                        <option value="Students">Students</option>
                        <option value="Events">Events</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Display Order</label>
                      <input type="number" name="displayOrder" defaultValue={editModal.item?.displayOrder || 0} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Description Details</label>
                    <input type="text" name="description" defaultValue={editModal.item?.description || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Image Source URL</label>
                    <input type="text" name="imageUrl" required defaultValue={editModal.item?.imageUrl || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </>
              )}

              {/* Instagram Card Fields */}
              {editModal.type === "social" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Post Image URL</label>
                    <input type="text" name="imageUrl" required defaultValue={editModal.item?.imageUrl || ""} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Caption Text</label>
                    <textarea name="caption" required defaultValue={editModal.item?.caption || ""} rows={3} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Original IG URL</label>
                      <input type="text" name="postUrl" required defaultValue={editModal.item?.postUrl || "https://www.instagram.com/kkpatil_paramedical_college"} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Post Publish Date</label>
                      <input type="date" name="postDate" required defaultValue={editModal.item?.postDate || new Date().toISOString().slice(0,10)} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                </>
              )}

              {/* Document Fields */}
              {editModal.type === "document" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">Document Title</label>
                    <input type="text" name="name" required defaultValue={editModal.item?.name || ""} placeholder="E.g. Affiliation Certificate" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Compliance Category</label>
                      <select name="category" required defaultValue={editModal.item?.category || "Affiliation"} className="w-full px-3 py-2 border rounded-lg bg-white">
                        <option value="Affiliation">Affiliation</option>
                        <option value="Recognition">Recognition</option>
                        <option value="Approvals">Approvals</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Safety">Safety</option>
                        <option value="Fees">Fees</option>
                        <option value="Academic Calendar">Academic Calendar</option>
                        <option value="Results">Results</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 uppercase tracking-wider block">Academic Year</label>
                      <input type="text" name="academicYear" required defaultValue={editModal.item?.academicYear || "2025-2026"} placeholder="E.g. 2025-2026" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 uppercase tracking-wider block">PDF Document Link (Strict PDF check) *</label>
                    <input type="text" name="pdfUrl" required defaultValue={editModal.item?.pdfUrl || ""} placeholder="/documents/file.pdf" className="w-full px-3 py-2 border rounded-lg" />
                    <p className="text-[10px] text-slate-400 mt-1">Must end with .pdf extension to pass security checks.</p>
                  </div>
                </>
              )}

              {/* Submit panel */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditModal({ type: null, item: null })}
                  className="px-4 py-2 border rounded-lg font-bold text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-bright text-white font-bold rounded-lg shadow-sm hover:bg-blue-hover flex items-center gap-1"
                >
                  <Save size={13} /> Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
