export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  icon: "satellite" | "cpu" | "zap" | "brain" | "blocks";
  accent: "teal" | "blue";
  featured?: boolean;
  status: string;
  summary: string;
  stats?: { value: string; label: string }[];
  tags: string[];
  // Put images in /public/projects/<slug>/. The first image is used as the card cover.
  images: ProjectImage[];
  links?: { label: string; href: string }[];
  video?: string;
  caseStudy?: {
    problem?: string;
    approach?: string;
    challenges?: string;
    outcome?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "cubesat-education-kit",
    title: "CubeSat Education Kit",
    icon: "satellite",
    accent: "teal",
    featured: true,
    status: "Research Paper · In Prep",
    summary:
      "A complete 48-session space engineering program (Level 4) covering satellite subsystems, ADCS, thermal design, and ground station comms. Deployed at IIIT Nagpur and with international learners across USA and Dubai.",
    stats: [
      { value: "25", label: "students" },
      { value: "3", label: "countries" },
      { value: "48", label: "sessions" },
      { value: "L4", label: "space engineering" },
    ],
    tags: ["CubeSat", "Space Tech", "Avionics", "Ground Station"],
    images: [],
  },
  {
    slug: "makerpy",
    title: "MakerPy",
    icon: "cpu",
    accent: "blue",
    status: "ACTIVE",
    summary:
      "A Python learning microcontroller board on Raspberry Pi Pico. Designed for ages 8–10 as Level 1 of the Orbital Explorers program. Makes hardware programming as easy as Scratch.",
    tags: ["Raspberry Pi Pico", "MicroPython", "Ages 8–10"],
    images: [],
  },
  {
    slug: "esp32-iot-teaching-pcb",
    title: "ESP32 IoT Teaching PCB",
    icon: "zap",
    accent: "teal",
    status: "v2 IN PROGRESS",
    summary:
      "A custom 2-layer ESP32 breakout board designed in EasyEDA for IoT workshops. Includes onboard sensors, clean silkscreen for student labeling, and copper pour ground plane.",
    tags: ["ESP32", "EasyEDA", "PCB Design"],
    images: [],
  },
  {
    slug: "embedded-ml-board",
    title: "Embedded ML Board",
    icon: "brain",
    accent: "blue",
    status: "ACTIVE",
    summary:
      "Arduino Nano 33 BLE Rev 2-based board for TinyML experiments. Used for gesture recognition and edge AI demonstrations in advanced robotics sessions.",
    tags: ["Arduino", "TinyML", "Edge AI"],
    images: [],
  },
  {
    slug: "microbit-learning-board",
    title: "Micro:bit Learning Board",
    icon: "blocks",
    accent: "teal",
    status: "ACTIVE",
    summary:
      "A BBC Micro:bit based learning board designed for younger students. Block-programming friendly with visual feedback sensors for introductory electronics education.",
    tags: ["Micro:bit", "Kids", "Block Programming"],
    images: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
