import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNavigationBar from "@/app/ui/mobilenavigationbar";
import MobileOnlyOverlay from "@/app/ui/mobile-only-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dương Minh Thuận | Portfolio",
  description: "Personal Portfolio of Duong Minh Thuan",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',   // quan trọng!
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <MobileOnlyOverlay />

        <div className="page-transition-enabled">
            {children}
        </div>

        <div className="relative z-[60]">
          <MobileNavigationBar />
        </div>

        <div className="fixed inset-0 -z-20 bg-white"
          style={{
            backgroundImage: 'conic-gradient(from 90deg at 12px 12px, rgba(0,0,0,0.05) 90deg, transparent 90deg)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="fixed bottom-0 left-0 right-0 h-28 pointer-events-none -z-5"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 30%, transparent 100%)'
          }}
        />
      </body>
    </html>
  );
}
