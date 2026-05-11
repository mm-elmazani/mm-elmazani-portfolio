"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil", num: "00" },
  { href: "/cv", label: "CV", num: "01" },
  { href: "/projet-pro", label: "Projet pro", num: "02" },
  { href: "/portfolio", label: "Activités", num: "03" },
  { href: "/auto-evaluation", label: "Auto-éval", num: "04" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);

  // Ferme la popup au changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll mobile + ESC pour fermer + click outside
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <>
      {/* DESKTOP — barre de nav classique (>= md) */}
      <header className="sticky top-0 z-50 hidden border-b border-rule bg-bone/80 backdrop-blur md:block">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12">
          <Link
            href="/"
            className="font-display text-lg font-medium tracking-tight"
          >
            MME<span className="text-accent">.</span>
          </Link>

          <ul className="flex items-center gap-8">
            {links.slice(1).map((l) => (
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

      {/* MOBILE — bouton flottant + popup (< md) */}
      <div className="md:hidden">
        {/* Popup */}
        {open && (
          <div
            ref={popupRef}
            className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-[340px] overflow-hidden rounded-2xl border border-rule bg-bone shadow-2xl"
            role="dialog"
            aria-label="Menu de navigation"
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Menu
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ash transition-colors hover:bg-paper hover:text-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <ul className="py-2">
              {links.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`relative flex items-center gap-4 px-5 py-3 transition-colors ${
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-ink hover:bg-paper"
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-accent"
                        />
                      )}
                      <span
                        className={`font-mono text-[11px] ${
                          active ? "text-accent" : "text-ash"
                        }`}
                      >
                        {l.num}
                      </span>
                      <span className="font-sans text-base">{l.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-rule px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              <span>Cliquez pour naviguer</span>
              <span>
                <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 text-[9px] text-ink">
                  Esc
                </kbd>{" "}
                pour fermer
              </span>
            </div>
          </div>
        )}

        {/* Bouton flottant */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-bone shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {open ? (
            <X className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Menu className="h-4 w-4" strokeWidth={2} />
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            Menu
          </span>
          <span className="rounded-full bg-bone/20 px-2 py-0.5 font-mono text-[10px] text-bone">
            {links.length}
          </span>
        </button>
      </div>
    </>
  );
}
