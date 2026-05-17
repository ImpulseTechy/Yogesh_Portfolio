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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yogesh Bawane",
  url: "https://yogeshbawane.in",
  jobTitle: "Robotics Engineer & Hardware Educator",
  worksFor: {
    "@type": "Organization",
    name: "Newton School of Technology",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "BITS Pilani",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/yogesh-bawane/",
    "https://www.youtube.com/@ImpulseTech",
    "https://github.com/ImpulseTechy",
    "https://www.instagram.com/impulsetechy/",
  ],
  knowsAbout: [
    "PCB Design",
    "Embedded Systems",
    "Robotics Education",
    "VLSI Design",
    "CubeSat",
    "STEM Curriculum",
  ],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
