import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bassel Essam — Full Stack Developer",
  description:
    "Portfolio of Bassel Essam Kamal Mohamed. Full Stack Developer with a Back-End Focus specializing in PHP, Laravel, Clean Architecture, and Domain-Driven Design.",
  keywords: [
    "Bassel Essam",
    "Full Stack Developer",
    "PHP",
    "Laravel",
    "Clean Architecture",
    "DDD",
    "Back-End Developer",
    "Cairo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
