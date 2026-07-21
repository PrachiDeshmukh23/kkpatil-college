"use server";

import prisma from "@/lib/db";

export interface SubmitState {
  success: boolean;
  message: string;
}

export async function submitEnquiry(prevState: any, formData: FormData): Promise<SubmitState> {
  const studentName = formData.get("studentName")?.toString().trim();
  const mobile = formData.get("mobile")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const dob = formData.get("dob")?.toString().trim();
  const selectedCourse = formData.get("selectedCourse")?.toString().trim();
  const qualification = formData.get("qualification")?.toString().trim();
  const city = formData.get("city")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const consent = formData.get("consent");

  // 1. Server-side Validation
  if (!studentName || studentName.length < 3) {
    return { success: false, message: "Full Name is required and must be at least 3 characters." };
  }
  if (!mobile || !/^\+?[0-9]{10,14}$/.test(mobile)) {
    return { success: false, message: "Please provide a valid mobile number (10-12 digits)." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (!dob) {
    return { success: false, message: "Date of Birth is required." };
  }
  if (!selectedCourse) {
    return { success: false, message: "Please select a course." };
  }
  if (!qualification) {
    return { success: false, message: "Please select your qualification." };
  }
  if (!city || city.length < 2) {
    return { success: false, message: "City name is required." };
  }
  if (!consent) {
    return { success: false, message: "You must consent to be contacted by the college." };
  }

  try {
    // 2. Database-Driven Rate Limiting (Prevent spam submissions from same mobile within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingSubmission = await prisma.enquiry.findFirst({
      where: {
        mobile: mobile,
        createdAt: {
          gte: fiveMinutesAgo
        }
      }
    });

    if (existingSubmission) {
      return {
        success: false,
        message: "An enquiry was recently submitted using this mobile number. Please try again after 5 minutes."
      };
    }

    // 3. Create the Enquiry Record
    await prisma.enquiry.create({
      data: {
        studentName,
        mobile,
        email,
        dob,
        selectedCourse,
        qualification,
        city,
        message: message || null,
        status: "New"
      }
    });

    return {
      success: true,
      message: "Thank you! Your admission enquiry has been submitted. Our admissions desk will contact you shortly."
    };
  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return {
      success: false,
      message: "An unexpected error occurred while saving your enquiry. Please try again later."
    };
  }
}
