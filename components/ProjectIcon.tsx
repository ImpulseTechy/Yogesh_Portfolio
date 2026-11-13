import { Satellite, Cpu, Zap, BrainCircuit, Blocks } from "lucide-react";
import type { Project } from "@/lib/projects";

const icons = {
  satellite: Satellite,
  cpu: Cpu,
  zap: Zap,
  brain: BrainCircuit,
  blocks: Blocks,
};

export default function ProjectIcon({
  name,
  size = 18,
  className,
}: {
  name: Project["icon"];
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon size={size} className={className} />;
}
