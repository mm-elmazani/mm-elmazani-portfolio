export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.2em] text-ash md:flex-row md:items-center md:justify-between md:px-12">
        <p>
          © 2026 · Mohamed Mokhtar El Mazani · EPHEC BAC 3 TI
        </p>
        <p>
          <a
            href="mailto:mohamedelmazani.pro@gmail.com"
            className="transition-colors hover:text-accent"
          >
            mohamedelmazani.pro@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
