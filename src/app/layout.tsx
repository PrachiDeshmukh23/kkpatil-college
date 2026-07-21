import type { Metadata } from "next";
import { Poppins, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "K. K. Patil Paramedical College, Sangamner",
    template: "%s | K. K. Patil Paramedical College"
  },
  description: "Official website of K. K. Patil Paramedical College, Sangamner. Build your career in healthcare with quality Sanitary Inspector and PGDMLT courses.",
  keywords: ["Paramedical College in Sangamner", "Paramedical Courses in Sangamner", "Sanitary Inspector Course", "PGDMLT Course", "Medical Laboratory Technology Course", "Healthcare Education in Sangamner"],
  openGraph: {
    title: "K. K. Patil Paramedical College, Sangamner",
    description: "Official website of K. K. Patil Paramedical College, Sangamner. Build your career in healthcare with quality Sanitary Inspector and PGDMLT courses.",
    type: "website",
    locale: "en_IE",
    url: "https://kkpatilparamedical.in", // Placeholder domain
    siteName: "K. K. Patil Paramedical College"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
