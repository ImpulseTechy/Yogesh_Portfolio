export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 text-[12px] text-text-muted md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Yogesh Bawane</div>
        <a
          href="https://yogeshbawane.in"
          className="text-text-secondary hover:text-text-primary"
        >
          yogeshbawane.in
        </a>
        <div className="italic">Electronics sikhao, India banao.</div>
      </div>
    </footer>
  );
}
