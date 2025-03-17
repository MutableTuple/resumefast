import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "ResumeFast | Create ATS-Friendly Resumes in Minutes",
  description: "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
  keywords: "resume builder, ATS-friendly resume, professional resume, job application, career tools, resume templates",
  metadataBase: new URL("https://resumefast.com"),
  openGraph: {
    title: "ResumeFast | Create ATS-Friendly Resumes in Minutes",
    description: "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
    url: "https://resumefast.com",
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
    description: "Build professional, ATS-friendly resumes quickly with ResumeFast. Stand out to employers and pass applicant tracking systems with our easy-to-use resume builder.",
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
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="ResumeFast" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ResumeFast" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${lexend.className} antialiased`}>{children}</body>
    </html>
  );
}