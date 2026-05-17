import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yogeshbawane.in";
  const lastModified = new Date();
  const sections = [
    "",
    "#about",
    "#projects",
    "#tools",
    "#experience",
    "#research",
    "#teaching",
    "#contact",
  ];

  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified,
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}
