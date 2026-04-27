import Link from "next/link";

const links = [
  { href: "/cv", label: "CV", num: "01" },
  { href: "/projet-pro", label: "Projet pro", num: "02" },
  { href: "/portfolio", label: "Portfolio", num: "03" },
  { href: "/auto-evaluation", label: "Auto-éval", num: "04" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bone/80 backdrop-blur">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight"
        >
          MME<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-baseline gap-2 font-sans text-sm text-ink transition-colors hover:text-accent"
              >
                <span className="font-mono text-[10px] text-ash group-hover:text-accent">
                  [{l.num}]
                </span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          <span className="text-ink">FR</span>
          <span className="mx-2 text-rule">·</span>
          <span>EN</span>
        </div>
      </nav>
    </header>
  );
}
