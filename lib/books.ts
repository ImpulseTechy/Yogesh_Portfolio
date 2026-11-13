export type Book = {
  title: string;
  volume: string;
  subtitle: string;
  tagline: string;
  cover: string;
  amazonUrl: string;
  format: string;
  published: string;
  facts: { value: string; label: string }[];
  summary: string;
  parts: { name: string; topics: string }[];
  method: string[];
  audience: string;
};

export const books: Book[] = [
  {
    title: "The Practical Electronics Playbook",
    volume: "Volume 1: Foundations",
    subtitle: "Build, measure and understand the circuits every engineer needs",
    tagline: "When the problem appears, the right circuit comes to mind.",
    cover: "/books/practical-electronics-playbook-v1.jpg",
    amazonUrl: "https://www.amazon.in/dp/B0HPPLFR2P",
    format: "Kindle eBook",
    published: "October 2026",
    facts: [
      { value: "22", label: "chapters" },
      { value: "488", label: "pages" },
      { value: "UNO + ESP32", label: "every chapter" },
    ],
    summary:
      "Most students can recite Ohm's law. Far fewer can look at a battery voltage too high for an ADC pin, a relay that resets their board, or a button that counts three presses, and know which circuit solves it. Each chapter starts from a real problem, gives only the maths you need, then has you predict, build and measure — and explains why the measured number differs from the calculation.",
    parts: [
      {
        name: "Your Bench",
        topics: "Breadboard, multimeter, datasheets, and your board as a measuring instrument",
      },
      {
        name: "Part I",
        topics:
          "Voltage divider, current-limiting resistor, Kirchhoff, pull-up & debounce, shunt resistor, decoupling, Thévenin & loading",
      },
      {
        name: "Part II",
        topics:
          "Diodes & rectifiers, transistor & MOSFET switches, relay driver, H-bridge, PWM, optocoupler, Zener protection, shift register",
      },
      {
        name: "Part III",
        topics: "RC time constant, low- & high-pass filters, the 555 timer, inductors, LC filters & resonance",
      },
    ],
    method: [
      "The problem",
      "The circuit",
      "The maths",
      "Build it",
      "Measure it",
      "If it doesn't work",
      "Where you'll use it",
      "Your turn",
    ],
    audience:
      "Electrical, electronics, mechatronics, computer and instrumentation engineering students, diploma students, and makers who can write a simple Arduino sketch. School-level algebra and a multimeter — no calculus or oscilloscope needed.",
  },
];
