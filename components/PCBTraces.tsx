export default function PCBTraces() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 180"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-0 top-0 h-[180px] w-[200px] z-0"
      style={{ opacity: 0.06 }}
    >
      <g
        stroke="#00D9A3"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Trace 1 */}
        <path d="M 200 20 L 100 20 L 100 80 L 40 80" />
        {/* Trace 2 */}
        <path d="M 200 50 L 130 50 L 130 130 L 80 130" />
        {/* Trace 3 */}
        <path d="M 200 90 L 160 90 L 160 160" />
      </g>
      <g fill="#00D9A3">
        {/* Junction pads */}
        <circle cx="100" cy="20" r="3" />
        <circle cx="100" cy="80" r="3" />
        <circle cx="40" cy="80" r="3" />
        <circle cx="130" cy="50" r="3" />
        <circle cx="130" cy="130" r="3" />
        <circle cx="80" cy="130" r="3" />
        <circle cx="160" cy="90" r="3" />
        <circle cx="160" cy="160" r="3" />
      </g>
    </svg>
  );
}

