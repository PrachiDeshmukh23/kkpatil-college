export interface Course {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  intake: number;
  syllabus: string;
  image: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  pdfUrl: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

export interface SocialPost {
  id: string;
  imageUrl: string;
  caption: string;
  postUrl: string;
  postDate: string;
}

export interface MandatoryDocument {
  id: string;
  name: string;
  category: string;
  academicYear: string;
  pdfUrl: string;
}

// 1. Static Settings Constants
export const staticSettings: Record<string, string> = {
  collegeName: "K. K. Patil Paramedical College, Sangamner",
  location: "Sangamner, Maharashtra",
  email: "sandipkute785@gmail.com",
  phone: "7775811387 / 9975769748 / 9552367856",
  whatsapp: "7775811387",
  address: "Near Jathar Hospital, Tajane Mala, New Nagar Road, Sangamner (जठार हॉस्पिटल जवळ, ताजणे मळा, नवीन नगर रोड, संगमनेर)",
  officeTimings: "Monday - Saturday: 9:00 AM - 5:00 PM",
  instagramUrl: "https://www.instagram.com/kkpatil_paramedical_college",
  logoPath: "/logo.png"
};

// 2. Static Web Content Text Blocks
export const staticWebContent: Record<string, string> = {
  hero_slides: JSON.stringify([
    {
      title: "K. K. Patil Paramedical College, Sangamner",
      subtitle: "Build Your Career in Healthcare with Quality Paramedical Education",
      bgImage: "/images/college_building.png",
      badge: "Admissions Open 2026-27"
    },
    {
      title: "Advanced Diagnostic Laboratories",
      subtitle: "Gain Practical Hands-on Training with Modern Diagnostic Equipment",
      bgImage: "/images/pathology_lab.png",
      badge: "Hands-on Learning"
    },
    {
      title: "Experienced Medical Faculty",
      subtitle: "Learn from Leading Healthcare Experts and Professionals",
      bgImage: "/images/students_lab.png",
      badge: "Expert Guidance"
    }
  ]),
  about_text: "K. K. Patil Paramedical College, Sangamner is a premium medical education institution dedicated to bridging the gap in clinical staffing by producing high-calibre paramedical technicians. With a state-of-the-art laboratory, modern classroom infrastructure, and a highly qualified teaching staff, we ensure that students are trained with the highest industry standards. Our college focuses on providing job-oriented education that enables our graduates to find rewarding careers immediately upon completion of their studies.",
  mission: "To impart outstanding paramedical education, combining theoretical knowledge with extensive clinical practice, creating healthcare professionals who serve with competence, compassion, and ethical standards.",
  vision: "To be recognized as a premier center of excellence in paramedical sciences, inspiring students to innovate and lead in the healthcare industry.",
  educational_values: "We value professional integrity, student-centered learning, hands-on clinical mastery, community health engagement, and continuous improvement.",
  principal_message: "Dear Students, Healthcare is one of the most critical sectors globally, and paramedical professionals form its backbone. At K. K. Patil Paramedical College, we provide a holistic learning experience that blends laboratory rigor with theoretical insight. We welcome you to join us and embark on a fulfilling path in healthcare service.",
  management_message: "Our vision is to build an educational hub in Sangamner that is accessible and highly relevant to regional and national healthcare needs. KK Patil Paramedical College is equipped with high-tech laboratories and facilities to ensure our students receive top-tier training."
};

// 3. Static Courses Data
export const staticCourses: Course[] = [
  {
    id: "course-1",
    name: "Sanitary Inspector",
    duration: "1 Year",
    eligibility: "12th Pass (Any Stream)",
    description: "The Sanitary Inspector course provides professional training in hygiene, sanitation, waste management, and public health inspection. It prepares students for critical roles in municipal corporations, hospitality, and public health departments.",
    intake: 40,
    syllabus: "Anatomy and Physiology, Microbiology, Nutrition and Hygiene, Environmental Sanitation, Health Education, Public Health Administration, Practical Sanitation Training",
    image: "/images/students_lab.png"
  },
  {
    id: "course-2",
    name: "PGDMLT (Post Graduate Diploma in Medical Laboratory Technology)",
    duration: "1.5 Years",
    eligibility: "B.Sc. in Chemistry, Botany, Zoology, or Biotechnology",
    description: "The PGDMLT course offers advanced expertise in clinical diagnostics, laboratory technologies, haematology, biochemistry, and microbiology. Students learn to handle modern diagnostic equipment and perform crucial clinical trials.",
    intake: 30,
    syllabus: "Clinical Biochemistry, Haematology and Blood Banking, Clinical Pathology, Medical Microbiology, Immunology and Serology, Histopathology and Cytology, Lab Safety and Ethics",
    image: "/images/pathology_lab.png"
  },
  {
    id: "course-3",
    name: "DMLT (Diploma in Medical Laboratory Technology)",
    duration: "2 Years",
    eligibility: "12th Pass (Science with Biology/Chemistry)",
    description: "The DMLT course trains students in fundamental clinical laboratory procedures, pathology assays, chemical analysis of bodily fluids, and general lab operations. Graduates are prepared for entry-level technician jobs.",
    intake: 40,
    syllabus: "General Anatomy and Physiology, Basic Haematology, Clinical Pathology, Blood Banking, Laboratory Reagents, Diagnostic Diagnostics, Basic Microbiology",
    image: "/images/students_lab.png"
  },
  {
    id: "course-4",
    name: "Operation Theatre Technician (OT)",
    duration: "2 Years",
    eligibility: "12th Pass (Science)",
    description: "OT Technicians manage surgical theatres, sterilize equipment, maintain anaesthetic charts, and assist surgeons directly during clinical operations. Includes training in sterile environments and patient safety protocols.",
    intake: 30,
    syllabus: "Anatomy and Surgical Physiology, Anaesthesia Instruments, Sterilization Protocols, Patient Position Management, Surgical Assistance, OT Safety Guidelines",
    image: "/images/operation_theatre.png"
  },
  {
    id: "course-5",
    name: "Radiology Technician (MRI / CT-Scan / X-Ray)",
    duration: "2 Years",
    eligibility: "12th Pass (Science)",
    description: "Trains students to operate medical imaging machinery including X-ray units, computed tomography (CT) scanners, and magnetic resonance imaging (MRI) tunnels. Focuses on patient safety and image validation.",
    intake: 30,
    syllabus: "Radiation Physics, Anatomy and Radiographic Positioning, X-Ray Diagnostics, CT Scan Principles, MRI Scanning, Radiation Safety and Shielding",
    image: "/images/pathology_lab.png"
  },
  {
    id: "course-6",
    name: "Dialysis Technician",
    duration: "2 Years",
    eligibility: "12th Pass (Science)",
    description: "Focuses on clinical dialysis operations. Candidates learn to prepare dialysis solutions, run hemodialysis loops, manage dialyzer reuse systems, and monitor patient vitals during treatment sessions.",
    intake: 30,
    syllabus: "Renal Anatomy and Pathology, Hemodialsyis Principles, Dialyzer Reuse Management, Anticoagulation Methods, Patient Vitals Monitoring, Dialysis Complications",
    image: "/images/students_lab.png"
  }
];

// 4. Static Notices Data
export const staticNotices: Notice[] = [
  {
    id: "notice-1",
    title: "Admissions Open for Academic Year 2026-2027",
    date: "2026-07-18",
    category: "Admission",
    description: "Applications are invited for Sanitary Inspector (1 Yr) and PGDMLT (1.5 Yr) courses. Secure your seat today to build a rewarding career in healthcare.",
    pdfUrl: null
  },
  {
    id: "notice-2",
    title: "Workshop on Advanced Biochemistry Analyzer",
    date: "2026-07-25",
    category: "Workshop",
    description: "A special hands-on workshop is arranged for PGDMLT students on operating advanced biochemistry diagnostic equipment.",
    pdfUrl: null
  },
  {
    id: "notice-3",
    title: "Independence Day Celebration",
    date: "2026-08-15",
    category: "Event",
    description: "All students are requested to be present at the college campus at 7:30 AM for the flag hoisting ceremony.",
    pdfUrl: null
  }
];

// 5. Static Gallery Items Data (includes the flyers)
export const staticGalleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Advanced Medical Lab",
    category: "Laboratory",
    description: "Equipped with modern microscopes, analyzers, and safety gear.",
    imageUrl: "/images/pathology_lab.png",
    displayOrder: 1
  },
  {
    id: "gallery-2",
    title: "Main Campus Building",
    category: "Campus",
    description: "Multi-story campus block equipped with advanced classrooms and diagnostic laboratories.",
    imageUrl: "/images/college_building.png", // Corrected path
    displayOrder: 2
  },
  {
    id: "gallery-3",
    title: "Students Training Session",
    category: "Students",
    description: "Students performing pathology diagnostic tests.",
    imageUrl: "/images/students_lab.png",
    displayOrder: 3
  },
  {
    id: "gallery-4",
    title: "Operation Theatre Setup",
    category: "Laboratory",
    description: "Comprehensive training environment for Operation Theatre Technicians.",
    imageUrl: "/images/operation_theatre.png",
    displayOrder: 4
  },
  {
    id: "gallery-flyer1",
    title: "Admission Guidance 2026-27",
    category: "Admissions",
    description: "Get complete details on healthcare career streams after 10th and 12th standards.",
    imageUrl: "/images/flyer_1.png",
    displayOrder: 10
  },
  {
    id: "gallery-flyer2",
    title: "World Blood Donor Day",
    category: "Events",
    description: "Inspiring student initiatives and blood donation camps organized at Sangamner.",
    imageUrl: "/images/flyer_2.png",
    displayOrder: 11
  },
  {
    id: "gallery-flyer3",
    title: "DMLT Admission Details",
    category: "Admissions",
    description: "Information about eligibility criteria, intake capacity, and duration for the DMLT course.",
    imageUrl: "/images/flyer_3.png",
    displayOrder: 12
  },
  {
    id: "gallery-flyer4",
    title: "Hospital Management Opportunities",
    category: "Admissions",
    description: "Learn about leadership roles and administrative training in medical care centers.",
    imageUrl: "/images/flyer_4.png",
    displayOrder: 13
  },
  {
    id: "gallery-flyer5",
    title: "Courses Offered Overview",
    category: "Admissions",
    description: "Full list of paramedical, sanitary, and laboratory tech courses at K. K. Patil College.",
    imageUrl: "/images/flyer_5.png",
    displayOrder: 14
  }
];

// 6. Static Social Posts (Instagram Feed)
export const staticSocialPosts: SocialPost[] = [
  {
    id: "post-1",
    imageUrl: "/images/students_lab.png",
    caption: "Admissions Open! Secure your career in healthcare with PGDMLT, DMLT, and Operation Theatre Tech (OT) courses at K. K. Patil Paramedical Science Institute, Sangamner.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-12"
  },
  {
    id: "post-2",
    imageUrl: "/images/operation_theatre.png",
    caption: "Our students during practical laboratory and operation theatre technician sessions. We ensure 100% practical training and hospital exposure!",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-05"
  },
  {
    id: "post-flyer1",
    imageUrl: "/images/flyer_1.png",
    caption: "१२वी नंतर Career ची चिंता? Healthcare मध्ये बनवा उज्ज्वल भविष्य! Admission Open for 2026-27.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-19"
  },
  {
    id: "post-flyer2",
    imageUrl: "/images/flyer_2.png",
    caption: "World Blood Donor Day Celebration. Save lives, inspire others! Donate blood.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-06-14"
  },
  {
    id: "post-flyer3",
    imageUrl: "/images/flyer_3.png",
    caption: "DMLT Admission Notice - २ वर्षे कालावधी. सुवर्णसंधी क्लिनिकल लॅबोरेटरी क्षेत्रात करियर करण्याची.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-15"
  },
  {
    id: "post-flyer4",
    imageUrl: "/images/flyer_4.png",
    caption: "Hospital Management Course - Admission Open. Management training in healthcare.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-16"
  },
  {
    id: "post-flyer5",
    imageUrl: "/images/flyer_5.png",
    caption: "१०वी-१२वी उत्तीर्ण विद्यार्थ्यांसाठी सुवर्णसंधी! Full course lineup at K. K. Patil Paramedical College.",
    postUrl: "https://www.instagram.com/kkpatil_paramedical_college",
    postDate: "2026-07-20"
  }
];

// 7. Static Mandatory Documents Data
export const staticMandatoryDocuments: MandatoryDocument[] = [
  {
    id: "doc-1",
    name: "College Affiliation Document",
    category: "Affiliation",
    academicYear: "2025-2026",
    pdfUrl: "/documents/affiliation_placeholder.pdf"
  },
  {
    id: "doc-2",
    name: "Government Approval Certificate",
    category: "Recognition",
    academicYear: "2025-2026",
    pdfUrl: "/documents/recognition_placeholder.pdf"
  }
];
