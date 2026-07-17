import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Inter, Bebas_Neue } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { FloatingBlob } from "@/components/ui/FloatingBlob";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ryama — AI Engineer",
  description:
    "Personal portfolio of an AI Engineer building the next generation of intelligent systems. Computer vision, deep learning, and scalable AI infrastructure.",
  openGraph: {
    title: "ryama — AI Engineer",
    description:
      "Personal portfolio of an AI Engineer building the next generation of intelligent systems.",
    type: "website",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfairDisplay.variable} ${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#EEEDE9] text-[#1a1a1a] relative overflow-x-hidden">
        {/* Global UI Layer */}
        <Header />
        
        {/* Ambient Blob in background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <FloatingBlob />
        </div>

        {/* Page Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
