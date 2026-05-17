import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yogeshbawane.in"),
  title: "Yogesh Bawane — Robotics Engineer & Hardware Educator",
  description:
    "Robotics Engineer at Newton School of Technology. Hardware educator, VLSI researcher at BITS Pilani, and creator of ImpulseTech. Building India's next generation of hardware engineers.",
  keywords: [
    "robotics engineer",
    "hardware educator",
    "PCB design",
    "CubeSat",
    "VLSI",
    "BITS Pilani",
    "ImpulseTech",
    "India",
    "STEM",
    "Yogesh Bawane",
  ],
  authors: [{ name: "Yogesh Bawane" }],
  creator: "Yogesh Bawane",
  openGraph: {
    title: "Yogesh Bawane — Robotics Engineer & Hardware Educator",
    description:
      "Robotics Engineer · Hardware Products · BITS Pilani M.Tech · ImpulseTech",
    url: "https://yogeshbawane.in",
    siteName: "Yogesh Bawane",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogesh Bawane — Robotics Engineer & Hardware Educator",
    description:
      "Building India's next generation of hardware engineers — from MakerPy boards to CubeSat systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
