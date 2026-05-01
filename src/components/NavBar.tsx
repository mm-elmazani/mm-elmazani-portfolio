"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/cv", label: "CV", num: "01" },
  { href: "/projet-pro", label: "Projet pro", num: "02" },
  { href: "/portfolio", label: "Activités", num: "03" },
  { href: "/auto-evaluation", label: "Auto-éval", num: "04" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bone/80 backdrop-blur">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12">
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

        <div className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ash md:block">
          <span className="text-ink">FR</span>
          <span className="mx-2 text-rule">·</span>
          <span>EN</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 right-0 h-px bg-ink transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-ink transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="md:hidden">
          <ul className="flex flex-col border-t border-rule bg-bone">
            {links.map((l) => (
              <li key={l.href} className="border-b border-rule">
                <Link
                  href={l.href}
                  className="flex items-baseline gap-4 px-5 py-5 font-display text-2xl text-ink"
                >
                  <span className="font-mono text-xs text-accent">
                    [{l.num}]
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              <span className="text-ink">FR</span>
              <span className="mx-2 text-rule">·</span>
              <span>EN</span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
