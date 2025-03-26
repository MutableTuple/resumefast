import { Lexend } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";


const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "ResumeFast | Create ATS-Friendly Resumes in Minutes",
  description:
    "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
  keywords: [
    "resume builder",
    "ATS-friendly resume",
    "professional resume",
    "job application",
    "career tools",
    "resume templates",
  ],
  metadataBase: new URL("https://resumefast.com"),
  openGraph: {
    title: "ResumeFast | Create ATS-Friendly Resumes in Minutes",
    description:
      "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
    url: "https://resumefast.vercel.app",
    siteName: "ResumeFast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeFast - Create ATS-Friendly Resumes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeFast | Create ATS-Friendly Resumes in Minutes",
    description:
      "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://resumefast.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      {/* <GoogleAnalytics gaId="G-4FWN4CBP58" />  */}
      </head>
      <body className={`${lexend.className} antialiased`}>{children}</body>
    </html>
  );
}
