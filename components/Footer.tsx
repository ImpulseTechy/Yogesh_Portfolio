export default function Footer() {
  return (
    <footer className="relative px-6 py-12 md:px-12 overflow-hidden">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D9A3]/40 to-transparent" />

      <div className="mx-auto max-w-6xl flex flex-col items-center justify-center text-center gap-5">
        <div className="space-y-2">
          <div className="font-heading text-lg md:text-xl text-accent-teal italic font-medium">
            &ldquo;Electronics sikhao, India banao.&rdquo;
          </div>
          <div className="font-mono text-[11px] text-text-secondary tracking-wider">
            Explore: Electronics  &middot;  Learn: Coding  &middot;  Innovate: Hardware
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 text-[12px] text-text-muted mt-6 pt-6 border-t border-border/40 w-full justify-between">
          <div>&copy; {new Date().getFullYear()} Yogesh Bawane</div>
          <a
            href="https://yogeshbawane.in"
            className="hover:text-accent-teal transition-colors font-mono"
          >
            yogeshbawane.in
          </a>
          <div className="font-mono text-[10px] uppercase text-accent-blue/60">
            SYSTEM STATUS: NOMINAL
          </div>
        </div>
      </div>
    </footer>
  );
}
