"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const SESSION_COOKIE = "admin_session";
const MOCK_TOKEN = "kkpatil_admin_secure_token_2026"; // In production, use JWT or UUID session keys

// --- AUTHENTICATION ---

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { success: false, message: "Please provide both username and password." };
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (!user) {
      return { success: false, message: "Invalid credentials." };
    }

    const inputHash = crypto.createHash("sha256").update(password).digest("hex");
    if (inputHash !== user.passwordHash) {
      return { success: false, message: "Invalid credentials." };
    }

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, MOCK_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 hours session
      path: "/"
    });

    return { success: true, message: "Logged in successfully!" };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Authentication error." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token === MOCK_TOKEN;
}

// Helper to assert admin authorization in server actions
async function assertAuth() {
  const auth = await isAuthenticated();
  if (!auth) {
    throw new Error("Unauthorized access. Admin session expired.");
  }
}

// --- COURSE MANAGEMENT ---

export async function upsertCourse(data: {
  id?: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  intake: number;
  syllabus: string;
  image: string;
  brochureUrl?: string | null;
  active?: boolean;
}) {
  await assertAuth();

  const payload = {
    name: data.name,
    duration: data.duration,
    eligibility: data.eligibility,
    description: data.description,
    intake: Number(data.intake),
    syllabus: data.syllabus,
    image: data.image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop",
    brochureUrl: data.brochureUrl || null,
    active: data.active !== undefined ? data.active : true
  };

  try {
    if (data.id) {
      await prisma.course.update({
        where: { id: data.id },
        data: payload
      });
      return { success: true, message: "Course updated successfully." };
    } else {
      await prisma.course.create({
        data: payload
      });
      return { success: true, message: "Course created successfully." };
    }
  } catch (error) {
    console.error("Course upsert failed:", error);
    return { success: false, message: "Failed to save course." };
  }
}

export async function deleteCourse(id: string) {
  await assertAuth();
  try {
    await prisma.course.delete({ where: { id } });
    return { success: true, message: "Course deleted." };
  } catch (error) {
    console.error("Course delete failed:", error);
    return { success: false, message: "Failed to delete course." };
  }
}

// --- NOTICE MANAGEMENT ---

export async function upsertNotice(data: {
  id?: string;
  title: string;
  date: string;
  category: string;
  description: string;
  pdfUrl?: string | null;
  active?: boolean;
}) {
  await assertAuth();

  const payload = {
    title: data.title,
    date: data.date,
    category: data.category,
    description: data.description,
    pdfUrl: data.pdfUrl || null,
    active: data.active !== undefined ? data.active : true
  };

  try {
    if (data.id) {
      await prisma.notice.update({
        where: { id: data.id },
        data: payload
      });
      return { success: true, message: "Notice updated." };
    } else {
      await prisma.notice.create({
        data: payload
      });
      return { success: true, message: "Notice published." };
    }
  } catch (error) {
    console.error("Notice upsert failed:", error);
    return { success: false, message: "Failed to save notice." };
  }
}

export async function deleteNotice(id: string) {
  await assertAuth();
  try {
    await prisma.notice.delete({ where: { id } });
    return { success: true, message: "Notice deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete notice." };
  }
}

// --- GALLERY MANAGEMENT ---

export async function upsertGalleryItem(data: {
  id?: string;
  title: string;
  category: string;
  description?: string | null;
  imageUrl: string;
  displayOrder?: number;
  active?: boolean;
}) {
  await assertAuth();

  const payload = {
    title: data.title,
    category: data.category,
    description: data.description || null,
    imageUrl: data.imageUrl,
    displayOrder: Number(data.displayOrder || 0),
    active: data.active !== undefined ? data.active : true
  };

  try {
    if (data.id) {
      await prisma.galleryItem.update({
        where: { id: data.id },
        data: payload
      });
      return { success: true, message: "Gallery item updated." };
    } else {
      await prisma.galleryItem.create({
        data: payload
      });
      return { success: true, message: "Gallery item added." };
    }
  } catch (error) {
    console.error("Gallery item upsert failed:", error);
    return { success: false, message: "Failed to save gallery item." };
  }
}

export async function deleteGalleryItem(id: string) {
  await assertAuth();
  try {
    await prisma.galleryItem.delete({ where: { id } });
    return { success: true, message: "Gallery item deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete gallery item." };
  }
}

// --- SOCIAL POST MANAGEMENT ---

export async function upsertSocialPost(data: {
  id?: string;
  imageUrl: string;
  caption: string;
  postUrl: string;
  postDate: string;
  active?: boolean;
}) {
  await assertAuth();

  const payload = {
    imageUrl: data.imageUrl,
    caption: data.caption,
    postUrl: data.postUrl,
    postDate: data.postDate,
    active: data.active !== undefined ? data.active : true
  };

  try {
    if (data.id) {
      await prisma.socialPost.update({
        where: { id: data.id },
        data: payload
      });
      return { success: true, message: "Social post card updated." };
    } else {
      await prisma.socialPost.create({
        data: payload
      });
      return { success: true, message: "Social post card added." };
    }
  } catch (error) {
    console.error("Social post upsert failed:", error);
    return { success: false, message: "Failed to save social post card." };
  }
}

export async function deleteSocialPost(id: string) {
  await assertAuth();
  try {
    await prisma.socialPost.delete({ where: { id } });
    return { success: true, message: "Social post card deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete social post card." };
  }
}

// --- MANDATORY DOCUMENT MANAGEMENT ---

export async function upsertDocument(data: {
  id?: string;
  name: string;
  category: string;
  academicYear: string;
  pdfUrl: string;
  active?: boolean;
}) {
  await assertAuth();

  // Validate PDF type
  if (!data.pdfUrl || !data.pdfUrl.toLowerCase().endsWith(".pdf")) {
    return { success: false, message: "Official disclosures must be PDF files only." };
  }

  const payload = {
    name: data.name,
    category: data.category,
    academicYear: data.academicYear,
    pdfUrl: data.pdfUrl,
    active: data.active !== undefined ? data.active : true
  };

  try {
    if (data.id) {
      await prisma.mandatoryDocument.update({
        where: { id: data.id },
        data: payload
      });
      return { success: true, message: "Disclosure document updated." };
    } else {
      await prisma.mandatoryDocument.create({
        data: payload
      });
      return { success: true, message: "Disclosure document registered." };
    }
  } catch (error) {
    console.error("Document upsert failed:", error);
    return { success: false, message: "Failed to save disclosure document." };
  }
}

export async function deleteDocument(id: string) {
  await assertAuth();
  try {
    await prisma.mandatoryDocument.delete({ where: { id } });
    return { success: true, message: "Document reference deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete document reference." };
  }
}

// --- ENQUIRY MANAGEMENT ACTIONS ---

export async function updateEnquiryStatus(id: string, status: string, adminNotes?: string) {
  await assertAuth();
  try {
    await prisma.enquiry.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes !== undefined ? adminNotes : null
      }
    });
    return { success: true, message: "Enquiry status updated." };
  } catch (error) {
    console.error("Enquiry status update failed:", error);
    return { success: false, message: "Failed to update enquiry." };
  }
}

export async function deleteEnquiry(id: string) {
  await assertAuth();
  try {
    await prisma.enquiry.delete({ where: { id } });
    return { success: true, message: "Enquiry record deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete record." };
  }
}

// --- SETTINGS AND CONTENT MANAGEMENT ---

export async function updateWebContent(key: string, value: string) {
  await assertAuth();
  try {
    await prisma.webContent.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    return { success: true, message: `Updated content for key: ${key}` };
  } catch (error) {
    console.error("Content update failed:", error);
    return { success: false, message: "Failed to update website content." };
  }
}

export async function updateSetting(key: string, value: string) {
  await assertAuth();
  try {
    await prisma.adminSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    return { success: true, message: `Updated settings key: ${key}` };
  } catch (error) {
    console.error("Settings update failed:", error);
    return { success: false, message: "Failed to update configuration setting." };
  }
}
