const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Hash password using built-in crypto (no external dependencies)
  const passwordHash = crypto.createHash('sha256').update('admin@kkpatil').digest('hex');

  // 1. Create Admin User
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: passwordHash,
    },
  });
  console.log('Admin user created/updated.');

  // 2. Create default courses
  const courses = [
    {
      name: 'Sanitary Inspector',
      duration: '1 Year',
      eligibility: '12th Pass (Any Stream)',
      description: 'The Sanitary Inspector course provides professional training in hygiene, sanitation, waste management, and public health inspection. It prepares students for critical roles in municipal corporations, hospitality, and public health departments.',
      intake: 40,
      syllabus: 'Anatomy and Physiology, Microbiology, Nutrition and Hygiene, Environmental Sanitation, Health Education, Public Health Administration, Practical Sanitation Training',
      image: '/images/students_lab.png',
    },
    {
      name: 'PGDMLT (Post Graduate Diploma in Medical Laboratory Technology)',
      duration: '1.5 Years',
      eligibility: 'B.Sc. in Chemistry, Botany, Zoology, or Biotechnology',
      description: 'The PGDMLT course offers advanced expertise in clinical diagnostics, laboratory technologies, haematology, biochemistry, and microbiology. Students learn to handle modern diagnostic equipment and perform crucial clinical trials.',
      intake: 30,
      syllabus: 'Clinical Biochemistry, Haematology and Blood Banking, Clinical Pathology, Medical Microbiology, Immunology and Serology, Histopathology and Cytology, Lab Safety and Ethics',
      image: '/images/pathology_lab.png',
    },
    {
      name: 'DMLT (Diploma in Medical Laboratory Technology)',
      duration: '2 Years',
      eligibility: '12th Pass (Science with Biology/Chemistry)',
      description: 'The DMLT course trains students in fundamental clinical laboratory procedures, pathology assays, chemical analysis of bodily fluids, and general lab operations. Graduates are prepared for entry-level technician jobs.',
      intake: 40,
      syllabus: 'General Anatomy and Physiology, Basic Haematology, Clinical Pathology, Blood Banking, Laboratory Reagents, Diagnostic Diagnostics, Basic Microbiology',
      image: '/images/students_lab.png',
    },
    {
      name: 'Operation Theatre Technician (OT)',
      duration: '2 Years',
      eligibility: '12th Pass (Science)',
      description: 'OT Technicians manage surgical theatres, sterilize equipment, maintain anaesthetic charts, and assist surgeons directly during clinical operations. Includes training in sterile environments and patient safety protocols.',
      intake: 30,
      syllabus: 'Anatomy and Surgical Physiology, Anaesthesia Instruments, Sterilization Protocols, Patient Position Management, Surgical Assistance, OT Safety Guidelines',
      image: '/images/operation_theatre.png',
    },
    {
      name: 'Radiology Technician (MRI / CT-Scan / X-Ray)',
      duration: '2 Years',
      eligibility: '12th Pass (Science)',
      description: 'Trains students to operate medical imaging machinery including X-ray units, computed tomography (CT) scanners, and magnetic resonance imaging (MRI) tunnels. Focuses on patient safety and image validation.',
      intake: 30,
      syllabus: 'Radiation Physics, Anatomy and Radiographic Positioning, X-Ray Diagnostics, CT Scan Principles, MRI Scanning, Radiation Safety and Shielding',
      image: '/images/pathology_lab.png',
    },
    {
      name: 'Dialysis Technician',
      duration: '2 Years',
      eligibility: '12th Pass (Science)',
      description: 'Focuses on clinical dialysis operations. Candidates learn to prepare dialysis solutions, run hemodialysis loops, manage dialyzer reuse systems, and monitor patient vitals during treatment sessions.',
      intake: 30,
      syllabus: 'Renal Anatomy and Pathology, Hemodialsyis Principles, Dialyzer Reuse Management, Anticoagulation Methods, Patient Vitals Monitoring, Dialysis Complications',
      image: '/images/students_lab.png',
    }
  ];

  for (const course of courses) {
    await prisma.course.create({
      data: course
    });
  }
  console.log('Courses seeded.');

  // 3. Admin Settings
  const settings = [
    { key: 'collegeName', value: 'K. K. Patil Paramedical College' },
    { key: 'location', value: 'Sangamner, Maharashtra' },
    { key: 'email', value: 'sandipkute785@gmail.com' },
    { key: 'phone', value: '7775811387 / 9975769748 / 9552367856' },
    { key: 'whatsapp', value: '7775811387' },
    { key: 'address', value: 'Near Jathar Hospital, Tajane Mala, New Nagar Road, Sangamner (जठार हॉस्पिटल जवळ, ताजणे मळा, नवीन नगर रोड, संगमनेर)' },
    { key: 'officeTimings', value: 'Monday - Saturday: 9:00 AM - 5:00 PM' },
    { key: 'instagramUrl', value: 'https://www.instagram.com/kkpatil_paramedical_college' },
    { key: 'logoPath', value: '/logo.png' }
  ];

  for (const setting of settings) {
    await prisma.adminSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('Settings seeded.');

  // 4. Web Content
  const content = [
    {
      key: 'hero_slides',
      value: JSON.stringify([
        {
          title: 'K. K. Patil Paramedical College, Sangamner',
          subtitle: 'Build Your Career in Healthcare with Quality Paramedical Education',
          bgImage: '/images/college_campus.png',
          badge: 'Admissions Open 2026-27'
        },
        {
          title: 'Advanced Diagnostic Laboratories',
          subtitle: 'Gain Practical Hands-on Training with Modern Diagnostic Equipment',
          bgImage: '/images/pathology_lab.png',
          badge: 'Hands-on Learning'
        },
        {
          title: 'Experienced Medical Faculty',
          subtitle: 'Learn from Leading Healthcare Experts and Professionals',
          bgImage: '/images/students_lab.png',
          badge: 'Expert Guidance'
        }
      ]),
      description: 'Homepage Hero Slideshow Content'
    },
    {
      key: 'about_text',
      value: 'K. K. Patil Paramedical College, Sangamner is a premium medical education institution dedicated to bridging the gap in clinical staffing by producing high-calibre paramedical technicians. With a state-of-the-art laboratory, modern classroom infrastructure, and a highly qualified teaching staff, we ensure that students are trained with the highest industry standards. Our college focuses on providing job-oriented education that enables our graduates to find rewarding careers immediately upon completion of their studies.',
      description: 'About us section text'
    },
    {
      key: 'mission',
      value: 'To impart outstanding paramedical education, combining theoretical knowledge with extensive clinical practice, creating healthcare professionals who serve with competence, compassion, and ethical standards.',
      description: 'College Mission statement'
    },
    {
      key: 'vision',
      value: 'To be recognized as a premier center of excellence in paramedical sciences, inspiring students to innovate and lead in the healthcare industry.',
      description: 'College Vision statement'
    },
    {
      key: 'educational_values',
      value: 'We value professional integrity, student-centered learning, hands-on clinical mastery, community health engagement, and continuous improvement.',
      description: 'College Values'
    },
    {
      key: 'principal_message',
      value: 'Dear Students, Healthcare is one of the most critical sectors globally, and paramedical professionals form its backbone. At K. K. Patil Paramedical College, we provide a holistic learning experience that blends laboratory rigor with theoretical insight. We welcome you to join us and embark on a fulfilling path in healthcare service.',
      description: 'Principal message content'
    },
    {
      key: 'management_message',
      value: 'Our vision is to build an educational hub in Sangamner that is accessible and highly relevant to regional and national healthcare needs. KK Patil Paramedical College is equipped with high-tech laboratories and facilities to ensure our students receive top-tier training.',
      description: 'Management message content'
    }
  ];

  for (const c of content) {
    await prisma.webContent.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    });
  }
  console.log('Web content seeded.');

  // 5. Notices
  const notices = [
    {
      title: 'Admissions Open for Academic Year 2026-2027',
      date: '2026-07-18',
      category: 'Admission',
      description: 'Applications are invited for Sanitary Inspector (1 Yr) and PGDMLT (1.5 Yr) courses. Secure your seat today to build a rewarding career in healthcare.',
      pdfUrl: null
    },
    {
      title: 'Workshop on Advanced Biochemistry Analyzer',
      date: '2026-07-25',
      category: 'Workshop',
      description: 'A special hands-on workshop is arranged for PGDMLT students on operating advanced biochemistry diagnostic equipment.',
      pdfUrl: null
    },
    {
      title: 'Independence Day Celebration',
      date: '2026-08-15',
      category: 'Event',
      description: 'All students are requested to be present at the college campus at 7:30 AM for the flag hoisting ceremony.',
      pdfUrl: null
    }
  ];

  for (const notice of notices) {
    await prisma.notice.create({ data: notice });
  }
  console.log('Notices seeded.');

  // 6. Gallery Items
  const galleryItems = [
    {
      title: 'Advanced Medical Lab',
      category: 'Laboratory',
      description: 'Equipped with modern microscopes, analyzers, and safety gear.',
      imageUrl: '/images/pathology_lab.png',
      displayOrder: 1
    },
    {
      title: 'Main Campus Building',
      category: 'Campus',
      description: 'Multi-story campus block equipped with advanced classrooms and diagnostic laboratories.',
      imageUrl: '/images/college_campus.png',
      displayOrder: 2
    },
    {
      title: 'Students Training Session',
      category: 'Students',
      description: 'Students performing pathology diagnostic tests.',
      imageUrl: '/images/students_lab.png',
      displayOrder: 3
    },
    {
      title: 'Operation Theatre Setup',
      category: 'Laboratory',
      description: 'Comprehensive training environment for Operation Theatre Technicians.',
      imageUrl: '/images/operation_theatre.png',
      displayOrder: 4
    }
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log('Gallery seeded.');

  // 7. Social Posts (Manual Instagram Entries)
  const socialPosts = [
    {
      imageUrl: '/images/students_lab.png',
      caption: 'Admissions Open! Secure your career in healthcare with PGDMLT, DMLT, and Operation Theatre Tech (OT) courses at K. K. Patil Paramedical Science Institute, Sangamner.',
      postUrl: 'https://www.instagram.com/kkpatil_paramedical_college',
      postDate: '2026-07-12'
    },
    {
      imageUrl: '/images/operation_theatre.png',
      caption: 'Our students during practical laboratory and operation theatre technician sessions. We ensure 100% practical training and hospital exposure!',
      postUrl: 'https://www.instagram.com/kkpatil_paramedical_college',
      postDate: '2026-07-05'
    }
  ];

  for (const post of socialPosts) {
    await prisma.socialPost.create({ data: post });
  }
  console.log('Social posts seeded.');

  // 8. Mandatory Documents
  const documents = [
    {
      name: 'College Affiliation Document',
      category: 'Affiliation',
      academicYear: '2025-2026',
      pdfUrl: '/documents/affiliation_placeholder.pdf'
    },
    {
      name: 'Government Approval Certificate',
      category: 'Recognition',
      academicYear: '2025-2026',
      pdfUrl: '/documents/recognition_placeholder.pdf'
    }
  ];

  for (const doc of documents) {
    await prisma.mandatoryDocument.create({ data: doc });
  }
  console.log('Mandatory documents seeded.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
