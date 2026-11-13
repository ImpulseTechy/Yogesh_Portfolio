// Personal assets live in /public. Leave a field as null and the related UI stays hidden.

export const site = {
  // e.g. "/resume.pdf"
  resumeUrl: null as string | null,

  // e.g. "/images/yogesh.jpg" — a photo of you teaching or at the bench works best
  profilePhoto: "/images/yogesh-soldering.jpg" as string | null,

  // Split into parts so the full address never appears in the server-rendered HTML.
  emails: [
    { label: "Email", user: "yogeshbawane219", domain: "gmail.com" },
    { label: "Email (ImpulseTech)", user: "impulsetech101", domain: "gmail.com" },
  ],

  youtube: {
    channelUrl: "https://www.youtube.com/@ImpulseTech",
    videos: [
      {
        id: "gq20tTu1le0",
        title: "Behind the scenes of my drone workshop at St. Mary's University, Hyderabad",
      },
      {
        id: "27byLCtd9jQ",
        title: "Code Raspberry Pi Pico without installing anything (free browser IDE)",
      },
      {
        id: "glESnr2fyUs",
        title: "I built a WiFi device that sends “I miss you” with one button press",
      },
      {
        id: "sV9kRGaEhRY",
        title: "ESP32 based wildfire early warning system",
      },
    ],
  },

  // Only add real quotes, with the person's permission.
  testimonials: [] as {
    quote: string;
    name: string;
    role: string;
  }[],
};

export function emailAddress(e: { user: string; domain: string }) {
  return `${e.user}@${e.domain}`;
}
