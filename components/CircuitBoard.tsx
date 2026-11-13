type Trace = {
  d: string;
  dur: number;
  delay: number;
  inbound?: boolean;
};

// Pins sit every 16 units along each side of the 160×160 chip (160→320).
const PIN_OFFSETS = [184, 200, 216, 232, 248, 264, 280, 296];

const LED_DUR = 2.4;

const traces: Trace[] = [
  // USB-C data lines (into the MCU)
  { d: "M232 152 V56", dur: 1.6, delay: 0, inbound: true },
  { d: "M248 152 V56", dur: 1.6, delay: 0.8, inbound: true },
  // Antenna feed
  { d: "M296 152 V116 L330 82 H352", dur: 2.2, delay: 0.3 },
  // Status LED through its resistor
  { d: "M152 216 H112", dur: LED_DUR / 2, delay: 0 },
  { d: "M72 216 H56 L40 200 V160", dur: LED_DUR / 2, delay: LED_DUR / 2 },
  // Push button (into the MCU)
  { d: "M152 264 H112 L92 284 V330", dur: 2.6, delay: 1.1, inbound: true },
  // I²C sensor
  { d: "M328 184 H356 L388 152", dur: 1.8, delay: 0.4, inbound: true },
  { d: "M328 200 H368 L412 156 V152", dur: 1.8, delay: 1.3 },
  // Expansion header
  { d: "M328 264 H380 L388 272 H428", dur: 2, delay: 0.2 },
  { d: "M328 280 H376 L388 292 H428", dur: 2, delay: 0.9 },
  { d: "M328 296 H372 L388 312 H428", dur: 2, delay: 1.6 },
  // Crystal oscillator
  { d: "M216 328 V368 L228 380 V398", dur: 1.2, delay: 0, inbound: true },
  { d: "M264 328 V368 L252 380 V398", dur: 1.2, delay: 0.6 },
  // Power rails to decoupling caps
  { d: "M184 328 V356 L160 380 H128", dur: 2.8, delay: 0.5, inbound: true },
  { d: "M296 328 V356 L320 380 H352", dur: 2.8, delay: 1.9, inbound: true },
];

const vias: [number, number][] = [
  [330, 82], [356, 184], [92, 284], [380, 264], [376, 280], [372, 296],
  [160, 380], [320, 380], [40, 200], [228, 380], [252, 380],
];

const headerPads = [272, 292, 312, 332];

export default function CircuitBoard() {
  return (
    <svg
      viewBox="0 0 480 480"
      role="img"
      aria-label="Animated circuit board: current flowing between a microcontroller and its peripherals"
      className="h-full w-full"
    >
      <defs>
        <pattern id="pcb-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" className="pcb-grid-dot" />
        </pattern>
        <filter id="pcb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="8" y="8" width="464" height="464" rx="20" className="pcb-board" />
      <rect x="8" y="8" width="464" height="464" rx="20" fill="url(#pcb-grid)" />
      {[[28, 28], [452, 28], [28, 452], [452, 452]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" className="pcb-hole" />
      ))}

      <g className="pcb-trace" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t) => (
          <path key={t.d} d={t.d} />
        ))}
        {/* Antenna meander */}
        <path d="M352 82 H372 V58 H388 V82 H404 V58 H420 V82 H436" strokeWidth="2.5" />
      </g>

      <g filter="url(#pcb-glow)" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t) => (
          <path
            key={t.d}
            d={t.d}
            pathLength={100}
            className={`pcb-flow${t.inbound ? " pcb-flow-in" : ""}`}
            style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
          />
        ))}
      </g>

      <g className="pcb-pad">
        {vias.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
        {headerPads.map((y) => (
          <rect key={y} x="424" y={y - 7} width="20" height="14" rx="3" />
        ))}
        <rect x="112" y="208" width="8" height="16" rx="2" />
        <rect x="64" y="208" width="8" height="16" rx="2" />
        <rect x="120" y="374" width="8" height="12" rx="2" />
        <rect x="352" y="374" width="8" height="12" rx="2" />
      </g>

      {/* USB-C connector */}
      <rect x="206" y="24" width="68" height="32" rx="12" className="pcb-metal" />
      <rect x="218" y="34" width="44" height="12" rx="6" className="pcb-part-dark" />
      <text x="282" y="44" className="pcb-silk">USB-C</text>

      <text x="404" y="102" className="pcb-silk" textAnchor="middle">ANT</text>

      {/* Resistor */}
      <rect x="76" y="207" width="32" height="18" rx="4" className="pcb-resistor" />
      <rect x="84" y="207" width="3" height="18" fill="#b45309" />
      <rect x="92" y="207" width="3" height="18" fill="#dc2626" />
      <text x="92" y="240" className="pcb-silk" textAnchor="middle">R1</text>

      {/* Status LED: blinks as the pulse reaches it */}
      <circle cx="40" cy="146" r="18" className="pcb-led-glow" style={{ animationDuration: `${LED_DUR}s` }} />
      <rect x="28" y="134" width="24" height="24" rx="5" className="pcb-part-dark" />
      <circle cx="40" cy="146" r="7" className="pcb-led" style={{ animationDuration: `${LED_DUR}s` }} />
      <text x="40" y="124" className="pcb-silk" textAnchor="middle">LED</text>

      {/* Push button */}
      <rect x="70" y="330" width="44" height="44" rx="6" className="pcb-metal" />
      <circle cx="92" cy="352" r="12" className="pcb-part-dark" />
      <text x="92" y="390" className="pcb-silk" textAnchor="middle">BOOT</text>

      {/* Sensor IC */}
      <rect x="378" y="112" width="52" height="40" rx="4" className="pcb-part-dark" />
      <circle cx="386" cy="120" r="2" className="pcb-pin1" />
      <text x="404" y="136" className="pcb-chip-small" textAnchor="middle">BME280</text>

      {/* Header */}
      <text x="434" y="258" className="pcb-silk" textAnchor="middle">J1</text>

      {/* Crystal */}
      <rect x="216" y="398" width="48" height="24" rx="12" className="pcb-metal" />
      <text x="240" y="440" className="pcb-silk" textAnchor="middle">40 MHz</text>

      {/* Decoupling caps */}
      <rect x="128" y="372" width="14" height="16" rx="2" className="pcb-cap" />
      <rect x="338" y="372" width="14" height="16" rx="2" className="pcb-cap" />
      <text x="135" y="404" className="pcb-silk" textAnchor="middle">C1</text>
      <text x="345" y="404" className="pcb-silk" textAnchor="middle">C2</text>

      {/* Microcontroller */}
      <g>
        <rect x="146" y="146" width="188" height="188" rx="14" className="pcb-chip-glow" />
        {PIN_OFFSETS.map((p) => (
          <g key={p} className="pcb-metal">
            <rect x={p - 3} y="150" width="6" height="12" rx="1" />
            <rect x={p - 3} y="318" width="6" height="12" rx="1" />
            <rect x="150" y={p - 3} width="12" height="6" rx="1" />
            <rect x="318" y={p - 3} width="12" height="6" rx="1" />
          </g>
        ))}
        <rect x="160" y="160" width="160" height="160" rx="8" className="pcb-chip" />
        <rect x="168" y="168" width="144" height="144" rx="5" className="pcb-chip-inner" />
        <circle cx="180" cy="180" r="4" className="pcb-pin1" />
        <text x="240" y="236" className="pcb-chip-label" textAnchor="middle">ESP32-S3</text>
        <text x="240" y="258" className="pcb-chip-small" textAnchor="middle">YB//SATELLITE</text>
      </g>
    </svg>
  );
}
