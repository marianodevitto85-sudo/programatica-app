"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/buscador", label: "Buscar" },
  { href: "/glosario", label: "Glosario" },
  { href: "/bibliografia", label: "Bibliografía" },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 w-full bg-bg border-b border-border">
      <div className="max-w-container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="leading-tight">
            <div className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
              Mariano De Vitto
            </div>
            <div className="text-[11px] text-text-muted font-medium">
              Head of Marketing · Barcelona
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-medium transition-colors ${
                  active
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="https://marianodevitto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            ↗ marianodevitto.com
          </a>
        </nav>
      </div>
    </header>
  );
}
