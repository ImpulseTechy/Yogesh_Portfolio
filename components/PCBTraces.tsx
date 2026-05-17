export default function PCBTraces() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-0 top-0 h-[320px] w-[260px] opacity-[0.10] md:h-[400px] md:w-[300px]"
    >
      {/* Blue trace */}
      <g stroke="#378ADD" strokeWidth="1.5" fill="none" strokeLinecap="square">
        <path d="M 0 40 L 180 40 L 180 110 L 270 110" />
        <path d="M 220 40 L 220 80 L 290 80" />
      </g>
      <circle cx="180" cy="40" r="4" fill="#378ADD" />
      <circle cx="180" cy="110" r="4" fill="#378ADD" />
      <circle cx="270" cy="110" r="4" fill="#378ADD" />
      <circle cx="220" cy="80" r="4" fill="#378ADD" />

      {/* Teal trace */}
      <g stroke="#5DCAA5" strokeWidth="1.5" fill="none" strokeLinecap="square">
        <path d="M 60 180 L 140 180 L 140 250 L 240 250" />
        <path d="M 100 180 L 100 220 L 30 220" />
      </g>
      <circle cx="140" cy="180" r="4" fill="#5DCAA5" />
      <circle cx="140" cy="250" r="4" fill="#5DCAA5" />
      <circle cx="100" cy="220" r="4" fill="#5DCAA5" />

      {/* Amber trace */}
      <g stroke="#EF9F27" strokeWidth="1.5" fill="none" strokeLinecap="square">
        <path d="M 200 300 L 260 300 L 260 360 L 80 360" />
        <path d="M 200 300 L 200 340 L 130 340" />
      </g>
      <circle cx="260" cy="300" r="4" fill="#EF9F27" />
      <circle cx="260" cy="360" r="4" fill="#EF9F27" />
      <circle cx="200" cy="300" r="4" fill="#EF9F27" />
      <circle cx="200" cy="340" r="4" fill="#EF9F27" />

      {/* IC chip */}
      <rect
        x="155"
        y="160"
        width="30"
        height="20"
        fill="none"
        stroke="#F2F0E8"
        strokeWidth="1.5"
      />
      <line x1="158" y1="160" x2="158" y2="156" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="164" y1="160" x2="164" y2="156" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="170" y1="160" x2="170" y2="156" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="176" y1="160" x2="176" y2="156" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="182" y1="160" x2="182" y2="156" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="158" y1="180" x2="158" y2="184" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="164" y1="180" x2="164" y2="184" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="170" y1="180" x2="170" y2="184" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="176" y1="180" x2="176" y2="184" stroke="#F2F0E8" strokeWidth="1" />
      <line x1="182" y1="180" x2="182" y2="184" stroke="#F2F0E8" strokeWidth="1" />
    </svg>
  );
}
