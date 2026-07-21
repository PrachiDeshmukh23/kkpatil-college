import React from "react";
import { FlaskConical, BookOpen, Layers, Laptop, Shield, Award, Users, ShieldCheck } from "lucide-react";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Medical Pathology Laboratory",
      description: "Our core training laboratory is fitted with modern equipment including high-power compound microscopes, centrifuges, incubators, autoclaves, and semi-automated biochemistry analyzers. Students gain direct, practical experience running blood profiles, serum tests, and clinical pathology validation procedures.",
      icon: <FlaskConical size={24} className="text-blue-bright" />,
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop"
    },
    {
      title: "Interactive Classrooms",
      description: "Classrooms are designed with a focus on spacious layout, ventilation, and seating comfort. Equipped with traditional whiteboards, digital projector setups, and model charts to facilitate conceptual clarity in anatomy, microbiology, and public health science.",
      icon: <Layers size={24} className="text-green-medical" />,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop"
    },
    {
      title: "Academic Reference Library",
      description: "Our library is stocked with standard textbooks on biochemistry, hematology, medical microbiology, sanitation, and hygiene. Students have access to research catalogs, quiet study cubicles, and national health journals to stay up-to-date with medical guidelines.",
      icon: <BookOpen size={24} className="text-yellow-notice" />,
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop"
    },
    {
      title: "Computer & ICT Center",
      description: "Fitted with computing terminals and high-speed internet access to support research and digital learning. PGDMLT and Sanitary Inspector students learn to use laboratory information systems (LIS) and digital health data tracking applications.",
      icon: <Laptop size={24} className="text-purple-600" />,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop"
    },
    {
      title: "Sanitary Field Training Unit",
      description: "Designed specifically for Sanitary Inspector students. Offers scale models of water purification plants, sewage treatment flowcharts, waste categorization units, and tools for conducting local health audits.",
      icon: <Award size={24} className="text-red-500" />,
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop"
    },
    {
      title: "Student Support & Counseling Office",
      description: "Our career counselor desk guides students through resume building, interview practice, and securing internships in major municipal corporations, hospitals, and clinical diagnostic setups in Sangamner and Nashik.",
      icon: <Users size={24} className="text-teal-600" />,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop"
    },
    {
      title: "Campus Safety & Surveillance",
      description: "Student safety is our top priority. The campus is monitored 24/7 by CCTV security systems and has fire safety installations, first-aid cabinets, and laboratory emergency showers.",
      icon: <Shield size={24} className="text-indigo-600" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
    },
    {
      title: "Hygiene & Sanitation Standards",
      description: "Strictly adhering to clean health facility standards. Hand sanitizing stations, autoclave disposal zones, chemical neutralizing sinks, and separate washroom configurations are strictly maintained.",
      icon: <ShieldCheck size={24} className="text-pink-600" />,
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-blue-bright bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          College Facilities
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          Take a look at the laboratories, classrooms, and resource centers that enable world-class practical paramedical training at KK Patil College.
        </p>
      </div>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Picture Banner */}
              <div className="h-60 w-full overflow-hidden relative bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={facility.image}
                  alt={facility.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 p-3 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center">
                  {facility.icon}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-navy-dark text-base sm:text-lg uppercase tracking-tight group-hover:text-blue-bright transition-colors">
                  {facility.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
