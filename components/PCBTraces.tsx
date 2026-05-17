export default function PCBTraces() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-0 top-0 h-[320px] w-[260px] md:h-[400px] md:w-[300px]"
    >
      <defs>
        <filter id="pcb-electron-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Blue traces */}
      <g
        stroke="var(--accent-blue)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
        strokeOpacity="0.28"
      >
        <path id="pcb-trace-blue-1" d="M 0 40 L 180 40 L 180 110 L 270 110" />
        <path id="pcb-trace-blue-2" d="M 220 40 L 220 80 L 290 80" />
      </g>
      <g fill="var(--accent-blue)" fillOpacity="0.5">
        <circle cx="180" cy="40" r="3" />
        <circle cx="180" cy="110" r="3" />
        <circle cx="270" cy="110" r="3" />
        <circle cx="220" cy="80" r="3" />
      </g>

      {/* Teal traces */}
      <g
        stroke="var(--accent-teal-light)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
        strokeOpacity="0.28"
      >
        <path id="pcb-trace-teal-1" d="M 60 180 L 140 180 L 140 250 L 240 250" />
        <path id="pcb-trace-teal-2" d="M 100 180 L 100 220 L 30 220" />
      </g>
      <g fill="var(--accent-teal-light)" fillOpacity="0.5">
        <circle cx="140" cy="180" r="3" />
        <circle cx="140" cy="250" r="3" />
        <circle cx="100" cy="220" r="3" />
      </g>

      {/* Amber traces */}
      <g
        stroke="var(--accent-amber-light)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
        strokeOpacity="0.28"
      >
        <path id="pcb-trace-amber-1" d="M 200 300 L 260 300 L 260 360 L 80 360" />
        <path id="pcb-trace-amber-2" d="M 200 300 L 200 340 L 130 340" />
      </g>
      <g fill="var(--accent-amber-light)" fillOpacity="0.5">
        <circle cx="260" cy="300" r="3" />
        <circle cx="260" cy="360" r="3" />
        <circle cx="200" cy="300" r="3" />
        <circle cx="200" cy="340" r="3" />
      </g>

      {/* Flowing electrons */}
      <g filter="url(#pcb-electron-glow)">
        <circle r="2.6" fill="var(--accent-blue-light)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#pcb-trace-blue-1" />
          </animateMotion>
        </circle>
        <circle r="2.2" fill="var(--accent-blue-light)">
          <animateMotion dur="3.4s" begin="1s" repeatCount="indefinite">
            <mpath href="#pcb-trace-blue-2" />
          </animateMotion>
        </circle>

        <circle r="2.6" fill="var(--accent-teal-light)">
          <animateMotion dur="4.6s" begin="0.6s" repeatCount="indefinite">
            <mpath href="#pcb-trace-teal-1" />
          </animateMotion>
        </circle>
        <circle r="2.2" fill="var(--accent-teal-light)">
          <animateMotion dur="3s" begin="1.8s" repeatCount="indefinite">
            <mpath href="#pcb-trace-teal-2" />
          </animateMotion>
        </circle>

        <circle r="2.6" fill="var(--accent-amber-light)">
          <animateMotion dur="5s" begin="0.3s" repeatCount="indefinite">
            <mpath href="#pcb-trace-amber-1" />
          </animateMotion>
        </circle>
        <circle r="2.2" fill="var(--accent-amber-light)">
          <animateMotion dur="3.8s" begin="1.4s" repeatCount="indefinite">
            <mpath href="#pcb-trace-amber-2" />
          </animateMotion>
        </circle>
      </g>

      {/* IC chip */}
      <rect
        x="155"
        y="160"
        width="30"
        height="20"
        fill="none"
        stroke="var(--text-primary)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <g stroke="var(--text-primary)" strokeOpacity="0.4" strokeWidth="1">
        <line x1="158" y1="160" x2="158" y2="156" />
        <line x1="164" y1="160" x2="164" y2="156" />
        <line x1="170" y1="160" x2="170" y2="156" />
        <line x1="176" y1="160" x2="176" y2="156" />
        <line x1="182" y1="160" x2="182" y2="156" />
        <line x1="158" y1="180" x2="158" y2="184" />
        <line x1="164" y1="180" x2="164" y2="184" />
        <line x1="170" y1="180" x2="170" y2="184" />
        <line x1="176" y1="180" x2="176" y2="184" />
        <line x1="182" y1="180" x2="182" y2="184" />
      </g>
    </svg>
  );
}
