"use client";

import { useMemo, useState } from "react";
import type { BibliographyEntry } from "@/lib/types";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function BibliographyClient({
  items,
}: {
  items: BibliographyEntry[];
}) {
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState<string | null>(null);

  const domains = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of items) {
      const d = domainOf(it.url);
      if (!d) continue;
      counts.set(d, (counts.get(d) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12);
  }, [items]);

  const filtered = useMemo(() => {
    let arr = items;
    if (domain) arr = arr.filter((it) => domainOf(it.url) === domain);
    if (q.trim()) {
      const nq = norm(q.trim());
      arr = arr.filter(
        (it) => norm(it.title).includes(nq) || norm(it.url).includes(nq),
      );
    }
    return arr;
  }, [items, q, domain]);

  return (
    <div>
      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar fuente o dominio…"
          className="w-full px-4 py-3 rounded-md border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          type="button"
          onClick={() => setDomain(null)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            domain === null
              ? "bg-accent text-bg border-accent"
              : "bg-surface text-text-muted border-border hover:border-accent/40"
          }`}
        >
          Todos · {items.length}
        </button>
        {domains.map(([d, n]) => (
          <button
            key={d}
            type="button"
            onClick={() => setDomain(domain === d ? null : d)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              domain === d
                ? "bg-accent text-bg border-accent"
                : "bg-surface text-text-muted border-border hover:border-accent/40"
            }`}
          >
            {d} · {n}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-border rounded-md border border-border bg-surface">
        {filtered.map((it, i) => (
          <li key={i} className="p-4 hover:bg-surface-2 transition-colors">
            <a
              href={it.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 hover:text-accent transition-colors"
            >
              <span className="text-text group-hover:text-accent font-medium leading-snug">
                {it.title}
              </span>
              <span className="text-[11px] text-text-dim shrink-0">
                {domainOf(it.url)} ↗
              </span>
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="p-8 text-center text-text-dim text-sm">
            Sin coincidencias.
          </li>
        )}
      </ul>
    </div>
  );
}
